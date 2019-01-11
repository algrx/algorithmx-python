from typing import Union, Tuple, Iterable, TypeVar

from .Selection import Selection, ElementArg
from .LabelSelection import LabelSelection
from .types import NumExpr, ElementArg, ElementFn
from .context import SelectionContext, create_child_context
from .utils import attr_event, call_element_fn

S = TypeVar('S', bound='NodeSelection')

class NodeSelection(Selection):
    def remove(self: S) -> S:
        """
        Removes all nodes in the current selection from the canvas. Additionally, removes any edges connected to the nodes.
        """
        return super().remove()

    def label(self, id: Union[str, int] = 'value') -> LabelSelection:
        """
        Selects a single label, attached to the node, by its ID.

        By default, each node is initialized with a "value" label, located at the center of the node and displaying its ID.
        Any additional labels will be automatically positioned along the boundary of the node.

        :param id: The ID of the label. Defaults to "value".
        :type id: Union[str, int]

        :return: A new selection corresponding to the given label.
        """
        return self.labels([id])

    def labels(self, ids: Iterable[Union[str, int]]) -> LabelSelection:
        """
        Selects multiple labels, attached to the node, using a list of ID values.

        :param ids: An iterable container of label IDs.
        :type ids: Iterable[Union[str, int]]

        :return: A new selection corresponding to the given labels.
        """
        label_context = create_child_context(parent=self._context, name='labels', ids=[str(k) for k in ids], data=None)
        return LabelSelection(label_context)

    def shape(self: S, shape: ElementArg[str]) -> S:
        """
        Sets the shape of the node. Note that shape cannot be animated or highlighted.

        :param shape: One of the following strings:

            * "circle": Standard circular node with a single radius dimension.
            * "rect": Rectangular node with separate width and height dimensions, and corner rounding.
            * "ellipse": Elliptical node with width and height dimensions.

        :type shape: :data:`~graphics.types.ElementArg`\\[str]
        """
        self._context.client.dispatch(attr_event(self._context, shape, lambda d: {'shape': d}))
        return self

    def corners(self: S, radius: ElementArg[NumExpr]) -> S:
        """
        Sets the rounding of the node's corners. This only applies to rectangular nodes.

        :param radius: The radial corner rounding.
        :type radius: :data:`~graphics.types.ElementArg`\\[:data:`~graphics.types.NumExpr`]
        """
        self._context.client.dispatch(attr_event(self._context, radius, lambda d: {'corners': d}))
        return self

    def color(self: S, color: ElementArg[str]) -> S:
        """
        Sets the color of the node.

        :param color: A CSS color string.
        :type color: :data:`~graphics.types.ElementArg`\\[str]
        """
        self._context.client.dispatch(attr_event(self._context, color, lambda d: {'color': d}))
        return self

    def size(self: S, size: ElementArg[Union[NumExpr, Tuple[NumExpr, NumExpr]]]) -> S:
        """
        Sets the size of the node. If the node is a circle, a single radius value is sufficient.
        Otherwise, a tuple containing both the horizontal and vertical radius should be provided.

        Note that size can be set relative to the node's current size using string expressions, e.g. "1.5x" for circles
        or ("1.5x", "1.5y") for rectangles and other shapes.

        :param size: The radius of the node, or a (width/2, height/2) tuple.
        :type size: :data:`~graphics.types.ElementArg`\\[Union[:data:`~graphics.types.NumExpr`, Tuple[:data:`~graphics.types.NumExpr`, :data:`~graphics.types.NumExpr`]]]
        """
        self._context.client.dispatch(attr_event(self._context, size, lambda d: {'size': d}))
        return self

    def pos(self: S, pos: ElementArg[Tuple[NumExpr, NumExpr]]) -> S:
        """
        Sets the position of the node. The canvas uses a Cartesian coordinate system with (0, 0) at the center.

        :param pos: An (x, y) tuple describing the new position of the node.
        :type pos: :data:`~graphics.types.ElementArg`\\[Tuple[:data:`~graphics.types.NumExpr`, :data:`~graphics.types.NumExpr`]]
        """
        self._context.client.dispatch(attr_event(self._context, pos, lambda d: {'pos': d}))
        return self

    def fixed(self: S, fixed: ElementArg[bool]) -> S:
        """
        When set to true, this prevents the node from being automatically moved during the layout process.
        This does not affect manual dragging.

        :param fixed: True if the position of the node should be fixed, false otherwise.
        :type fixed: :data:`~graphics.types.ElementArg`\\[bool]
        """
        self._context.client.dispatch(attr_event(self._context, fixed, lambda d: {'fixed': d}))
        return self

    def draggable(self: S, draggable: ElementArg[bool]) -> S:
        """
        Sets whether or not the node can be manually dragged around.

        :param draggable: True if the node should be draggable, false otherwise.
        :type draggable: :data:`~graphics.types.ElementArg`\\[bool]
        """
        self._context.client.dispatch(attr_event(self._context, draggable, lambda d: {'draggable': d}))
        return self

    def click(self: S, on_click: ElementFn) -> S:
        """
        Registers a function to listen for node click events.
        This will override any previous function listening for click events on the same node.

        :param on_click: A function taking the node's data (see :meth:`~graphics.Selection.data`) and, optionally, index.
        :type on_click: :data:`~graphics.types.ElementFn`
        """
        self._context.client.dispatch(attr_event(self._context, True, lambda d: {'click': d}))
        for i, k in enumerate(self._context.ids):
            self._context.listeners['click-node-' + k] = \
                lambda: call_element_fn(on_click, self._context.data[i], i)
        return self

    def hoverin(self: S, on_hoverin: ElementFn) -> S:
        """
        Registers a function to listen for node mouse-over events, triggered when the mouse enters the node.
        This will override any previous function listening for hover-in events on the same node.

        :param on_hoverin: A function taking the node's data (see :meth:`~graphics.Selection.data`) and, optionally, index.
        :type on_hoverin: :data:`~graphics.types.ElementFn`
        """
        self._context.client.dispatch(attr_event(self._context, True, lambda d: {'hover': d}))
        for i, k in enumerate(self._context.ids):
            self._context.listeners['hoverin-node-' + k] = \
                lambda: call_element_fn(on_hoverin, self._context.data[i], i)
        return self

    def hoverout(self: S, on_hoverout: ElementFn) -> S:
        """
        Registers a function to listen for node mouse-over events, triggered when the mouse leaves the node.
        This will override any previous function listening for hover-out events on the same node.

        :param on_hoverout: A function taking the node's data (see :meth:`~graphics.Selection.data`) and, optionally, index.
        :type on_hoverout: :data:`~graphics.types.ElementFn`
        """
        self._context.client.dispatch(attr_event(self._context, True, lambda d: {'hover': d}))
        for i, k in enumerate(self._context.ids):
            self._context.listeners['hoverout-node-' + k] = \
                lambda: call_element_fn(on_hoverout, self._context.data[i], i)
        return self

    def svgattr(self: S, key: str, value: ElementArg[Union[str, int, float, None]]):
        """
        Sets a custom SVG attribute on the node's shape.

        :param key: The name of the SVG attribute.
        :type key: str

        :param value: The value of the SVG attribute.
        :type value: :data:`~graphics.types.ElementArg`\\[Union[str, int, float, None]]
        """
        self._context.client.dispatch(attr_event(self._context, value, lambda d: {'svgattr': {key: d}}))
        return self
