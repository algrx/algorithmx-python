from typing import Union, Tuple, List, Optional, TypeVar, Any
from dataclasses import dataclass, replace

from .ElementSelection import ElementSelection
from .LabelSelection import LabelSelection
from .types import ElementArg, NumAttr, ElementId
from .utils import ElementContext, apply_attrs, eval_element_arg

EdgeId = Union[
    Tuple[Union[str, int], Union[str, int]],
    Tuple[Union[str, int], Union[str, int], Union[str, int]],
]


@dataclass
class EdgeContext(ElementContext):
    tuples: Optional[List[EdgeId]] = None


S = TypeVar("S", bound="EdgeSelection")


class EdgeSelection(ElementSelection):
    def __init__(self: S, context: EdgeContext):
        self._selection: EdgeContext = context

    def label(self, id: ElementId = 0) -> LabelSelection:
        """Selects a single edge label by its ID. Use "*" to select all existing labels.

        :param id: A label ID. Defaults to 0.
        :type id: :data:`api.types.ElementId`

        :return: A new selection corresponding to the given label, with the same data as
        the current selection.
        """
        return self.labels([id])

    def labels(self, ids: List[ElementId]) -> LabelSelection:
        """Selects multiple edge labels using a list of ID values. If no list is
        provided, all existing labels will be selected.

        :param ids: An list of label IDs.
        :type ids: List[:data:`api.types.ElementId`]

        :return: A new selection corresponding to the given labels, with the same data
        as the current selection.
        """
        return LabelSelection(
            replace(
                self._selection,
                ids=[str(id) for id in ids],
                data=None,  # use the edge (parent) data
                parentkey="labels",
                parent=self._selection,
            )
        )

    def directed(self: S, directed: ElementArg[bool]) -> S:
        """Sets whether or not the edge should include an arrow pointing towards its
        target node.

        :param directed: True if the edge should be directed, false otherwise.
        :type directed: :data:`~api.types.ElementArg`\\[bool]
        """
        return self.attrs(directed=directed)

    def length(self: S, length: ElementArg[NumAttr]) -> S:
        """Sets the length of the edge. This will only take effect when
        :meth:`~api.Canvas.edgelayout` is set to "individual".

        :param length: The length of the edge.
        :type length: :data:`~api.types.ElementArg`\\[:data:`~api.types.NumAttr`]
        """
        return self.attrs(length=length)

    def thickness(self: S, thickness: ElementArg[NumAttr]) -> S:
        """Sets the thickness of the edge.

        :param thickness: The thickness of the edge, in pixels.
        :type thickness: :data:`~api.types.ElementArg`\\[:data:`~api.types.NumAttr`]
        """
        return self.attrs(thickness=thickness)

    def color(self: S, color: ElementArg[str]) -> S:
        """Sets the color of the edge. The default color is "light-gray".

        :param color: A CSS color string.
        :type color: :data:`~api.types.ElementArg`\\[str]
        """
        return self.attrs(color=color)

    def traverse(
        self: S, color: ElementArg[str], source: Optional[ElementArg[Any]] = None
    ) -> S:
        """Sets the color of the edge using a traversal animation.

         If no source is provided, the first element in each edge tuple will be used.

        :param value: A CSS color string.
        :type value: Optional[:data:`~api.types.ElementArg`\\[str]

        :param source: The ID of the node from which the traversal animation should
        originate.
        :type source: Optional[:data:`~api.types.ElementArg`\\[ElementId]
        """

        def attr_fn(data, data_index: int, i: int):
            animsource = (
                eval_element_arg(source, data, data_index)
                if source is not None
                else self._selection.tuples[i][0]
                if self._selection.tuples is not None
                else None
            )

            return {
                "color": {
                    "animtype": "traverse",
                    "value": eval_element_arg(color, data, data_index),
                    **({"animsource": animsource} if animsource is not None else {}),
                },
            }

        apply_attrs(self._selection, attr_fn)
        return self

    def flip(self: S, flip: ElementArg[bool]) -> S:
        """Sets whether or not the edge should be 'flipped' after exceeding a certain
        angle, such that it is never rendered upside-down. This does not apply to
        looping edges.

        :param flip: True if the edge should flip automatically, false otherwise.
        :type flip: :data:`~api.types.ElementArg`\\[bool]
        """
        return self.attrs(flip=flip)

    def curve(self: S, curve: ElementArg[str]) -> S:
        """Sets the curve function used to interpolate the edge's path.

        The default setting is "cardinal". More information is available here:
        `<https://github.com/d3/d3-shape#curves>`_.

        :param curve: The name of the curve function, based on the functions found in
        D3. The full list is below:

            "basis", "bundle", "cardinal", "catmull-rom", "linear", "monotone-x",
            "monotone-y", "natural", "step", "step-before", "step-after"

        :type curve: :data:`~api.types.ElementArg`\\[str]
        """
        return self.attrs(curve=curve)

    def path(self: S, path: ElementArg[List[Tuple[NumAttr, NumAttr]]]) -> S:
        """Sets a custom path for the edge. The path is a list of (x, y) tuples, which
        will automatically connect to the boundaries of the source and target nodes.

        If the edge connects two nodes, (0,0) will be the midpoint between the two
        nodes. If edge is a loop, (0,0) will be a point on the node's boundary.

        :param path: An list of (x, y) tuples.
        :type path: :data:`~api.types.ElementArg`\\[List[Tuple[:data:`~api.types.NumAttr`, :data:`~api.types.NumAttr`]]]
        """
        return self.attrs(path=path)
