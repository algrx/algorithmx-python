from typing import List, Mapping, Dict, Union, Iterable, Callable, Optional, Any
from dataclasses import dataclass, replace, field
from inspect import signature

from .types import ElementArg, ElementFn, DispatchEvent, ReceiveEvent


@dataclass
class ElementCallbacks:
    click: Optional[Callable] = None
    hoverin: Optional[Callable] = None
    hoverout: Optional[Callable] = None


@dataclass
class EventCallbacks:
    dispatch: Optional[Callable[[DispatchEvent], Any]] = None
    receive: Optional[Callable[[ReceiveEvent], Any]] = None
    messages: Optional[Dict[str, Union[Callable[[], Any], Callable[[str], Any]]]] = None
    nodes: Optional[Dict[str, ElementCallbacks]] = None


@dataclass
class ElementContext:
    ids: List[str]
    data: Union[List[Any], None] = None
    withQ: Optional[str] = None
    animation: Optional[Mapping] = None

    parentkey: str = ""
    parent: Optional["ElementContext"] = None
    callbacks: EventCallbacks = field(default_factory=EventCallbacks)
    client: Any = None  # used to maintain a reference to a custom client object


def eval_element_value(value: ElementArg[Any], data: Any, index: int) -> Any:
    if callable(value):
        num_args = len(signature(value).parameters)
        return (
            value()  # type: ignore
            if num_args == 0
            else value(data)  # type: ignore
            if num_args == 1
            else value(data, index)  # type: ignore
        )
    else:
        return value


def eval_element_dict(raw_dict: ElementArg[Mapping], data: Any, index: int) -> Mapping:
    # evaluate the entire dict as a function
    if callable(raw_dict):
        return eval_element_value(raw_dict, data, index)
    else:
        if all([not callable(raw_dict[k]) for k in raw_dict]):
            # simply return the dict if it has no function keys
            return raw_dict

        # evaluate each key which has a function
        new_dict = {}
        for k in raw_dict:
            new_dict[k] = eval_element_value(raw_dict[k], data, index)

        return new_dict


def apply_attrs(
    context: ElementContext,
    attr_fn: Callable[[Any, int, int], Mapping],  # (data, data_index, element_index)
):
    if context.parent is None:
        if context.data is None or context.callbacks.dispatch is None:
            return

        attrs = attr_fn(context.data[0], 0, 0)
        return context.callbacks.dispatch(
            {
                "attrs": attrs,
                **(
                    {"animation": context.animation}
                    if context.animation is not None
                    else {}
                ),
                **(
                    {"withQ": None if context.withQ == "null" else context.withQ}
                    if context.withQ is not None
                    else {}
                ),
            }
        )

    def parent_attr_fn(data, data_index: int, _):
        attr_dict = {}
        for (i, k) in enumerate(context.ids):
            attr_dict[k] = (
                attr_fn(context.data[i], i, i)  # use current data
                if context.data is not None
                else attr_fn(data, data_index, i)  # use parent data
            )

        return {context.parentkey: attr_dict}

    # apply attributes on the parent
    apply_attrs(
        replace(context.parent, withQ=context.withQ, animation=context.animation),
        parent_attr_fn,
    )


def add_element_callback(
    context: ElementContext,  # with the canvas as its parent
    event_type: str,  # key of ElementCallbacks
    fn: ElementFn,
):
    if context.parent is None or context.data is None:
        return

    cbs = context.callbacks
    elementkey = context.parentkey
    element_cbs_dict: Dict[str, ElementCallbacks] = {**(getattr(cbs, elementkey) or {})}

    for (i, k) in enumerate(context.ids):
        if k not in element_cbs_dict:
            element_cbs_dict[k] = ElementCallbacks()

        # callback closure
        def callback(i=i):
            eval_element_value(fn, context.data[i], i)

        element_cbs_dict[k] = replace(element_cbs_dict[k], **{event_type: callback})

    setattr(context.callbacks, elementkey, element_cbs_dict)
