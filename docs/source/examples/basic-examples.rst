.. _basic-examples:

Basic Examples
==============

Let’s import the library and create a simple network. You can hold down ``ctrl``/``cmd`` to zoom in.

.. jupyter-execute::

    import algorithmx
    
    canvas = algorithmx.jupyter_canvas()
    canvas.size((300, 200))
    
    canvas.nodes([1, 2]).add()
    canvas.edge((1, 2)).add()
    
    canvas

That’s nice, but now we would like to animate it. Let’s also add some buttons so that we can easily start/stop/restart our animation.

.. jupyter-execute::

    canvas = algorithmx.jupyter_canvas(buttons=True)
    canvas.size((300, 200))
    
    canvas.nodes([1, 2]).add()
    canvas.edge((1, 2)).add()
    
    canvas.pause(0.5)
    
    canvas.node(1).highlight().size('1.25x').pause(0.5)
    canvas.edge((1, 2)).traverse().color('blue')
    
    canvas

Finally, lets apply all of this to a larger graph.

.. jupyter-execute::

    canvas = algorithmx.jupyter_canvas(buttons=True)
    
    canvas.nodes(range(1, 8)).add()
    canvas.edges([(i, i+1) for i in range(1, 7)]
               + [(1, 3), (2, 4), (2, 7)]).add()
    
    for i in range(1, 8):
        canvas.pause(0.5)
        canvas.node(i).color('green').highlight().size('1.25x')
        
        if i < 8:
            canvas.pause(0.5)
            canvas.edge((i, i+1)).traverse().color('green')
            
    canvas
