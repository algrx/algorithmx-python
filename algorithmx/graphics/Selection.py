from typing import Dict, Union, Iterable, Callable, TypeVar, Optional, Any
import uuid

from .context import SelectionContext, create_child_context
from .EventHandler import DispatchEventType
from .utils import attr_event, queue_event, call_element_fn, is_iterable
from .types import ElementArg, ElementFn

S = TypeVar('S', bound='Selection')

class Selection:
    _context: SelectionContext

    def __init__(self, context: SelectionContext):
        self._context = context

    def add(self: S) -> S:
        """
        Adds all elements in the current selection to the canvas. This should be called immediately after a
        selection of new elements is created. If the selection contains multiple elements, they will not necessarily be
        added in order.

        :return: A new instance of the current selection with animations disabled, allowing initial attributes to be
            configured.
        """
        context = self._context.copy()
        context.data = self._context.ids
        self._context.client.dispatch(attr_event(context, lambda _, i: i, lambda i: {
            'visible': True,
            **(self._context.init_attr[i] if self._context.init_attr else {})
        }))
        return self.duration(0)

    def remove(self: S) -> S:
        """
        Removes all elements in the current selection from the canvas.
        """
        self._context.client.dispatch(attr_event(self._context, None, lambda d: None))
        return self

    def set(self: S, attrs: ElementArg[Dict[str, Any]] = {}, **kwargs: Dict[str, Any]) -> S:
        """
        Sets one or more custom attributes on all elements in the current selection. The attributes are provided using
        a dictionary, where each (key, value) pair corresponds to the method and argument setting the same attribute.
        Keyword arguments can also be used in the same way. For example:

        .. code-block:: python

            node.color('red').size((20, 30)).svgattr('stroke', 'blue')
            # is equivalent to
            node.set(color = 'red',
                     size = (20, 30),
                     svgattr = {
                        'stroke': 'blue'
                     })

        :param attrs: (Optional) A dictionary of custom attributes.
        :type attrs: :data:`~graphics.types.ElementArg`\\[Dict[str, Any]]

        :param kwargs: Custom attributes as keywork arguments.
        :type kwargs: Dict[str, Any]
        """
        self._context.client.dispatch(attr_event(self._context, attrs, lambda d: {**d, **kwargs}))
        return self

    def visible(self: S, visible: ElementArg[bool]) -> S:
        """
        Sets whether or not the elements in the current selection should be visible. This can be animated in the same way
        as additions and removals. However, in contrast to removing, disabling visibility will not clear attributes or
        affect layout.

        :param visible: Whether or not the elements should be visible.
        :type bool: :data:`~graphics.types.ElementArg`\\[bool]
        """
        self._context.client.dispatch(attr_event(self._context, visible, lambda d: {'visible': d}))
        return self

    def eventQ(self: S, queue: Union[str, int, None] = 'default') -> S:
        """
        Sets the queue onto which all events triggered by the selection should be added. Each queue handles events
        independently, and all queues execute in parallel. Since queues can be delayed (see :meth:`pause`), this
        effectively enables multiple animations to run simultaneously.

        The ``None`` queue is special; all events added to it will execute immediately. The default queue is named "default".

        :param queue: The name of the queue. This can be any string or number, or ``None`` for the immediate queue.
            Defaults to "default".
        :type queue: Union[str, int, None]

        :return: A new instance of the current selection using the specified event queue.
        """
        context = self._context.copy()
        context.queue = str(queue)
        return self.__class__(context)

    def animate(self: S, animation_type: str) -> S:
        """
        Configures the type of animation which should be used for all attribute changes triggered by the selection.

        :param type: One of the following strings:

            * "normal": The standard animation, applicable in most cases.
            * "scale": Animates the size of elements being added/removed.
            * "fade": Animates the opacity of elements being added/removed.
            * "scale-face": Animates both the size and opacity of elements being added/removed.
            * "traverse": Changes the color of edges using a traversal animation (from source to target).
            * "traverse-reverse": Changes the color of edges using a reversed traversal animation (from target to source).

        :type animation_type: str

        :return: A new instance of the current selection using the specified animation type.
        """
        context = self._context.copy()
        context.animation['type'] = animation_type
        return self.__class__(context)

    def duration(self: S, seconds: Union[int, float]) -> S:
        """
        Configures the duration of all animations triggered by the selection. A duration of 0 will ensure that changes
        occur immediately.

        :param seconds: The animation duration, in seconds.
        :type seconds: Union[int, float]

        :return: A new instance of the current selection using the specified animation duration.
        """
        context = self._context.copy()
        context.animation['duration'] = seconds
        return self.__class__(context)

    def ease(self: S, ease: str) -> S:
        """
        Configures the ease function used in all animations triggered by the selection. This will affect the way attributes
        transition from one value to another. More information is available here: `<https://github.com/d3/d3-ease>`_.

        :param ease: The name of the ease function, based on the functions found in D3. The full list is below:

            "linear",
            "poly", "poly-in", "poly-out", "poly-in-out",
            "quad", "quad-in", "quad-out", "quad-in-out",
            "cubic", "cubic-in", "cubic-out", "cubic-in-out",
            "sin", "sin-in", "sin-out", "sin-in-out",
            "exp", "exp-in", "exp-out", "exp-in-out",
            "circle", "circle-in", "circle-out", "circle-in-out",
            "elastic", "elastic-in", "elastic-out", "elastic-in-out",
            "back", "back-in", "back-out", "back-in-out",
            "bounce", "bounce-in", "bounce-out", "bounce-in-out".

        :type ease: str

        :return: A new instance of the current selection using the specified animation ease.
        """
        context = self._context.copy()
        context.animation['ease'] = ease
        return self.__class__(context)

    def highlight(self: S, seconds: Optional[Union[int, float]] = None) -> S:
        """
        Returns a new selection through which all attribute changes are temporary. This is typically used to draw attention
        to a certain element without permanently changing its attributes.

        :param seconds: The amount of time attributes should remain 'highlighted', in seconds, before
            changing back to their original values. If not provided, an appropriate default will be used.
        :type seconds: Optional[Union[int, float]]

        :return: A new instance of the current selection, where all attribute changes are temporary.
        """
        context = self._context.copy()
        context.highlight = True
        if seconds is not None:
            context.animation['linger'] = seconds
        return self.__class__(context)

    def data(self: S, data: Union[Iterable[Any], ElementFn[Any]]) -> S:
        """
        Binds the selection to a list of data values. This will decide the arguments provided whenever an attribute is
        configured using a function (see :data:`~graphics.types.ElementArg`).

        :param data: An iterable container of values to use as the data of this selection, which should have the same length as the number
            of elements in the selection. Alternatively, a function (:data:`~graphics.types.ElementFn`) transforming the selection's previous data.
        :type: data: Union[Iterable[Any], ElementFn[Any]]

        :raise Exception: If the length of the data does not equal the number of elements in the selection.

        :return: A new instance of the current selection bound to the given data.
        """
        data_list = []
        if is_iterable(data):
            data_list = list(data)
            if len(data_list) != len(self._context.ids):
                raise Exception(('data length ({}) must equal the number of elements'
                + ' in the selection ({})').format(len(data_list), len(self._context.ids)))
        else:
            for i in range(self._context.ids):
                if callable(data) and self._context.data is not None:
                    data_list.append(call_element_fn(data, self._context.data[i], i))
                else:
                    data_list.append(data)

        context = self._context.copy()
        context.data = data_list
        return self.__class__(context)

    def pause(self: S, seconds: Union[int, float]) -> S:
        """
        Adds a pause to the event queue, delaying the next event by the given number of seconds.

        :param seconds: The duration of the pause, in seconds.
        :type seconds: Union[int, float]
        """
        self._context.client.dispatch({
            'type': DispatchEventType.Pause,
            'queue': self._context.queue,
            'data': {'duration': seconds}
        })
        return self

    def stop(self: S, queue: Union[Union[str, int], Iterable[Union[str, int]]] = 'default') -> S:
        """
        Stops the execution of all scheduled events on one or more event queues.
        Note this will still be added as an event onto the current queue.

        :param queue: The name of the queue to stop, or an iterable container of names. Defaults to "default".
        :type queue: Union[Union[str, int], Iterable[Union[str, int]]]
        """
        self._context.client.dispatch(queue_event(self._context, 'stop', queue))
        return self

    def stopall(self: S) -> S:
        """
        Stops the execution of all scheduled events on all event queues.
        Note this will still be added as an event onto the current queue.
        """
        self._context.client.dispatch(queue_event(self._context, 'stop', None))
        return self

    def start(self: S, queue: Union[Union[str, int], Iterable[Union[str, int]]] = 'default') -> S:
        """
        Starts/resumes the execution of all scheduled events on one or more event queues.
        Note this will still be added as an event onto the current queue.

        :param queue: The name of the queue to start, or an iterable container of names. Defaults to "default".
        :type queue: Union[Union[str, int], Iterable[Union[str, int]]]
        """
        self._context.client.dispatch(queue_event(self._context, 'start', queue))
        return self

    def startall(self: S) -> S:
        """
        Starts/resumes the execution of all scheduled events on all event queues.
        Note this will still be added as an event onto the current queue.
        """
        self._context.client.dispatch(queue_event(self._context, 'start', None))
        return self

    def cancel(self: S, queue: Union[Union[str, int], Iterable[Union[str, int]]] = 'default') -> S:
        """
        Cancels all scheduled events on one or more event queues.
        Note this will still be added as an event onto the current queue.

        :param queue: The name of the queue to cancel, or an iterable container of names. Defaults to "default".
        :type queue: Union[Union[str, int], Iterable[Union[str, int]]]
        """
        self._context.client.dispatch(queue_event(self._context, 'cancel', queue))
        return self

    def cancelall(self: S) -> S:
        """
        Cancels all scheduled events on all event queues.
        Note this will still be added as an event onto the current queue.
        """
        self._context.client.dispatch(queue_event(self._context, 'cancel', None))
        return self

    def broadcast(self: S, message: str) -> S:
        """
        Adds a message to the event queue, which will trigger a corresponding listener (see :meth:`~graphics.Selection.listen`).
        This can be used to detect when a queue reaches a certain point in execution, or to enable communication between
        a server.

        :param message: The message.
        :type message: str
        """
        self._context.client.dispatch({
            'type': DispatchEventType.Broadcast,
            'queue': self._context.queue,
            'data': {'message': 'broadcast-' + message}
        })
        return self

    def listen(self: S, message: str, on_receive: Callable) -> S:
        """
        Registers a function to listen for a specific broadcast message (see :meth:`~graphics.Selection.broadcast`). The function will
        be called when the corresponding broadcast event is processed by the event queue. If the same message is broadcast
        multiple times, the function will be called each time. This will also override any previous function listening for
        the same message.

        :param message: The message to listen for.
        :type message: str

        :param on_receive: The function to call when the message is received.
        :type on_receive: Callable
        """
        self._context.listeners['broadcast-' + message] = on_receive
        return self

    def callback(self: S, on_callback: Callable) -> S:
        """
        Adds a callback to the event queue. This is roughly equivalent to broadcasting a unique message and setting up
        a corresponding listener. The callback function is guaranteed to only execute once.

        :param on_callback: The function to call when the callback event is processed by the event queue.
        :type on_callback: Callable
        """
        message = 'callback-' + str(uuid.uuid4())
        self._context.listeners[message] = on_callback
        self._context.client.dispatch({
            'type': DispatchEventType.Broadcast,
            'queue': self._context.queue,
            'data': {'message': message}
        })
        return self
