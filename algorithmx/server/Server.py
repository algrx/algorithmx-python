from threading import Thread
import os.path as ospath

from .FileServer import FileServer, create_file_server, relative_file_handler, absolute_file_handler
from .CanvasServer import CanvasServer
from .Client import Client
from . import CanvasSelection, canvas_selection

class Server:
    """
    A local HTTP server using WebSockets to transmit data.
    """

    _file_server: FileServer
    _websocket_server: CanvasServer

    def __init__(self, file: str, port: int):
        file_handler = None
        if file is None:
            file_handler = absolute_file_handler(ospath.abspath(ospath.dirname(__file__)), 'algorithmx.html')
        else:
            file_handler = relative_file_handler(file)

        self._file_server = create_file_server(file_handler, port)
        self._websocket_server = CanvasServer(port + 1)

    def start(self):
        """
        Starts the server on the current threat, blocking all further execution until the server shuts down.
        """
        websocket_thread = Thread(target=lambda: self._websocket_server.start(), daemon=True)
        websocket_thread.start()

        try:
            self._file_server.start()
        except (KeyboardInterrupt, SystemExit):
            pass

    def shutdown(self):
        """
        Shuts down the server. This must be called on a different thread to the one used to start the server.
        """
        self._file_server.shutdown()

    def client(self, name: str = 'output') -> Client:
        return Client(self._websocket_server, name)

    def canvas(self, name: str = 'output') -> CanvasSelection:
        """
        Creates a new :class:`~graphics.CanvasSelection` which will dispatch and receive events through a WebSocket
        connected to the server.

        :param name: (Optional) The name of the canvas. By default, each server will only render one canvas, and so
            this argument has no affect. However, if you wish to design a custom interface with more than one canvas
            per page, you can use this to differentiate between them.
        :type canvas: str
        """
        return self.client(name).canvas()
