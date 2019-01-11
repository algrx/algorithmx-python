from typing import List, Dict, Callable, Any
import json

from .WebsocketServer import WebsocketServer, create_websocket_server
from . import ReceiveEvent, DispatchEvent

class CanvasServer:
    canvas_listeners: Dict[int, List[Callable[[ReceiveEvent], Any]]] = {}
    websocket_server: WebsocketServer

    def __init__(self, port: str):
        self.websocket_server = create_websocket_server(port)
        self.websocket_server.on_receive(self.receive)

    def start(self):
        self.websocket_server.start()

    def receive(self, message: str):
        json_event = json.loads(message)
        canvas = json_event['canvas']
        event = json_event['data']

        if canvas in self.canvas_listeners:
            for listener in self.canvas_listeners[canvas]:
                listener(event)

    def subscribe_canvas(self, canvas: str, listener: Callable[[ReceiveEvent], Any]):
        if not listener in self.canvas_listeners:
            self.canvas_listeners[canvas] = []
        self.canvas_listeners[canvas].append(listener)

    def dispatch_canvas(self, canvas: str, event: DispatchEvent):
        full_event = { 'canvas': canvas, 'data': event }
        json_event = json.dumps(full_event)
        self.websocket_server.send_message(json_event)
