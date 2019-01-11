from typing import Dict, Union, Callable, Iterable, Any
from inspect import signature

from .context import SelectionContext
from .EventHandler import DispatchEvent, DispatchEventType

def is_iterable(obj):
    try:
        list(obj)
        return True
    except:
        return False


def call_element_fn(fn: Callable, data: Any, index: int):
    num_args = len(signature(fn).parameters)
    return fn() if num_args == 0 else fn(data) if num_args == 1 else fn(data, index)

def get_attr_entry(sel: SelectionContext, arg, attr, index: int):
    if callable(attr):
        return attr(call_element_fn(arg, sel.data[index], index)) if callable(arg) else attr(arg)
    else:
        return attr

def create_parent_attr(sel: SelectionContext, arg, attr):
    if callable(attr) and sel.data is None:
        return lambda d: {sel.name: {k: attr(d) for k in sel.ids}}
    else:
        return {sel.name: {k: get_attr_entry(sel, arg, attr, i) for i, k in enumerate(sel.ids)}}

def get_full_attributes(sel: SelectionContext, arg, attr):
    if sel.parent is None:
        return get_attr_entry(sel, arg, attr, 0)
    else:
        return get_full_attributes(sel.parent, arg, create_parent_attr(sel, arg, attr))


def attr_event(sel: SelectionContext, arg, attr) -> Dict:
    full_attr = get_full_attributes(sel, arg, attr)

    return {
        'type': DispatchEventType.Highlight if sel.highlight else DispatchEventType.Update,
        'queue': sel.queue,
        'data': {'attributes': full_attr, 'animation': sel.animation}
    }

def queue_event(sel: SelectionContext, event_type: str,
                queues: Union[None, str, int, Iterable[Union[str, int]]]) -> Dict:
    queue_list = None if queues is None else [str(q) for q in (queues if is_iterable(queues) else [queues])]
    return {
        'type': event_type,
        'queue': sel.queue,
        'data': {'queues': queue_list}
    }
