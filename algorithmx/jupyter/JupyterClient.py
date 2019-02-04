from typing import List, Callable, Any
from ipywidgets import DOMWidget
from traitlets import Unicode, List as SyncList, Bool as SyncBool
from ._frontend import module_name, module_version
import json

from .JupyterCanvas import JupyterCanvas
from ..graphics import CanvasSelection, canvas_selection, EventHandler, DispatchEvent, ReceiveEvent

class JupyterClient(DOMWidget, EventHandler):
    _model_name = Unicode('AlgorithmxModel').tag(sync=True)
    _model_module = Unicode(module_name).tag(sync=True)
    _model_module_version = Unicode(module_version).tag(sync=True)
    _view_name = Unicode('AlgorithmxView').tag(sync=True)
    _view_module = Unicode(module_name).tag(sync=True)
    _view_module_version = Unicode(module_version).tag(sync=True)

    _subscriptions: List[Callable[[ReceiveEvent], Any]]

    events: SyncList = SyncList(Unicode, []).tag(sync=True)
    show_buttons: SyncBool = SyncBool(False).tag(sync=True)

    def __init__(self, **kwargs):
        super().__init__(**kwargs)

        self._subscriptions = []
        if 'buttons' in kwargs:
            self.show_buttons = kwargs['buttons']

        def on_msg(widget, content, buffers):
            event = json.loads(content)
            if 'source' in event and event['source'] == 'algorithmx':
                event_data = event['data']
                for listener in self._subscriptions:
                    listener(event_data)

        self.on_msg(on_msg)

    def dispatch(self, event: DispatchEvent):
        str_event = json.dumps(event)
        self.events = self.events + [str_event]

    def subscribe(self, listener: Callable[[ReceiveEvent], Any]):
        self._subscriptions.append(listener)

    def canvas(self) -> JupyterCanvas:
        return canvas_selection('_jupyter', self, JupyterCanvas)
