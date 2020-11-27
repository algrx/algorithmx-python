from typing import List, Dict, Callable, Optional, Any
from socketserver import TCPServer, StreamRequestHandler, ThreadingMixIn
from http.server import BaseHTTPRequestHandler
import struct

from .websocket import (
    send_handshake,
    send_text,
    read_text,
    OPCODE,
    PAYLOAD_LEN,
    OPCODE_CLOSE_CONN,
    OPCODE_TEXT,
)


class WebsocketHandler(StreamRequestHandler):
    client_id: int

    keep_alive = True
    handshake_done = False

    def __init__(self, socket, addr, server: "WebsocketServer"):
        self.server = server
        self.client_id = server.unique_client_id()
        super().__init__(socket, addr, server)

    def read_http_headers(self):
        headers = {}
        http_get = self.rfile.readline().decode().strip()
        while True:
            header = self.rfile.readline().decode().strip()
            if not header:
                break
            head, value = header.split(":", 1)
            headers[head.lower().strip()] = value.strip()
        return headers

    def handle(self):
        while self.keep_alive:
            if not self.handshake_done:
                self.handshake()
            else:
                self.read_next_message()

    def handshake(self):
        headers = self.read_http_headers()
        if not headers["upgrade"].lower() == "websocket":
            return

        key = headers["sec-websocket-key"]
        self.request.send(send_handshake(key))
        self.handshake_done = True
        self.server.add_client(self)

    def read_next_message(self):
        try:
            b1, b2 = self.rfile.read(2)
        except (ConnectionResetError, ValueError):
            self.keep_alive = False
            return

        opcode = b1 & OPCODE
        payload_length = b2 & PAYLOAD_LEN

        if opcode == OPCODE_CLOSE_CONN:
            self.keep_alive = False
            return

        elif opcode == OPCODE_TEXT:
            if payload_length == 126:
                payload_length = struct.unpack(">H", self.rfile.read(2))[0]
            elif payload_length == 127:
                payload_length = struct.unpack(">Q", self.rfile.read(8))[0]

            masks = self.rfile.read(4)
            message = read_text(self.rfile.read(payload_length), masks)
            self.server.receive(message, self.client_id)

    def finish(self):
        self.server.remove_client(self.client_id)

    def send_message(self, message: str):
        self.request.send(send_text(message))


class WebsocketServer(TCPServer, ThreadingMixIn):
    logging = False
    allow_reuse_address = True
    daemon_threads = True

    def __init__(self, host: str, port: int):
        super().__init__((host, port), WebsocketHandler)

        self.clients: Dict[int, WebsocketHandler] = {}
        self.client_id_counter = 0
        self.receive_callback: Optional[Callable[[str], Any]] = None

    def unique_client_id(self) -> int:
        unique_id = self.client_id_counter
        self.client_id_counter += 1
        return unique_id

    def add_client(self, client: WebsocketHandler):
        self.clients[client.client_id] = client

    def remove_client(self, client_id: int):
        if client_id in self.clients:
            del self.clients[client_id]

    def start(self):
        self.serve_forever()

    def onreceive(self, callback: Callable[[str], Any]):
        self.receive_callback = callback

    def receive(self, message: str, client_id: int):
        if self.receive_callback is not None:
            self.receive_callback(message)

    def dispatch(self, message: str):
        for client in self.clients.values():
            client.send_message(message)
