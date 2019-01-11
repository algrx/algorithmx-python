from typing import Union, Tuple, Iterable, TypeVar

from .Selection import Selection
from .LabelSelection import LabelSelection
from .context import create_child_context
from .types import ElementArg, NumExpr
from .utils import attr_event

S = TypeVar('S', bound='EdgeSelection')

class EdgeSelection(Selection):
    def label(self, id: Union[str, int] = 'weight') -> LabelSelection:
        """
        Selects a single label, attached to the edge, by its ID.

        :param id: The ID of the label. Defaults to "weight".
        :type id: Union[str, int]

        :return: A new selection corresponding to the given label.
        """
        return self.labels([id])

    def labels(self, ids: Iterable[Union[str, int]]) -> LabelSelection:
        """
        Selects multiple labels, attached to the edge, using a list of ID values.

        :param ids: An iterable container of label IDs.
        :type ids: Iterable[Union[str, int]]

        :return: A new selection corresponding to the given labels.
        """
        label_context = create_child_context(parent=self._context, name='labels', ids=[str(k) for k in ids], data=None)
        return LabelSelection(label_context)

    def directed(self: S, directed: ElementArg[bool]) -> S:
        """
        Sets whether or not the edge should include an arrow pointing towards its target node.

        :param directed: True if the edge should be directed, false otherwise.
        :type directed: :data:`~graphics.types.ElementArg`\\[bool]
        """
        self._context.client.dispatch(attr_event(self._context, directed, lambda d: {'directed': d}))
        return self

    def length(self: S, length: ElementArg[NumExpr]) -> S:
        """
        Sets the length of the edge. This will only take effect when :meth:`~graphics.CanvasSelection.edgelengths` is set to "individual".

        :param length: The length of the edge.
        :type length: :data:`~graphics.types.ElementArg`\\[:data:`~graphics.types.NumExpr`]
        """
        self._context.client.dispatch(attr_event(self._context, length, lambda d: {'length': d}))
        return self

    def thickness(self: S, thickness: ElementArg[NumExpr]) -> S:
        """
        Sets the thickness of the edge.

        :param thickness: The thickness of the edge.
        :type thickness: :data:`~graphics.types.ElementArg`\\[:data:`~graphics.types.NumExpr`]
        """
        self._context.client.dispatch(attr_event(self._context, thickness, lambda d: {'thickness': d}))
        return self

    def color(self: S, color: ElementArg[str]) -> S:
        """
        Sets color of the edge. Note that this can be animated with a traversal animation ("traverse" or
        "traverse-reverse", see :meth:`~graphics.Selection.animate`).

        :param color: A CSS color string.
        :type color: :data:`~graphics.types.ElementArg`\\[str]
        """
        self._context.client.dispatch(attr_event(self._context, color, lambda d: {'color': d}))
        return self

    def flip(self: S, flip: ElementArg[bool]) -> S:
        """
        Sets whether or not the edge should be 'flipped' after exceeding a certain angle, such that it is never rendered
        upside-down. This only applies to edges connecting two nodes.

        :param flip: True if the edge should flip automatically, false otherwise.
        :type flip: :data:`~graphics.types.ElementArg`\\[bool]
        """
        self._context.client.dispatch(attr_event(self._context, flip, lambda d: {'flip': d}))
        return self

    def curve(self: S, curve: ElementArg[str]) -> S:
        """
        Sets the curve function used to interpolate the edge's path. The default setting is "cardinal". More
        information is available here: `<https://github.com/d3/d3-shape#curves>`_.

        :param curve: The name of the curve function, based on the functions found in D3. The full list is below:

            "basis",
            "bundle",
            "cardinal",
            "catmull-rom",
            "linear",
            "monotone-x",
            "monotone-y",
            "natural",
            "step", "step-before", "step-after"

        :type curve: :data:`~graphics.types.ElementArg`\\[str]
        """
        self._context.client.dispatch(attr_event(self._context, curve, lambda d: {'curve': d}))
        return self

    def path(self: S, path: ElementArg[Iterable[Tuple[NumExpr, NumExpr]]]) -> S:
        """
        Sets a custom path for the edge. The path is a list of (x, y) tuples, relative to the edge's origin, which will
        automatically connect to the boundaries of the source and target nodes.

        If the edge connects two nodes, (0, 0) will be the midpoint between the two nodes. If edge is a looping edge
        connecting one node, (0, 0) will be a point along the node's boundary, in the direction of the edge.

        :param path: An iterable container of (x, y) tuples.
        :type path: :data:`~graphics.types.ElementArg`\\[Iterable[Tuple[:data:`~graphics.types.NumExpr`, :data:`~graphics.types.NumExpr`]]]
        """
        self._context.client.dispatch(attr_event(self._context, path, lambda d: {'path': list(d)}))
        return self

    def svgattr(self: S, key: str, value: ElementArg[Union[str, int, float, None]]):
        """
        Sets a custom SVG attribute on the edge's path.

        :param key: The name of the SVG attribute.
        :type key: str

        :param value: The value of the SVG attribute.
        :type value: :data:`~graphics.types.ElementArg`\\[Union[str, int, float, None]]
        """
        self._context.client.dispatch(attr_event(self._context, value, lambda d: {'svgattr': {key: d}}))
        return self
