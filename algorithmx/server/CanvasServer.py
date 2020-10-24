from typing import Dict, Optional, Callable, Any
from threading import Thread
import json
import os.path as ospath

from .FileServer import (
    FileServer,
    create_file_server,
    relative_file_handler,
    absolute_file_handler,
)
from .WebsocketServer import WebsocketServer, create_websocket_server
from . import Canvas, DispatchEvent, ReceiveEvent


class CanvasServer:
    """
    A local HTTP server using WebSockets to transmit data.
    """

    _file_server: FileServer
    _websocket_server: WebsocketServer
    _receive_callbacks: Dict[str, Callable[[ReceiveEvent], Any]] = {}
    _canvases: Dict[str, Canvas] = {}

    def __init__(self, file: Optional[str], host: str, port: int):
        file_handler = None
        if file is None:
            file_handler = absolute_file_handler(
                ospath.abspath(ospath.dirname(__file__)), "algorithmx.html"
            )
        else:
            file_handler = relative_file_handler(file)

        self._file_server = create_file_server(file_handler, host, port)
        self.websocket_server = create_websocket_server(host, port + 1)

        def receive_raw(message: str):
            event = json.loads(message)
            canvas_name = event["canvas"] if "canvas" in event else "default"
            if canvas_name in self._receive_callbacks:
                self._receive_callbacks[canvas_name](event)

        self.websocket_server.onreceive(receive_raw)

    def start(self):
        """
        Starts the server on the current threat, blocking all further execution until
        the server shuts down.
        """
        websocket_thread = Thread(
            target=lambda: self._websocket_server.start(), daemon=True
        )
        websocket_thread.start()

        try:
            self._file_server.start()
        except (KeyboardInterrupt, SystemExit):
            pass

    def shutdown(self):
        """
        Shuts down the server. This must be called on a different thread to the one used
        to start the server.
        """
        self._file_server.shutdown()

    def create_canvas(self, name: Optional[str] = None) -> Canvas:
        """Returns an :class:`~api.Canvas` interface, which will dispatch and receive
        events through a WebSocket connected to the server.

        :name: (Optional) The name of the canvas. By default, each server will
        only render one canvas, and so this argument has no affect. However, if you wish
        to design a custom interface with more than one canvas per page, you can use
        this to differentiate between them.
        """

        def dispatch(event: DispatchEvent):
            json_event = {
                **event,
                **({"canvas": name} if name is not None else {}),
            }
            self._websocket_server.dispatch(json.dumps(json_event))

        canvas = Canvas()
        self._receive_callbacks[name or "default"] = canvas.receive
        return canvas.ondispatch(dispatch)
