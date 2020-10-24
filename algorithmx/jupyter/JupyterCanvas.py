from typing import List, Callable, Any
from ipywidgets import DOMWidget  # type: ignore
from IPython.display import display  # type: ignore
from traitlets import Unicode, List as SyncList, Bool as SyncBool  # type: ignore
import json

from ..api import Canvas, DispatchEvent
from ._frontend import module_name, module_version


class JupyterCanvas(DOMWidget, Canvas):
    _model_name = Unicode("AlgorithmxModel").tag(sync=True)
    _model_module = Unicode(module_name).tag(sync=True)
    _model_module_version = Unicode(module_version).tag(sync=True)
    _view_name = Unicode("AlgorithmxView").tag(sync=True)
    _view_module = Unicode(module_name).tag(sync=True)
    _view_module_version = Unicode(module_version).tag(sync=True)

    events: SyncList = SyncList(Unicode, []).tag(sync=True)
    show_buttons: SyncBool = SyncBool(False).tag(sync=True)

    def __init__(self, **kwargs):
        super(Canvas, self).__init__()
        super(DomWidget, self).__init__(**kwargs)

        self._subscriptions = []
        if "buttons" in kwargs:
            self.show_buttons = kwargs["buttons"]

        def receive(widget, content, buffers):
            event = json.loads(content)
            if "source" in event and event["source"] == "algorithmx":
                receive_event = event["data"]
                self.receive(receive_event)

        def dispatch(event: DispatchEvent):
            str_event = json.dumps(event)
            self.events = self.events + [str_event]

        self.on_msg(receive)
        self.ondispatch(dispatch)

    """
    def _ipython_display_(self):
    display(self._context.client)
    """
