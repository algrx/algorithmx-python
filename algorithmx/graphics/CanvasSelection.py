from typing import Union, Tuple, List, TypeVar, Iterable

from .Selection import Selection
from .types import ElementArg, NumExpr
from .NodeSelection import NodeSelection
from .EdgeSelection import EdgeSelection
from .LabelSelection import LabelSelection
from .context import SelectionContext, SelectionListeners, create_child_context
from .EventHandler import EventHandler, ReceiveEvent, ReceiveEventType, DispatchEvent
from .utils import attr_event

class GraphicsException(Exception):
    pass

def receive_handler(event: ReceiveEvent, listeners: SelectionListeners):
    event_data = event['data']
    def trigger_listener(name):
        if name in listeners:
            listeners[name]()

    if event['type'] == ReceiveEventType.Broadcast:
        trigger_listener(event_data['message'])

    elif event['type'] == ReceiveEventType.Click:
        trigger_listener('click-node-{}'.format(event_data['id']))

    elif event['type'] == ReceiveEventType.Hover:
        trigger_listener('{}-node-{}'.format('hoverin' if event_data['entered'] else 'hoverout', event_data['id']))

    elif event['type'] == ReceiveEventType.Error:
        raise GraphicsException(event['data']['message'])

EdgeSelector = Union[
    Tuple[Union[str, int], Union[str, int]],
    Tuple[Union[str, int], Union[str, int], Union[str, int]]
]

S = TypeVar('S', bound='CanvasSelection')

class CanvasSelection(Selection):
    def node(self, id: Union[str, int]) -> NodeSelection:
        """
        Selects a single node by its ID.

        :param id: The ID of the node.
        :type id: Union[str, int]

        :return: A new selection corresponding to the given node.
        """
        return self.nodes([id])

    def nodes(self, ids: Iterable[Union[str, int]]) -> NodeSelection:
        """
        Selects multiple nodes using a list of ID values.

        :param ids: An iterable container of node IDs.
        :type ids: Iterable[Union[str, int]]

        :return: A new selection corresponding to the given nodes.
        """
        node_context = create_child_context(parent=self._context, name='nodes', ids=[str(k) for k in ids], data=ids)
        return NodeSelection(node_context)

    def edge(self, edge: EdgeSelector) -> None:
        """
        Selects a single edge by its source, target, and optional ID. The additional ID value will distinguish edges
        connected to the same nodes. Once the edge has been added, source and target nodes can be provided in any order.

        :param edge: A (source, target) or (source, target, ID) tuple.
        :type edge: Tuple[Union[str, int], Union[str, int]]
        :type edge: Tuple[Union[str, int], Union[str, int], Union[str, int]]

        :return: A new selection corresponding to the given edge.
        """
        return self.edges([edge])

    def edges(self, edges: Iterable[EdgeSelector]) -> None:
        """
        Selects multiple edges using a list of source, target, and optional ID tuples.

        :param edges: An iterable container of (source, target) or (source, target, ID) tuples.
        :type edges: Iterable[Tuple[Union[str, int], Union[str, int], Union[str, int]?]]

        :return: A new selection corresponding to the given edges.
        """
        edge_ids = []
        init_attr = []
        for edge in edges:
            ordered_nodes = [edge[0], edge[1]]
            ordered_nodes.sort()

            edge_ids.append('{}-{}{}'.format(ordered_nodes[0], ordered_nodes[1],
                ('-' + str(edge[2])) if len(edge) >= 3 else ''))
            init_attr.append({'source': str(edge[0]), 'target': str(edge[1])})

        edge_context = create_child_context(parent=self._context, name='edges',
            ids=edge_ids, data=edges, initattr=init_attr)
        return EdgeSelection(edge_context)

    def label(self, id: Union[str, int] = 'title') -> LabelSelection:
        """
        Selects a single label, attached to the canvas, by its ID.

        :param id: The ID of the label. Defaults to "title".
        :type id: Union[str, int]

        :return: A new selection corresponding to the given label.
        """
        return self.labels([id])

    def labels(self, ids: Iterable[Union[str, int]]) -> LabelSelection:
        """
        Selects multiple labels, attached to the canvas, using an array of ID values.

        :param ids: An iterable container of labels IDs.
        :type ids: Iterable[Union[str, int]]

        :return: A new selection corresponding to the given labels.
        """
        label_context = create_child_context(parent=self._context, name='labels', ids=[str(k) for k in ids], data=None)
        return LabelSelection(label_context)

    def size(self: S, size: ElementArg[Tuple[NumExpr, NumExpr]]) -> S:
        """
        /**
        Sets the width and height of the canvas. This will determine the coordinate system, and will update the ``width`` and
        ``height`` attributes of the main SVG element, unless otherwise specified with :meth:`~svgattr`.

        :param size: A (width, height) tuple describing the size of the canvas.
        :type size: :data:`~graphics.types.ElementArg`\\[Tuple[:data:`~graphics.types.NumExpr`, :data:`~graphics.types.NumExpr`]]
        """
        self._context.client.dispatch(attr_event(self._context, size, lambda d: {'size': d}))
        return self

    def edgelengths(self: S, length_info: ElementArg[Union[str, Tuple[str, NumExpr]]]) -> S:
        """
        Sets method used to calculate edge lengths. Edges can either specify individual length values (see :meth:`~graphics.EdgeSelection.length`),
        or have their lengths dynamically calculated, in which case an 'average length' value can be provided.
        More information is available here: `<https://github.com/tgdwyer/WebCola/wiki/link-lengths>`_.

        The default setting is: (type="jaccard", average length=70).

        :param length_info: Either a single string describing the edge length type, or a (type, average length) tuple.
            The valid edge length types are:

            * "individual": Uses each edge's length attribute individually.
            * "jaccard", "symmetric": Dynamic calculation using an 'average length' value.
        :type length_info: :data:`~graphics.types.ElementArg`\\[Union[str, Tuple[str, :data:`~graphics.types.NumExpr`]]]
        """
        self._context.client.dispatch(attr_event(self._context, length_info, lambda d: {'edgelengths': d}))
        return self

    def pan(self: S, location: ElementArg[Tuple[NumExpr, NumExpr]]) -> S:
        """
        Sets the location of the canvas camera. The canvas uses a Cartesian coordinate system with (0, 0) at the center.

        :param location: An (x, y) tuple describing the new pan location.
        :type location: :data:`~graphics.types.ElementArg`\\[Tuple[:data:`~graphics.types.NumExpr`, :data:`~graphics.types.NumExpr`]]
        """
        self._context.client.dispatch(attr_event(self._context, location, lambda d: {'pan': d}))
        return self

    def zoom(self: S, zoom: ElementArg[NumExpr]) -> S:
        """
        Sets the zoom level of the canvas camera. A zoom level of 2.0 will make objects appear twice as large, 0.5 will
        make them half as large, etc.

        :param zoom: The new zoom level.
        :type zoom: :data:`~graphics.types.ElementArg`\\[:data:`~graphics.types.NumExpr`]
        """
        self._context.client.dispatch(attr_event(self._context, zoom, lambda d: {'zoom': d}))
        return self

    def panlimit(self: S, box: ElementArg[Tuple[NumExpr, NumExpr]]) -> S:
        """
        Restricts the movement of the canvas camera to the given bounding box, centered at (0, 0). The canvas will only
        be draggable when the camera is within the bounding box (i.e. the coordinates currently in view are a subset of the
        bounding box).

        The default pan limit is: (-Infinity, Infinity).

        :param box: A (width/2, height/2) tuple describing the bounding box.
        :type box: :data:`~graphics.types.ElementArg`\\[Tuple[:data:`~graphics.types.NumExpr`, :data:`~graphics.types.NumExpr`]]
        """
        self._context.client.dispatch(attr_event(self._context, box, lambda d: {'panlimit': d}))
        return self

    def zoomlimit(self: S, limit: ElementArg[Tuple[NumExpr, NumExpr]]) -> S:
        """
        Restricts the zoom level of the canvas camera to the given range. The lower bound describes how far
        away the camera can zoom, while the upper bound describes the maximum enlarging zoom.

        The default zoom limit is: (0.1, 10).

        :param limit: A (min, max) tuple describing the zoom limit.
        :type limit: :data:`~graphics.types.ElementArg`\\[Tuple[:data:`~graphics.types.NumExpr`, :data:`~graphics.types.NumExpr`]]
        """
        self._context.client.dispatch(attr_event(self._context, limit, lambda d: {'zoomlimit': d}))
        return self

    def zoomkey(self: S, required: ElementArg[bool]) -> S:
        """
        Sets whether or not zooming requires the ``ctrl``/``cmd`` key to be held down. Disabled by default.

        :param required: True if the ``ctrl``/``cmd`` key is required, false otherwise.
        :type required: :data:`~graphics.types.ElementArg`\\[bool]
        """
        self._context.client.dispatch(attr_event(self._context, required, lambda d: {'zoomkey': d}))

    def svgattr(self: S, key: str, value: ElementArg[Union[str, int, float, None]]):
        """
        Sets a custom SVG attribute on the canvas.

        :param key: The name of the SVG attribute.
        :type key: str

        :param value: The value of the SVG attribute.
        :type value: :data:`~graphics.types.ElementArg`\\[Union[str, int, float, None]]
        """
        self._context.client.dispatch(attr_event(self._context, value, lambda d: {'svgattr': {key: d}}))
        return self


def canvas_selection(canvas: str, handler: EventHandler) -> CanvasSelection:
    context = SelectionContext(handler)
    context.name = 'canvas'
    context.data = [canvas]
    handler.subscribe(lambda event: receive_handler(event, context.listeners))
    return CanvasSelection(context)
