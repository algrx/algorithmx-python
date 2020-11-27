from typing import Union, Tuple, Iterable, TypeVar, Optional, Any
from dataclasses import replace

from .ElementSelection import ElementSelection
from .LabelSelection import LabelSelection
from .types import NumAttr, AnyId, ElementArg, ElementFn
from .utils import add_element_callback

S = TypeVar("S", bound="NodeSelection")


class NodeSelection(ElementSelection):
    def remove(self: S) -> S:
        """Removes all selected nodes nodes, and any edges connected to the nodes."""
        return super().remove()

    def label(self, id: AnyId = 0) -> LabelSelection:
        """Selects a single node label by its ID. The node's default 'value label' has
        ID 0. Use "*" to select all existing labels.

        :param id: A label ID. Defaults to 0.
        :type id: ElementId

        :return: A new selection corresponding to the given labels, with the same data
            as the current selection.
        """
        return self.labels([id])

    def labels(self, ids: Iterable[AnyId]) -> LabelSelection:
        """Selects multiple node labels using a list of ID values. If no list is
        provided, all existing labels will be selected.

        :param ids: An list of label IDs.
        :type ids: Iterable[:data:`api.types.ElementId`]

        :return: A new selection corresponding to the given labels, with the same data
            as the current selection.
        """
        return LabelSelection(
            replace(
                self._selection,
                ids=[str(l) for l in ids],
                data=None,  # use the node (parent) data
                parentkey="labels",
                parent=self._selection,
            )
        )

    def shape(self: S, shape: ElementArg[str]) -> S:
        """Sets the shape of the node.

        :param shape: One of the following strings:

            * "circle" (default): Circular node with a single radius dimension.
            * "rect": Rectangular node with separate width and height dimensions, and corner rounding.
            * "ellipse": Elliptical node with separate width and height dimensions.

        :type shape: :data:`~api.types.ElementArg`\\[str]
        """
        return self.attrs(shape=shape)

    def color(self: S, color: ElementArg[str]) -> S:
        """Sets the color of the node. The default color is "dark-gray".

        :param color: A CSS color string.
        :type color: :data:`~api.types.ElementArg`\\[str]
        """
        return self.attrs(color=color)

    def size(self: S, size: ElementArg[Union[NumAttr, Tuple[NumAttr, NumAttr]]]) -> S:
        """Sets the size of the node using a (width/2, height/2) tuple.

        If a single value is provided, it will be used for both dimensions. If the node is a circle,
        width/2 is the radius and height is ignored.

        Note that size can be set relative to the node's current size using string expressions, e.g.
        "1.5x" for circles or ("1.5x", "1.5y") for rectangles.

        The default size is (12, 12).

        :param size: A single radius, or a (width/2, height/2) tuple.
        :type size: :data:`~api.types.ElementArg`\\[Union[:data:`~api.types.NumAttr`,
            Tuple[:data:`~api.types.NumAttr`, :data:`~api.types.NumAttr`]]]
        """
        return self.attrs(size=size)

    def pos(self: S, pos: ElementArg[Tuple[NumAttr, NumAttr]]) -> S:
        """Sets the position of the node. The canvas uses a Cartesian coordinate system
        with (0, 0) at the center.

        :param pos: An (x, y) tuple describing the new position of the node.
        :type pos: :data:`~api.types.ElementArg`\\[Tuple[:data:`~api.types.NumAttr`, :data:`~api.types.NumAttr`]]
        """
        return self.attrs(pos=pos)

    def fixed(self: S, fixed: ElementArg[bool]) -> S:
        """When set to true, this prevents the node from being automatically moved
        during the layout process. This does not affect manual dragging.

        :param fixed: True if the position of the node should be fixed, false otherwise.
        :type fixed: :data:`~api.types.ElementArg`\\[bool]
        """
        return self.attrs(fixed=fixed)

    def draggable(self: S, draggable: ElementArg[bool]) -> S:
        """Sets whether the node can be manually dragged around.

        :param draggable: True if the node should be draggable, false otherwise.
        :type draggable: :data:`~api.types.ElementArg`\\[bool]
        """
        return self.attrs(draggable=draggable)

    def onclick(self: S, fn: ElementFn) -> S:
        """Registers a callback function to listen for node click events.

        This will override any previous callback.

        :param fn: A callback function taking the node's data and, optionally, index.
        :type fn: :data:`~api.types.ElementFn`
        """
        add_element_callback(self._selection, "click", fn)
        return self.attrs(listenclick=True)

    def onhoverin(self: S, fn: ElementFn) -> S:
        """Registers a callback function to listen for node mouse-over events, triggered
        when the mouse enters the node.

        This will override any previous callback.

        :param fn: A callback function taking the node's data and, optionally, index.
        :type fn: :data:`~api.types.ElementFn`
        """
        add_element_callback(self._selection, "hoverin", fn)
        return self.attrs(listenhover=True)

    def onhoverout(self: S, fn: ElementFn) -> S:
        """Registers a callback function to listen for node mouse-over events, triggered
        when the mouse leaves the node.

        This will override any previous callback.

        :param fn: A callback function taking the node's data and, optionally, index.
        :type fn: :data:`~api.types.ElementFn`
        """
        add_element_callback(self._selection, "hoverout", fn)
        return self.attrs(listenhover=True)
