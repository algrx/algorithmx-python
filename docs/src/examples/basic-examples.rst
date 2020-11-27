.. _basic-examples:

Basic Examples
==============

Let's import the library and create a simple network. Note that you can hold down
``ctrl``/``cmd`` to zoom in.

.. jupyter-execute::

    import algorithmx
    
    canvas = algorithmx.jupyter_canvas()
    canvas.size((300, 200))
    
    canvas.nodes([1, 2]).add()
    canvas.edge((1, 2)).add()
    
    canvas

Now let's animate it. We'll also add some buttons so that we can easily
start/stop/restart the animation.

.. jupyter-execute::

    canvas = algorithmx.jupyter_canvas(buttons=True)
    canvas.size((300, 200))
    
    canvas.nodes([1, 2]).add()
    canvas.edge((1, 2)).add()
    
    canvas.pause(0.5)
    
    canvas.node(1).highlight().size('1.25x').pause(0.5)
    canvas.edge((1, 2)).traverse('blue')
    
    canvas

Finally, let's apply all of this to a larger graph.

.. jupyter-execute::

    canvas = algorithmx.jupyter_canvas(buttons=True)
    
    canvas.nodes(range(1, 8)).add()
    canvas.edges([(i, i+1) for i in range(1, 7)]
               + [(1, 3), (2, 4), (2, 7)]).add()
    
    for i in range(1, 8):
        canvas.pause(0.5)
        canvas.node(i).color('green').highlight().size('1.25x')
        
        if i < 7:
            canvas.pause(0.5)
            canvas.edge((i, i+1)).traverse('green')
            
    canvas
