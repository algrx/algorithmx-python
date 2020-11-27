from typing import Union

from . import Canvas

try:
    from networkx import is_directed  # type: ignore
except:
    is_directed = lambda: False


def add_graph(canvas: Canvas, graph, weight: Union[str, None] = "weight") -> Canvas:
    """
    Adds all nodes and edges from a NetworkX graph to the given canvas. Edges will
    automatically set the :meth:`~graphics.EdgeSelection.directed` attribute and/or add
    a weight :meth:`~graphics.EdgeSelection.label` depending on the provided graph.

    :param canvas: The canvas onto which the graph should be added.
    :type canvas: :class:`~api.Canvas`

    :param graph: The NetworkX graph.
    :type graph: Any type of NetworkX graph

    :param weight: The name of the attribute which describes edge weight in the NetworkX
        graph. Edges without the attribute will not display a weight, and a value of
        ``None`` will prevent any weight from being displayed.  Defaults to "weight".
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
        canvas.edges(unweighted_edges).add(directed=is_directed(graph))

    if len(weighted_edges) > 0:
        canvas.edges(weighted_edges).add(
            directed=is_directed(graph),
            labels=lambda e: {0: {"text": graph.edges[e][weight]}},
        )

    return canvas.duration(0)
