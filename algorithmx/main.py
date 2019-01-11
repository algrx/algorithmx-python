from .server import Server
from .jupyter import JupyterWidget

def http_server(file: str = None, port: int = 5050) -> Server:
    """
    Creates a new HTTP server for displaying the network, using WebSockets to transmit data. The server will only start
    once its :meth:`~server.Server.start` method is called. After the server has started, the network can be viewed by
    opening a browser and navigating to the address ``http://localhost:5050/`` (change the port as necessary).

    :file: (Optional) The path to the HTML file which the server should display, relative to the current runtime directory.
        If unspecified, the default HTML file will be used. When creating a custom HTML interface, use the default file
        as a guide.
    :type file: str

    :port: (Optional) The port on which the server should start, defaulting to to 5050. Note that the next port
        (by default 5051) will also be used to transmit data through WebSockets.
    :type port: int
    """
    return Server(file, port)

def jupyter_widget(buttons: bool = False) -> JupyterWidget:
    """
    Creates a new Jupyter widget for displaying the network.

    :param buttons: Whether or not the widget should include buttons for starting/stopping/restarting events on the
        network (useful for algorithm simulations). Disabled by default.
    """
    return JupyterWidget(buttons=buttons)
