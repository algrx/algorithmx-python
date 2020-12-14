from .server import CanvasServer

try:
    from .jupyter import JupyterCanvas, create_jupyter_canvas

    HAS_JUPYTER = True
except:
    HAS_JUPYTER = False
    JupyterCanvas = None  # type: ignore


def http_server(
    file: str = None, host: str = "localhost", port: int = 5050
) -> CanvasServer:
    """Creates a new HTTP server for displaying the network, using WebSockets to
    transmit data. The server will only start once its
    :meth:`~server.CanvasServer.start` method is called. After the server has started,
    the network can be viewed by opening a browser and navigating to the address
    ``http://localhost:5050/`` (change the port as necessary).

    :file: (Optional) The path to the HTML file which the server should display,
        relative to the current runtime directory. If unspecified, the default HTML file
        will be used. When creating a custom HTML interface, use the default file as a
        guide.
    :type file: str

    :port: (Optional) The port on which the server should start, defaulting to to 5050.
        Note that the next port (by default 5051) will also be used to transmit data
        through WebSockets.
    :type port: int
    """
    return CanvasServer(file, host, port)


def jupyter_canvas(buttons: bool = False) -> JupyterCanvas:
    """Creates a new :class:`~api.Canvas` which will dispatch and receive
    events through a Jupyter widget, and which can be displayed using the IPython
    ``display`` function.

    By default, the canvas size is (400, 250), and requires the ``ctrl``/``cmd`` to be
    held down while zooming."""
    if HAS_JUPYTER:
        return create_jupyter_canvas(buttons=buttons)
    else:
        raise Exception("Jupyter is not installed")
