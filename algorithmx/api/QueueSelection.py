from typing import List, Union, TypeVar, Mapping, Optional
from dataclasses import dataclass

from .utils import EventCallbacks


@dataclass
class QueueContext:
    ids: List[Union[str, int]]
    withQ: Optional[str]
    callbacks: EventCallbacks


def dispatch_queue_event(context: QueueContext, queue_event: Mapping):
    if context.callbacks.dispatch is not None:
        context.callbacks.dispatch(
            {
                **(
                    {"withQ": None if context.withQ == "null" else context.withQ}
                    if context.withQ is not None
                    else {}
                ),
                "queues": {q: queue_event for q in context.ids},
            }
        )


S = TypeVar("S", bound="QueueSelection")


class QueueSelection:
    _selection: QueueContext

    def __init__(self: S, context: QueueContext):
        self._selection = context

    def pause(self: S, seconds: float) -> S:
        """Pauses the queue for the given number of seconds.

        :param seconds: The duration of the pause, in seconds.
        """
        dispatch_queue_event(self._selection, {"pause": seconds})
        return self

    def stop(self: S) -> S:
        """Stops the execution of all scheduled events in the queue."""
        dispatch_queue_event(self._selection, {"stopped": True})
        return self

    def start(self: S) -> S:
        """Starts/resumes the execution of all scheduled events in the queue."""
        dispatch_queue_event(self._selection, {"stopped": False})
        return self

    def clear(self: S) -> S:
        """Clears all scheduled events in the queue."""
        dispatch_queue_event(self._selection, {"clear": True})
        return self
