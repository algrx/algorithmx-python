.. _utilities:

NetworkX
========

NetworkX graphs can be added to a canvas in the following way:

.. code-block:: python

   import networkx as nx
   from algorithmx.networkx import add_graph 

   G = nx.MultiDiGraph()
   G.add_nodes_from([1, 2, 3])
   G.add_weighted_edges_from([(1, 2, 3.0), (2, 3, 7.5)]) 
 
   # canvas = ...
   
   add_graph(canvas, G)

.. autofunction:: algorithmx.networkx.add_graph
