.. _jupyter-widget:

Jupyter Widget
==============

After :ref:`installing and enabling <install-jupyter>` the Jupyter widget, you can use the library within a notebook in
the following way:

.. code-block:: python

    import algorithmx

    # Create a Jupyter canvas interface
    canvas = algorithmx.jupyter_canvas()

    # Set the size of the canvas
    canvas.size((300, 200))

    # Use the library normally, for example:
    canvas.nodes([1, 2]).add()
    canvas.edge((1, 2)).add()

    # Display the canvas
    display(canvas)

Note that you need to hold down the ``ctrl``/``cmd`` key to zoom in. If you are creating an algorithm simulation, you
can also enable start/stop/restart buttons:

.. code-block:: python

    canvas = algorithmx.jupyter_canvas(buttons=True)


.. autofunction:: algorithmx.jupyter_canvas
