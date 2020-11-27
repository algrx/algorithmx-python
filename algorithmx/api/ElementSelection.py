from typing import Iterable, Mapping, Union, Iterable, Callable, TypeVar, Optional, Any
from dataclasses import dataclass, replace
from inspect import signature

from .utils import ElementContext, apply_attrs, eval_element_value, eval_element_dict
from .types import ElementArg, ElementFn, AnyId


S = TypeVar("S", bound="ElementSelection")


class ElementSelection:
    def __init__(self: S, context: ElementContext):
        self._selection: ElementContext = context

    def attrs(
        self: S,
        attrs: ElementArg[Mapping[str, ElementArg[Any]]] = {},
        **kwargs: ElementArg[Any],
    ) -> S:
        """
        Applies a dictionary of attributes to all selected elements.

        All attributes correspond to the available methods. Most attribute endpoints can be provided
        either as a single value, or as partial dictionary in the form:
        * value: The attribute value.
        * duration: The duration of the animation, see :meth:`~duration`.
        * ease: The animation ease, see :meth:`~ease`.
        * highlight: Whether the change is temporary, see :meth:`~highlight`.
        * linger: How long a highlight should last, see :meth:`~highlight`.
        * Some attributes may also contain additional properties.

        The whole dictionary, or any of its direct entries, can be provided as an [[ElementFn]].
        
        .. code-block:: python

            nodes.size((20, 30)) \
                .pos(lambda _, i: (i * 10, 0)) \
                .svgattr('stroke', 'blue') \
                .duration(2.5).color('red')
            
            # is equivalent to
            nodes.attrs(
               size=[20, 30],
               pos=lambda _, i: (i * 10, 0),
               svgattrs: { stroke: "blue" },
               color={
                   "value": "red",
                   "duration": 2.5,
               },
            )

        The whole dictionary, or any of its direct entries, can be provided as an
        :data:`~api.types.ElementFn`. Entries can also be provided using keyword
        arguments.

        :param attrs: An attribute dictionary.
        :type attrs: dict
        """
        apply_attrs(
            self._selection,
            lambda d, i, _: {
                **eval_element_dict(attrs, d, i),
                **eval_element_dict(kwargs, d, i),
            },
        )
        return self

    def add(
        self: S,
        attrs: ElementArg[Mapping[str, ElementArg[Any]]] = {},
        **kwargs: ElementArg[Any],
    ) -> S:
        """Adds all selected elements to the canvas with the given initial attributes.

        :param attrs: An attribute dictionary, see :data:`~api.types.ElementAttrs`.
        :type attrs: ElementArg[Mapping]

        :return: A new instance of the current selection with animations disabled, to
            allow for further attribute initialisation.
        """
        return self.attrs(
            lambda d, i: {
                **(eval_element_dict(attrs, d, i) if attrs is not None else {}),
                **eval_element_dict(kwargs, d, i),
            }
        ).duration(0)

    def remove(self: S) -> S:
        """Removes all selected elements, resetting their attributes and layout state."""
        return self.attrs(remove=True)

    def visible(self: S, visible: ElementArg[bool]) -> S:
        """
        Sets whether or not the elements in the current selection should be visible. This can be animated in the same way
        as additions and removals. However, in contrast to removing, disabling visibility will not clear attributes or
        affect layout.

        :param visible: Whether or not the elements should be visible.
        :type visible: :data:`~api.types.ElementArg`\\[bool]
        """
        return self.attrs(visible=visible)

    def svgattr(self: S, key: str, value: ElementArg[Union[str, int, float]]):
        """Sets a custom SVG attribute on the element. The root SVG tag is ``<shape>``
        for nodes, ``<path>`` for edges, ``<text>`` for labels, and ``<svg>`` for the
        canvas.

        Note that when using :meth:`attrs`, SVG attributes should be provided as a
        dictionary under the key ``svgattrs``.

        :param key: The name of the SVG attribute.
        :type key: str

        :param value: The value of the SVG attribute.
        :type value: :data:`~api.types.ElementArg`\\[Union[str, int, float]]
        """
        return self.attrs(
            lambda d, i: {
                "svgattrs": {
                    key: eval_element_value(value, d, i),
                },
            }
        )

    def withQ(self: S, queue: Union[AnyId, None] = 0) -> S:
        """Sets the event queue to use for all events triggered by the selection. Each
        queue handles events independently, and all queues execute in parallel, which
        enables multiple animations to run simultaneously.

        The ``None`` queue is special; all events added to it will execute immediately.
        The default queue ID is 0.

        :param queue: The name of the queue. This can be any string or number, or
            ``None`` for the immediate queue. Defaults to 0.
        :type queue: Union[str, int, None]

        :return: A new instance of the current selection using the specified event
            queue.
        """
        return self.__class__(
            replace(self._selection, withQ="null" if queue is None else str(queue)),
        )

    def duration(self: S, seconds: ElementArg[Union[int, float]]) -> S:
        """Configures the duration of all animations triggered by the selection. A
        duration of 0 will ensure that changes occur immediately. The default duration
        is usually 0.5.

        :param seconds: The animation duration, in seconds.
        :type seconds: Union[int, float]

        :return: A new instance of the current selection using the given animation
            duration.
        """
        return self.__class__(
            replace(
                self._selection,
                animation={
                    **(self._selection.animation or {}),
                    "duration": seconds,
                },
            )
        )

    def ease(self: S, ease: ElementArg[str]) -> S:
        """Configures the ease function used in all animations triggered by the
        selection.  This will affect the way attributes transition from one value to
        another. More information is available here: `<https://github.com/d3/d3-ease>`_.

        :param ease: The name of the ease function, based on the functions found in D3.
            The full list is below:

            "linear", "poly", "poly-in", "poly-out", "poly-in-out", "quad", "quad-in",
            "quad-out", "quad-in-out", "cubic", "cubic-in", "cubic-out", "cubic-in-out",
            "sin", "sin-in", "sin-out", "sin-in-out", "exp", "exp-in", "exp-out",
            "exp-in-out", "circle", "circle-in", "circle-out", "circle-in-out",
            "elastic", "elastic-in", "elastic-out", "elastic-in-out", "back", "back-in",
            "back-out", "back-in-out", "bounce", "bounce-in", "bounce-out",
            "bounce-in-out".

        :type ease: str

        :return: A new instance of the current selection using the given animation ease.
        """
        return self.__class__(
            replace(
                self._selection,
                animation={
                    **(self._selection.animation or {}),
                    "ease": ease,
                },
            )
        )

    def highlight(
        self: S, seconds: Optional[ElementArg[Union[int, float]]] = None
    ) -> S:
        """Returns a new selection through which all attribute changes are temporary.
        This is typically used to draw attention to a certain element without
        permanently changing its attributes.

        :param seconds: The amount of time attributes should remain 'highlighted', in
            seconds, before changing back to their original values. Defaults to 0.5.
        :type seconds: Optional[:data:`~api.types.ElementArg`\\[Union[int, float]]]

        :return: A new instance of the current selection, where all attribute changes are temporary.
        """
        return self.__class__(
            replace(
                self._selection,
                animation={
                    **(self._selection.animation or {}),
                    "highlight": True,
                    **({"linger": seconds} if seconds is not None else {}),
                },
            )
        )

    def pause(self: S, seconds: Union[int, float]) -> S:
        """Adds a pause to the current event queue. The pause will only start once all
        previous pauses have finished. This is a shortcut for
        :meth:`~api.QueueSelection.pause`.

        :param seconds: The duration of the pause, in seconds.
        :type seconds: Union[int, float]
        """
        if (
            self._selection.withQ != "null"
            and self._selection.callbacks.dispatch is not None
        ):
            self._selection.callbacks.dispatch(
                {
                    "queues": {(self._selection.withQ or 0): {"pause": seconds}},
                    "withQ": self._selection.withQ or 0,
                }
            )

        return self

    def data(self: S, data: Union[Iterable[Any], ElementFn[Any]]) -> S:
        """Binds the selection to a list of data values. This will determine the data
        argument to provide whenever an :data:`~api.types.ElementFn` is used.

        You can also provide a function to map the current data list to a new one.

        :param data: Either a list of data values (which must have the same length as
            the number of elements in the selection), or a function which maps the
            current data list.
        :type data: Union[Iterable[Any], :data:`~api.ElementFn`\\[Any]]

        :raise Exception: If the length of the data does not equal the number of
            elements in the selection.

        :return: A new instance of the current selection bound to the given data.
        """
        data_list = (
            [
                eval_element_value(data, d, i)
                for (i, d) in enumerate(self._selection.data or [])
            ]
            if callable(data)
            else list(data)
        )

        if isinstance(data_list, list) and len(data_list) != len(self._selection.ids):
            raise Exception(
                f"data length ({len(data_list)}) must equal the number of"
                + f" elements in the selection ({len(self._selection.ids)})"
            )

        return self.__class__(replace(self._selection, data=data_list))
