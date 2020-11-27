.. _api-overview:

Overview
========

The AlgorithmX API provides a selection-based interface for creating interactive network
visualizations. At the root of each visualization is a :class:`~api.Canvas`, which can
be created either through a HTTP Server (:meth:`~server.CanvasServer.canvas`), or a
Jupyter widget (:func:`~jupyter_canvas`).

The purpose of the library is to provide a way to manipulate the graphics representing a
network, through a series of events which are sent to the client. As such, it does not
keep track of any state (except for callbacks). In order to store and analyze the
network, you can combine this with another library, such as `NetworkX
<https://networkx.github.io/>`_.


Using Selections
----------------

Every selection corresponds to one or more graphical objects in the network. If a
selection is created with objects that do not exist in the network yet, these can be
added by calling :meth:`~api.ElementSelection.add`. Selections will provide a range of
methods for setting custom attributes, configuring animations, and interacting with
event queues.

Below is an example showing how selections can be created, added, modified and removed:

.. code-block:: python

   # Add a big red node
   canvas.node('A').add(color='red', size=30)

   # Add a label to the node
   canvas.node('A').label(1).add(text='My Label')

   # Pause for half a second
   canvas.pause(0.5)

   # Modify the color of the node
   canvas.node('A').color('blue')

   # Temporarily make the node 1.25 times as big
   canvas.node('A').highlight().size('1.25x')

   # Add a few more modes
   canvas.nodes([1, 2, 3]).add()

   # Add an edge
   canvas.edge((2, 3)).add()

   # Remove the first node
   canvas.node('A').remove()

Attributes can also be configured using the :meth:`~api.ElementSelection.attrs` method:

.. code-block:: python

    # Configure the attributes of a label
    canvas.node(1).label(2).attrs(
        text='Hello',
        color='red'
        size=45,
        font='Courier'
    )

Functional Arguments
--------------------

All selection methods can take functions as arguments, allowing attributes to be
configured differently depending on each element's data and index within the selection.

.. code-block:: python

   # Conditionally set color using id
   canvas.nodes(['A', 'B']).color(lambda n: 'red' if n == 'A' else 'blue')

   # Conditionally set color using index
   colors = ['red', 'blue']
   canvas.nodes(['A', 'B']).color(lambda _, i: colors[i])

   # Conditionally set color using data binding
   canvas.nodes(['A', 'B']).data(colors).color(lambda c: c)


.. autodata:: api.types.ElementFn
.. autodata:: api.types.ElementArg


Expressions
-----------

Most numerical attributes can also be specified as linear expressions, often allowing
for easier configuration. Expressions use variables corresponding to other attributes;
for example, a label could be positioned relative to its parent node without needing to
know the node's size, and would be re-positioned accordingly when the node's size
changes.

.. code-block:: python

    # Position a label in the top-left corner of a node
    canvas.node('A').label().align('top-left').pos(('-x+5', 'y-5'))

    # Pin a node to the canvas using a relative position
    canvas.node('A').fixed(True).pos(('-0.5cx', '-0.5cy'))

    # Change the size of a node relative to its current size
    canvas.node('C').size(('1.25x', '1.25y'))


.. autodata:: api.types.NumAttr
