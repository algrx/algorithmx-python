.. _networkx-tutorial:

NetworkX Tutorial
=================

In this tutorial we will take a look at ways of combining the analysis tools provided by
NetworkX with the visualization capailities of AlgorithmX.

Simple Graph
------------

Let's start by creating a simple NetworkX graph. We will use ``add_path`` to quickly add both nodes and edges.

.. jupyter-execute::

    import networkx as nx
    
    G = nx.Graph()
    
    nx.add_path(G, [1, 2, 3])
    nx.add_path(G, [4, 2, 5])
    
    print('Nodes:', G.nodes)
    print('Edges:', G.edges)

Now that we have all the data we need, we can create an AlgorithmX canvas to display our nodes and edges.

.. jupyter-execute::

    from algorithmx import jupyter_canvas
    
    canvas = jupyter_canvas()
    
    canvas.nodes(G.nodes).add()
    canvas.edges(G.edges).add()
    
    canvas

Finally, let's make it look a little more interesting.

.. jupyter-execute::

    canvas = jupyter_canvas()
    
    node_colors = {1: 'red', 2: 'green', 3: 'blue', 4: 'orange', 5: 'purple'}
    
    canvas.nodes(G.nodes).add(
        shape='rect',
        size=(20, 12),
        color=lambda n: node_colors[n]
    )
    canvas.edges(G.edges).add()
    
    canvas


Weighted and Directed Graphs
----------------------------
To create a directed graph, all we need to do is use a NetworkX DiGraph, and tell
AlgrithmX that the edges should be rendered with an arrow.

.. jupyter-execute::

    G = nx.DiGraph()

    G.add_nodes_from([1, 2, 3])
    G.add_edges_from([(1, 2), (2, 3), (3, 1)])

    canvas = jupyter_canvas()

    canvas.nodes(G.nodes).add()
    canvas.edges(G.edges).add(directed=True)

    canvas

To create wighted graph, we will first ensure that our NetworkX edges have a 'weight'
attribute. Then, we will add a label to each edge displaying the attribute.

.. jupyter-execute::

    G = nx.Graph()
    
    G.add_nodes_from([1, 2, 3])
    G.add_weighted_edges_from([(1, 2, 0.4), (2, 3, 0.2), (3, 1, 0.3)])
    
    canvas = jupyter_canvas()
    
    canvas.nodes(G.nodes).add()
    canvas.edges(G.edges).add(
        labels=lambda e: {0: {'text': G.edges[e]['weight']}}
    )
    
    canvas

Finally, AlgorithmX provides a uility to simplify this process.

.. jupyter-execute::

    from algorithmx.networkx import add_graph
    
    canvas = jupyter_canvas()
    add_graph(canvas, G)


Random Graph
------------

NetworkX provides a range of functions for generating graphs. For generating a random
graph, we will use the basic ``gnp_random_graph`` function. By providing a seed, we can
ensure that we get the same graph every time (otherwise there is no guarantee of it
being connected!).

.. jupyter-execute::

    G = nx.gnp_random_graph(10, 0.3, 138)
    
    canvas = jupyter_canvas()
    canvas.nodes(G.nodes).add()
    canvas.edges(G.edges).add()
    
    canvas

To make the graph directed, we will simply use ``G.to_directed``. To make the graph
weighted, we will need to configure a weight attribute for each edge. Since our graph is
random, we'll make our edge weights random as well.

.. jupyter-execute::

    from random import randint
    
    G = G.to_directed()
    nx.set_edge_attributes(G, {e: {'weight': randint(1, 10)} for e in G.edges})

Finally, we display the graph.

.. jupyter-execute::

    canvas = jupyter_canvas()
    add_graph(canvas, G)


Detailed Graph
--------------

Now we are going to create a graph that displays a range of interesting properties.
Let's begin by generating a random weighted graph, as before.

.. jupyter-execute::

    G = nx.gnp_random_graph(10, 0.3, 201)
    nx.set_edge_attributes(G, {e: {'weight': randint(1, 10)} for e in G.edges})

Next, we will use NetworkX to calculate the graph's coloring and edge centrality.

.. jupyter-execute::

    coloring = nx.greedy_color(G)
    centrality = nx.edge_betweenness_centrality(G, weight='weight', normalized=True)

We can now begin displaying the graph. First, we will add the nodes and assign them a
color based on their calculated priority. We happen to know that any planar graph
requires at most 4 different colors, and so we prepare these beforehand.

.. jupyter-execute::

    canvas = jupyter_canvas()
    
    color_priority = {0: 'red', 1: 'orange', 2: 'yellow', 3: 'green'}
    
    canvas.nodes(G.nodes).add() \
        .color(lambda n: color_priority[coloring[n]])
    
    print(coloring)

Afterwards, we will add the edges. Each one will have two labels; one to display it's
weight, and another to display it's calculated centrality.

.. jupyter-execute::

    formatted_centrality = {k: '{0:.2f}'.format(v) for k, v in centrality.items()}

    init_edges = canvas.edges(G.edges).add()

    init_edges.label().add(
         text=lambda e: G.edges[e]['weight']
    )
    init_edges.label('centrality').add(
         color='blue',
         text=lambda e: formatted_centrality[e]
    )
    
    print(formatted_centrality)

Finally, we display the whole graph.

.. jupyter-execute::

    canvas
