.. _http-server:

HTTP Server
===========

To use the library normally (i.e. not through Jupyter), you will need to set up a local
server for displaying the interactive network. The library comes with all the tools
needed to do this:

.. code-block:: python

    from algorithmx import http_server

    # Create a new HTTP server on port 5050
    server = http_server(port=5050)
    # Create a new canvas
    canvas = server.canvas()

    def start():
        # Use the library normally, for example:
        canvas.nodes([1, 2]).add()
        canvas.edge((1, 2)).add()

        canvas.pause(1)

        canvas.node(1).highlight().size('1.5x').pause(0.5)
        canvas.edge((1, 2)).traverse('blue')

    # A 'start' message is sent by the client whenever the
    # user clicks the start or restart button
    canvas.onmessage('start', start)

    # Start the server, blocking all further execution on
    # the current thread. Use 'ctrl-c' to exit the script.
    server.start()


After running this code, open a browser and go to ``http://localhost:5050/`` to see the
network. Note that a websocket is open on the next incremental port (by default 5051).

The library provides a simple HTML interface with buttons for starting, stopping and
restarting the simulation. If you wish to customize this further, you can
tell the server to open a different HTML file.

.. code-block:: python

    server = algorithmx.http_server(file='my/custom/interface.html')

Use the provided HTML file as a guide for creating your own.


.. autofunction:: algorithmx.http_server

.. autoclass:: algorithmx.server.CanvasServer
   :members:
