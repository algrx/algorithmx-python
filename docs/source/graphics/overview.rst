.. _graphics-overview:

.. automodule:: algorithmx

Overview
========

The AlgorithmX graphics library provides a selection-based interface for creating interactive network visualizations.
At the root of each visualization is a :class:`~graphics.CanvasSelection`, which can be created either through the
HTTP Server (:meth:`~server.Server.canvas`), or the Jupyter widget (:meth:`~jupyter.JupyterWidget.canvas`).

The purpose of the library is to provide a way to manipulate the graphics used to represent the network, by sending
events directly to to the client. As such, it does not keep track of any state (except for callbacks). In order to
represent and analyze the network, you can combine this with another library, such as `NetworkX <https://networkx.github.io/>`_,
or use the provided analysis library (see NotImplemented).


Using Selections
----------------

Every selection corresponds to one or more graphical objects in the network. If selection is created with objects that
do not exist in the network yet, these can be added by calling :meth:`~graphics.Selection.add`. Selections will provide a range of
methods for setting custom attributes, configuring animations, and interacting with event queues.

Below is an example showing how selections can be created, added, modified and removed:

.. code-block:: python

   # Add a big red node
   canvas.node('A').add().color('red').size(30)

   # Add a label to the node
   canvas.node('A').label(1).add().text('My Label')

   # Modify the color of the node, after a 0.5 second pause
   canvas.node('A').pause(500).color('blue')

   # Temporarily make the node 1.5 times as big
   canvas.node('A').highlight().size('1.5x')

   # Add a few more modes
   canvas.nodes([1, 2, 3]).add()

   # Add an edge
   canvas.edge((2, 3)).add()

   # Remove the first node
   canvas.node('A').remove()

Attributes can also be configured using the :meth:`~graphics.Selection.set` method:

.. code-block:: python

    # Configure the attributes of a label
    canvas.node(1).label().set(text='Hello',
                               color='red'
                               size=45,
                               font='Courier')


Functional Arguments
--------------------

All selection methods (except in :class:`~graphics.CanvasSelection`) can take functions as arguments, allowing attributes to be
configured differently depending on each element's data and index within the selection.

.. code-block:: python

   # Conditionally set color using id
   canvas.nodes(['A', 'B']).color(lambda n: 'red' if n == 'A' else 'blue')

   # Conditionally set color using index
   colors = ['red', 'blue']
   canvas.nodes(['A', 'B']).color(lambda n, i: colors[i])

   # Conditionally set color using data binding
   canvas.nodes(['A', 'B']).data(colors).color(lambda c: c)


.. autodata:: graphics.types.ElementFn
.. autodata:: graphics.types.ElementArg


Expressions
-----------

Most numerical arguments can also be specified as linear expressions, allowing for easier and more powerful configuration.
Expressions use variables corresponding to other attributes; for example, a label could be positioned relative to it's
parent node without needing to know the node's size, and would be re-positioned accordingly when the size changes.

.. code-block:: python

    # Position a label in the top-left corner of a node
    canvas.node('A').label().align('top-left').pos(('-x+5', 'y-5'))

    # Pin a node to the canvas using a relative position
    canvas.node('A').fixed(True).pos(('-0.5cx', '-0.5cy'))

    # Change the size of a node relative to it's current size
    canvas.node('C').shape('rect').size(('1.5x', '1.5y'))


.. autodata:: graphics.types.NumExpr
