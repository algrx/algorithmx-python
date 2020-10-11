from typing import Union, Tuple, Mapping, List, Optional, Callable, TypeVar, Any
from dataclasses import dataclass, replace

from .ElementSelection import ElementSelection
from .NodeSelection import NodeSelection
from .EdgeSelection import EdgeSelection, EdgeId, EdgeContext
from .LabelSelection import LabelSelection
from .QueueSelection import QueueSelection, QueueContext
from .types import ElementArg, ElementId, NumAttr, DispatchEvent, ReceiveEvent
from .utils import ElementContext, eval_element_obj_arg


S = TypeVar("S", bound="Canvas")


class Canvas(ElementSelection):
    def __init__(self: S, context: Optional[ElementContext] = None):
        if context is not None:
            super().__init__(context)
        else:
            super().__init__(ElementContext(ids=["canvas"], data=[None]))

    def node(self, id: Union[str, int]) -> NodeSelection:
        """Selects a node by its ID. Use "*" to select all existing nodes.

        :param id: A node ID.
        :type id: :data:`api.types.ElementId`

        :return: A new selection corresponding to the given node.
        """
        return self.nodes([id])

    def nodes(self, ids: List[ElementId] = ["*"]) -> NodeSelection:
        """Selects multiple nodes using an list of ID values. If no list is provided,
        all existing nodes will be selected.

        :param ids: An iterable container of node IDs, which will be converted to strings.
        :type ids: List[:data:`api.types.ElementId`]

        :return: A new selection corresponding to the given nodes.
        """
        return NodeSelection(
            replace(
                self._selection,
                ids=[str(id) for id in ids],
                data=ids,
                parentkey="nodes",
                parent=self._selection,
            )
        )

    def edge(self, edge: EdgeId) -> EdgeSelection:
        """Selects a single edge using a (source, target, optional ID) tuple.

        The optional ID is used to distinguish multi-edges. The full string ID of the
        edge will take the form "source-target(-ID)". If the edge has `directed` set to
        false, 'source' and 'target' can be provided in any order, as long as they do
        not contain the "-" character.

        When accessing edges using string IDs, e.g. through :meth:`~attrs`, the
        following rules apply:
        * New edges with IDs in the form "source-target(-ID)" will automatically
          initialize their `source`/`target` attributes.
        * For edges with `directed` set to false, "target-source(-ID)" will fall back to
          "source-target(-ID)".

        :param edge: A (source, target) or (source, target, ID) tuple.
        :type edge: :data:`~api.EdgeSelection.EdgeId`

        :return: A new selection corresponding to the given edge.
        """
        return self.edges([edge])

    def edges(self, ids: List[EdgeId] = None) -> EdgeSelection:
        """Selects multiple edges using a list of (source, target, optional ID) tuples,
        see :meth:`~edge`.

        If no list is provided, all existing edges will be selected.

        :param ids: A list of (source, target) or (source, target, ID) tuples.
            All values will be converted to strings.
        :type ids: List[:data:`~api.EdgeSelection.EdgeId`]

        :return: A new selection corresponding to the given edges.
        """
        return EdgeSelection(
            EdgeContext(
                tuples=ids,
                **replace(
                    self._selection,
                    ids=["*"]
                    if ids is None
                    else [
                        str(id[0])
                        + "-"
                        + str(id[1])
                        + ("-" + str(id[2]) if len(id) > 2 else "")  # type: ignore
                        for id in ids
                    ],
                    parentkey="edges",
                    parent=self._selection,
                ).__dict__,
            )
        )

    def label(self, id: ElementId) -> LabelSelection:
        """Selects a single canvas label by its ID. Use "*" to select all existing
        labels.

        :param id: A label ID.
        :type id: Union[str, int]

        :return: A new selection corresponding to the given label.
        """
        return self.labels([id])

    def labels(self, ids: List[ElementId] = ["*"]) -> LabelSelection:
        """Selects multiple canvas labels using a list of ID values. If no list is
        provided, all existing labels will be selected.

        :param ids: A list of label IDs.
        :type ids: List[:data:`api.types.ElementId`]

        :return: A new selection corresponding to the given labels.
        """
        return LabelSelection(
            replace(
                self._selection,
                ids=[str(id) for id in ids],
                parentkey="labels",
                parent=self._selection,
            )
        )

    def size(self: S, size: Tuple[NumAttr, NumAttr]) -> S:
        """Sets the width and height of the canvas.

        This will determine the coordinate system, and will update the ``width`` and
        ``height`` attributes of the main SVG element, unless otherwise specified with
        :meth:`~api.ElementSelection.svgattr`. Size is not animated by default.

        :param size: A (width, height) tuple.
        :type size: Tuple[:data:`~api.types.NumAttr`, :data:`~api.types.NumAttr`]]
        """
        return self.attrs(size=size)

    def edgelayout(self: S, edgelayout: str) -> S:
        """Sets strategy used to calculate edge lengths. Edges can either specify
        individual length values (see :meth:`~api.EdgeSelection.length`, or have their
        lengths dynamically calculated with the given strategy, and with an average of
        :meth:`~edgelength`.

        More information is available at
        `<https://github.com/tgdwyer/WebCola/wiki/link-lengths>`_.

        :param edgelayout: The edge length calculation strategy:
        * "individual": Uses each edge's `length` attribute individually.
        * "jaccard" (default): Dynamic calculation based on :meth:`~edgelength`.
        * "symmetric": Dynamic calculation based on :meth:`~edgelength`.
        :type edgelayout: str
        """
        return self.attrs(edgelayout=edgelayout)

    def edgelength(self: S, edgelength: float) -> S:
        """Sets the average length of all edges. This only applies if
        :meth:`~edgelayout` is not "individual".

        The default average edge length is 70.

        :param edgelength: The average edge length.
        :type edgelength: float
        """
        return self.attrs(edgelength=edgelength)

    def pan(self: S, pan: Tuple[NumAttr, NumAttr]) -> S:
        """Sets the location of the canvas camera. The canvas uses a Cartesian
        coordinate system with (0,0) at the center.

        :param pan: An (x, y) tuple describing the new pan location.
        :type pan: Tuple[:data:`~api.types.NumAttr`, :data:`~api.types.NumAttr`]
        """
        return self.attrs(pan=pan)

    def zoom(self: S, zoom: NumAttr) -> S:
        """Sets the zoom level of the canvas camera. A zoom level of 2.0 will make
        objects appear twice as large, 0.5 will make them half as large, etc.

        :param zoom: The new zoom level.
        :type zoom: :data:`~api.types.NumAttr`
        """
        return self.attrs(zoom=zoom)

    def panlimit(self: S, panlimit: Tuple[NumAttr, NumAttr]) -> S:
        """Restricts the movement of the canvas camera to the given bounding box,
        centered at (0,0).

        The default pan limit is: (-Infinity, Infinity).

        :param panlimit: A (width/2, height/2) tuple describing the bounding box.
        :type panlimit: Tuple[:data:`~api.types.NumAttr`, :data:`~api.types.NumAttr`]
        """
        return self.attrs(panlimit=panlimit)

    def zoomlimit(self: S, zoomlimit: Tuple[NumAttr, NumAttr]) -> S:
        """Restricts the zoom level of the canvas camera to the given range. The lower
        bound describes how far out the camera can zoom, while the upper bound describes
        the maximum enlarging zoom.

        The default zoom limit is (0.1, 10).

        :param limit: A (min, max) tuple describing the zoom limit.
        :type limit: Tuple[:data:`~api.types.NumAttr`, :data:`~api.types.NumAttr`]
        """
        return self.attrs(zoomlimit=zoomlimit)

    def zoomtoggle(self: S, zoomtoggle: bool) -> S:
        """Sets whether or not zooming requires the ``ctrl``/``cmd`` key to be held
        down. Disabled by default.

        :param zoomtoggle: True if the ``ctrl``/``cmd`` key is required, false otherwise.
        :type zoomtoggle: bool.
        """
        return self.attrs(zoomtoggle=zoomtoggle)

    def queue(self, id: Union[str, int] = 0) -> QueueSelection:
        """Selects a single event queue by its ID. The default queue has ID 0. Use "*"
        to select all existing queues.

        :param id: A queue ID. Defaults to 0.

        :return: A new selection corresponding to the given queue.
        """
        return self.queues([id])

    def queues(self, ids: List[Union[str, int]] = ["*"]) -> QueueSelection:
        """Selects multiple event queues using an list of ID values. If no list is
        provided, all existing queues will be selected.

        :param ids: A list of queue IDs.

        :return: A new selection corresponding to the given queues.
        """
        return QueueSelection(
            QueueContext(
                ids=ids,
                withQ=self._selection.withQ,
                callbacks=self._selection.callbacks,
            )
        )

    def pause(self: S, duration: float) -> S:
        self.queue().pause(duration)
        return self

    def message(self: S, message: str) -> S:
        """Adds a message to the current event queue. Together with :meth:`~onmessage`,
        this can be used to detect when a queue reaches a certain point in execution.

        :param message: A message string.
        """
        return self.dispatch({message: message})

    def onmessage(
        self: S, message: str, fn: Union[Callable[[], Any], Callable[[str], Any]]
    ) -> S:
        """Registers a callback function for messages sent by :meth:`~message`. Use "*"
        to listen for all messages.

        :param message: The message to listen for, or "*" to listen for all messages.
        :param fn: A callback function. When using "*", the exact message will be
        provided as an argument.
        """
        cbs = self._selection.callbacks
        self._selection = replace(
            self._selection,
            callbacks=(
                replace(cbs, message=fn)
                if message == "*"
                else replace(cbs, messages={**(cbs.messages or {}), message: fn})
            ),
        )
        return self

    def dispatch(self: S, event: DispatchEvent) -> S:
        """Sends an event to the client, in the form:
        * attrs: An attribute dictionary, see :meth:`~api.ElementSelection.attrs`.
        * animation: A partial animation dictionary will apply to all provided
        attributes, see :meth:`~api.ElementSelection.attrs`.
        * message: A message, as sent by :meth:`~message`.
        * withQ: The event queue to which the event will be added, see
          :meth:`~api.ElementSelection.withQ`.
        * queues:
            * [id]:
                * stop: True if the queue should be stopped, see
                  :meth:`~api.QueueSelection.stop`.
                * start: True if the queue should be started, see
                  :meth:`~api.QueueSelection.start`
                * clear: True if all events should be cleared from the queue, see
                  :meth:`~api.QueueSelection.clear`
                * pause: The number of seconds the queue should be paused for, see
                  :meth:`~api.QueueSelection.pause`

        :param event: A partial event object.
        :type event: DispatchEvent
        """
        if self._selection.callbacks.dispatch is not None:
            self._selection.callbacks.dispatch(event)
        return self

    def ondispatch(self: S, fn: Callable[[DispatchEvent], Any]) -> S:
        """Registers a callback function to listen for all dispatched events, see :meth:`~dispatch`.

        This will override the default event handler.

        :param fn: A callback function which receives a partial event object.
        :type fn: Callable[[DispatchEvent], Any]
        """
        setattr(self._selection.callbacks, "dispatch", fn)
        return self

    def receive(self: S, event: ReceiveEvent) -> S:
        """Simulates an event being received from the client, see :meth:`~onreceive`.

        :param event: A partial event object.
        :type event: ReceiveEvent
        """

        cbs = self._selection.callbacks

        # event callback
        if cbs.receive:
            cbs.receive(event)

        # message callbacks
        if "message" in event is not None:
            if cbs.message is not None:
                cbs.message(event["message"])
            if cbs.messages is not None and event["message"] in cbs.messages:
                cbs.messages[event["message"]]()

        # click/hover callbacks
        for element_type in ["nodes"]:
            if element_type not in event:
                continue

            for (k, element_events) in event[element_type].items():
                for event_type in element_events:
                    cb_dict = getattr(cbs, element_type)
                    if k in cb_dict and getattr(cb_dict[k], event_type) is not None:
                        getattr(cb_dict[k], event_type)()

        return self

    def onreceive(self: S, fn: Callable[[ReceiveEvent], Any]) -> S:
        """Registers a callback function for all events sent back by the client, in the form:
        * error:
           * type: "attribute" (invalid attributes), "unknown".
           * message: The error message.
        * message: A message, as sent by :meth:`~message`.
        * nodes:
            * [id]:
                * click: True if the node was clicked.
                * hoverin: True if the mouse hovered over the node.
                * hoverout: True if the mouse exited the node.

        :param fn: A callback function which receives a partial event object.
        :type fn: Callable[[ReceiveEvent], Any]
        """
        setattr(self._selection.callbacks, "receive", fn)
        return self
