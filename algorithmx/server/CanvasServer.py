from typing import Dict, Optional, Callable, Any
from threading import Thread
import json
import os.path as ospath

from .FileServer import (
    FileServer,
    relative_file_handler,
    absolute_file_handler,
)
from .WebsocketServer import WebsocketServer
from . import Canvas, create_canvas, DispatchEvent, ReceiveEvent


class CanvasServer:
    """
    A local HTTP server using WebSockets to transmit data.
    """

    def __init__(self, file: Optional[str], host: str, port: int):
        self._canvases: Dict[str, Canvas] = {}

        file_handler = None
        if file is None:
            file_handler = absolute_file_handler(
                ospath.abspath(ospath.dirname(__file__)), "algorithmx.html"
            )
        else:
            file_handler = relative_file_handler(file)

        self.file_server = FileServer(file_handler, host, port)
        self.websocket_server = WebsocketServer(host, port + 1)

        def receive_raw(message: str):
            event = json.loads(message)
            canvas_name = event["canvas"] if "canvas" in event else "0"
            if canvas_name in self._canvases:
                self._canvases[canvas_name].receive(event)

        self.websocket_server.onreceive(receive_raw)

    def start(self):
        """
        Starts the server on the current threat, blocking all further execution until
        the server shuts down.
        """
        websocket_thread = Thread(
            target=lambda: self.websocket_server.start(), daemon=True
        )
        websocket_thread.start()

        try:
            self.file_server.start()
        except (KeyboardInterrupt, SystemExit):
            pass

    def shutdown(self):
        """
        Shuts down the server. This must be called on a different thread to the one used
        to start the server.
        """
        self.file_server.shutdown()

    def canvas(self, name: Optional[str] = None) -> Canvas:
        """Returns an :class:`~api.Canvas` interface, which will dispatch and receive
        events through a WebSocket connected to the server.

        :name: (Optional) The name of the canvas. By default, each server will only
            render one canvas, and so this argument has no affect. However, if you wish
            to design a custom UI with more than one canvas per page, you can use this
            to differentiate between them.
        """
        full_name = name or "0"
        if full_name in self._canvases:
            return self._canvases[full_name]

        def dispatch(event: DispatchEvent):
            json_event = {
                **event,
                **({"canvas": name} if name is not None else {}),
            }
            self.websocket_server.dispatch(json.dumps(json_event))

        canvas = create_canvas()
        canvas.ondispatch(dispatch)
        self._canvases[full_name] = canvas

        return canvas
