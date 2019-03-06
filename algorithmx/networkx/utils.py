from typing import Union

from . import CanvasSelection

try:
    from networkx import is_directed
except:
    is_directed = lambda: False

def add_graph(canvas: CanvasSelection, graph, weight: Union[str, None] = 'weight') -> CanvasSelection:
    """
    Adds all nodes and edges from a NetworkX graph to the given canvas.
    Edges will automatically set the :meth:`~graphics.EdgeSelection.directed`
    attribute and/or add a weight :meth:`~graphics.EdgeSelection.label`
    depending on the provided graph.

    :param canvas: The CanvasSelection onto which the graph should be added.
    :type canvas: :class:`~graphics.CanvasSelection`

    :param graph: The NetworkX graph
    :type graph: Any type of NetworkX graph

    :param weight: The name of the attribute which describes edge weight in the the
        NetworkX graph. Edges without the attribute will not display a weight,
        and a value of ``None`` will prevent any weight from being displayed.
        Defaults to "weight".
    :type weight: Union[str, None]

    :return: The provided CanvasSelection with animations disabled, allowing
        initial attributes to be configured.
    :rtype: :class:`~graphics.CanvasSelection`
    """
    weighted_edges = []
    unweighted_edges = []
    for e in graph.edges:
        if weight in graph.edges[e]:
            weighted_edges.append(e)
        else:
            unweighted_edges.append(e)

    canvas.nodes(graph.nodes).add()

    if len(unweighted_edges) > 0:
        init_edges = canvas.edges(unweighted_edges).add()
        if is_directed(graph):
            init_edges.directed(True)

    if len(weighted_edges) > 0:
        init_edges = canvas.edges(weighted_edges).add()
        if is_directed(graph):
            init_edges.directed(True)
        init_edges.label().add().text(lambda e: graph.edges[e][weight])

    return canvas.duration(0)
