.. _networkx-examples:

NetworkX Examples
=================

Let's begin by creating a with random edge weights.

.. jupyter-execute::

    from algorithmx import jupyter_canvas
    from random import randint
    import networkx as nx
    
    canvas = jupyter_canvas()
    
    # Create a directed graph
    G = nx.circular_ladder_graph(5)
    # Randomize edge weights
    nx.set_edge_attributes(G, {e: {'weight': randint(1, 9)} for e in G.edges})
    
    # Add nodes
    canvas.nodes(G.nodes).add()
    
    # Add directed edges with weight labels
    canvas.edges(G.edges).add(
        labels=lambda e: {0: {'text': G.edges[e]['weight']}}
    )
    
    canvas

Next, we can use NetworkX run a breadth-first search, and AlgorithmX to animate it.

.. jupyter-execute::

    canvas = jupyter_canvas(buttons=True)
    canvas.size((500, 400))
    
    # Generate a 'caveman' graph with 3 cliques of size 4
    G = nx.connected_caveman_graph(3, 4)
    
    # Add nodes and edges
    canvas.nodes(G.nodes).add()
    canvas.edges(G.edges).add()
    canvas.pause(1)
    
    # Traverse the graph using breadth-first search
    bfs = nx.edge_bfs(G, 0)
    
    # Animate the traversal
    source = None
    for e in bfs:
        if e[0] != source:
            # Resize the source
            canvas.node(e[0]).size('1.25x').color('purple')
            if source is not None:
                canvas.node(source).size('0.8x')

            # Update the source
            source = e[0]
            canvas.pause(0.5)
            
        # Traverse the edge
        canvas.edge(e).traverse('pink')
        canvas.pause(0.5)
    
    canvas.node(source).size('0.8x')
    
    canvas

For our final visualization, let's find the shortest path on a random graph using Dijkstra's
algorithm.

.. jupyter-execute::

    import random
    random.seed(436)
    
    canvas = jupyter_canvas(buttons=True)
    canvas.size((500, 400))
    
    # Generate a random graph with random edge weights
    G = nx.newman_watts_strogatz_graph(16, 2, 0.4, seed=537)
    nx.set_edge_attributes(G, {e: randint(1, 20) for e in G.edges}, 'weight')
    
    # Add nodes and edges with weight labels
    canvas.nodes(G.nodes).add()
    canvas.edges(G.edges).add(
        labels=lambda e: {0: {'text': G.edges[e]['weight']}}
    )
    canvas.pause(1)
    
    # Select the source and target
    source = 0
    target = 8
    canvas.node(source).color('green').highlight().size('1.25x')
    canvas.node(target).color('red').highlight().size('1.25x')
    canvas.pause(1.5)
    
    # Run Dijkstra's shortest path algorithm
    path = nx.dijkstra_path(G, source, target)
    
    # Animate the algorithm
    path_length = 0
    for i in range(len(path) - 1):
        u, v = path[i], path[i + 1]
         
        # Update the path length
        path_length += G[u][v]['weight']
        
        # Traverse the edge
        canvas.edge((u, v)).traverse('blue')
        canvas.pause(0.4)
        
        # Make the next node blue
        if v != target:
            canvas.node(v).color('blue')
        
        # Add a label to indicate current path length
        canvas.node(v).label('path').add(
            color='blue',
            text=path_length
        )
        canvas.pause(0.4)
     
    canvas
