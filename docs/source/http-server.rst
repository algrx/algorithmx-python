.. _http-server:

HTTP Server
===========

To use the library normally (i.e. not through Jupyter), you will need to set up a local server for displaying the
interactive network. The library comes with all the tools needed to do this:

.. code-block:: python

    import algorithmx

    # Create a new HTTP server
    server = algorithmx.http_server()
    # Create a CanvasSelection interface
    canvas = server.canvas()

    def start():
        # Use the library normally, for example:
        canvas.nodes([1, 2]).add()
        canvas.edge((1, 2)).add()

        canvas.pause(1)

        canvas.node(1).highlight().size('1.5x').pause(0.5)
        canvas.edge((1, 2)).animate('traverse').color('blue')

    # Call the function above when the client broadcasts a 'start' message
    # (which will happen when the user clicks the start or restart button)
    canvas.listen('start', start)

    # Start the server, blocking all further execution on the current thread
    # You can press 'CTRL-C' to exit the script
    server.start()


After running this code, open a browser and go to the address ``http://localhost:5050/`` to see the network. The library
provides a simple HTML interface with buttons for starting, stopping and restarting the simulation. If you wish to
customize this further, you can tell the server to open a different HTML file, and configure the port:

.. code-block:: python

    server = algorithmx.http_server(file='my/custom/interface.html', port=8090)

Use the provided HTML file as a guide for creating your own.


.. automodule:: algorithmx

.. autofunction:: algorithmx.http_server

.. autoclass:: algorithmx.server.Server
   :members:
