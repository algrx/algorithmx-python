from typing import List, Callable, Any
from ipywidgets import DOMWidget
from traitlets import Unicode, List as SyncList, Bool as SyncBool
from ._frontend import module_name, module_version
import json

from ..graphics import CanvasSelection, canvas_selection, DispatchEvent, ReceiveEvent


class JupyterWidget(DOMWidget):
    _model_name = Unicode('CanvasModel').tag(sync=True)
    _model_module = Unicode(module_name).tag(sync=True)
    _model_module_version = Unicode(module_version).tag(sync=True)
    _view_name = Unicode('CanvasView').tag(sync=True)
    _view_module = Unicode(module_name).tag(sync=True)
    _view_module_version = Unicode(module_version).tag(sync=True)

    _dispatch_events: SyncList = SyncList(Unicode, []).tag(sync=True)
    _show_buttons: SyncBool = SyncBool(False).tag(sync=True)

    _subscriptions: List[Callable[[ReceiveEvent], Any]]

    def __init__(self, **kwargs):
        super().__init__(**kwargs)

        self._subscriptions = []
        if 'buttons' in kwargs:
            self._show_buttons = kwargs['buttons']

        def on_msg(widget, content, buffers):
            event = json.loads(content)
            if 'source' in event and event['source'] == 'algorithmx':
                event_data = event['data']
                for listener in self._subscriptions:
                    listener(event_data)

        self.on_msg(on_msg)

    def dispatch(self, event: DispatchEvent):
        str_event = json.dumps(event)
        self._dispatch_events = self._dispatch_events + [str_event]

    def subscribe(self, listener: Callable[[ReceiveEvent], Any]):
        self._subscriptions.append(listener)

    def canvas(self) -> CanvasSelection:
        """
        Creates a new :class:`~graphics.CanvasSelection` which will dispatch and receive events through the Jupyter
        widget.

        Note that by default, you need to hold down the ``ctrl``/``cmd`` key to zoom in on the canvas
        (see :meth:`~graphics.CanvasSelection.zoomkey`).
        """
        return canvas_selection('_jupyter', self)
