from typing import Dict, Callable, Any

ReceiveEvent = Dict
DispatchEvent = Dict

class DispatchEventType:
    Update = 'update'
    Highlight = 'highlight'
    Pause = 'pause'
    Start = 'start'
    Stop = 'stop'
    Cancel = 'cancel'
    Broadcast = 'broadcast'

class ReceiveEventType:
    Broadcast = 'broadcast'
    Error = 'error'
    Click = 'click'
    Hover = 'hover'

class EventHandler:
    def dispatch(self, event: DispatchEvent):
        pass

    def subscribe(self, listener: Callable[[ReceiveEvent], Any]):
        pass
