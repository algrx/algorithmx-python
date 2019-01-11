from typing import Dict, Callable, Any
from .CanvasServer import CanvasServer
from . import EventHandler, DispatchEvent, ReceiveEvent
from . import CanvasSelection, canvas_selection

class Client(EventHandler):
    _server: CanvasServer
    _canvas: str

    def __init__(self, server: CanvasServer, canvas: str):
        self._server = server
        self._canvas = canvas
        super().__init__()

    def dispatch(self, event: DispatchEvent):
        self._server.dispatch_canvas(self._canvas, event)

    def subscribe(self, listener: Callable[[ReceiveEvent], Any]):
        self._server.subscribe_canvas(self._canvas, listener)

    def canvas(self) -> CanvasSelection:
        return canvas_selection(self._canvas, self)
