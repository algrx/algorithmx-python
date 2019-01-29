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

def create_full_attr(sel: SelectionContext, arg, attr):
    if sel.parent is None:
        return get_attr_entry(sel, arg, attr, 0)
    else:
        return create_full_attr(sel.parent, arg, create_parent_attr(sel, arg, attr))


def attr_event(sel: SelectionContext, arg, attr) -> Dict:
    full_attr = create_full_attr(sel, arg, attr)

    return {
        'type': DispatchEventType.Highlight if sel.highlight else DispatchEventType.Update,
        'queue': sel.queue,
        'data': {'attributes': full_attr, 'animation': sel.animation}
    }

def queue_event(sel: SelectionContext, event_type: str,
                queue: Union[Any, None]) -> Dict:
    queues = None if queue is None else [str(queue)]
    return {
        'type': event_type,
        'queue': sel.queue,
        'data': {'queues': queues}
    }

def merge_dict_rec(a: Dict, b: Dict) -> Dict:
    new_dict = {}
    for k in a:
        if not k in b:
            new_dict[k] = a[k]
        elif type(a[k]) is dict and type(b[k]) is dict:
            new_dict[k] = merge_dict_rec(a[k], b[k])
        else:
            new_dict[k] = b[k]
    return {**b, **new_dict}

def update_animation(sel: SelectionContext, arg, attr) -> Dict:
    if (len(sel.animation) == 0 or (len(sel.animation) == 1 and '**' in sel.animation)) and not callable(arg):
        # optimization to minimize the amount of transmitted data
        return merge_dict_rec(sel.animation, {'**': attr(arg)})
    else:
        anim_attr = create_full_attr(sel, arg, lambda a: {'**': attr(a)})
        return merge_dict_rec(sel.animation, anim_attr)
