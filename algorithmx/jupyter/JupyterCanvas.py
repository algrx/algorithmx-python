from typing import List, Callable, Optional, Any
from ipywidgets import DOMWidget  # type: ignore
from IPython.display import display  # type: ignore
from traitlets import Unicode, List as SyncList, Bool as SyncBool  # type: ignore

import json

from ..api import Canvas, DispatchEvent, ElementContext
from .extension import module_name, module_version


class JupyterWidget(DOMWidget):
    _model_name = Unicode("AlgorithmXModel").tag(sync=True)
    _model_module = Unicode(module_name).tag(sync=True)
    _model_module_version = Unicode(module_version).tag(sync=True)
    _view_name = Unicode("AlgorithmXView").tag(sync=True)
    _view_module = Unicode(module_name).tag(sync=True)
    _view_module_version = Unicode(module_version).tag(sync=True)

    events: SyncList = SyncList(Unicode(), []).tag(sync=True)
    show_buttons: SyncBool = SyncBool(False).tag(sync=True)

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.str_events = []

        if "buttons" in kwargs:
            self.show_buttons = kwargs["buttons"]

    def dispatch(self, event: DispatchEvent):
        str_event = json.dumps(event)
        self.events = self.events + [str_event]


class JupyterCanvas(Canvas):
    def _ipython_display_(self):
        display(self._selection.client)


def create_jupyter_canvas(buttons: bool = False):
    widget = JupyterWidget(show_buttons=buttons)
    canvas = JupyterCanvas(ElementContext(client=widget, ids=["canvas"], data=[None]))

    def receive(widget, content, buffers):
        event = json.loads(content)
        if "type" in event and event["type"] == "algorithmx":
            receive_event = event["data"]
            canvas.receive(receive_event)

    widget.on_msg(receive)
    canvas.ondispatch(widget.dispatch)

    return canvas
