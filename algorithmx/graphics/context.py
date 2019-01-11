from typing import List, Dict, Optional, Callable, Union, Any
from .EventHandler import EventHandler

SelectionListeners = Dict[str, Callable]

class SelectionContext:
    client: EventHandler
    parent: Optional['SelectionContext']
    name: str
    ids: List[str]
    data: Optional[List]
    listeners: SelectionListeners
    initattr: Optional[List[Dict]]
    queue: Union[str, None]
    animation: Dict
    highlight: bool

    def __init__(self, client: EventHandler):
        self.client = client
        self.parent = None
        self.name = 'base'
        self.ids = []
        self.data = None
        self.listeners = {}
        self.initattr = None
        self.queue = 'default'
        self.animation = {}
        self.highlight = False

    def copy(self) -> 'SelectionContext':
        context = SelectionContext(self.client)
        context.parent = self.parent
        context.name = self.name
        context.ids = self.ids
        context.data = self.data
        context.listeners = self.listeners
        context.initattr = self.initattr
        context.queue = self.queue
        context.animation = {**self.animation}
        context.highlight = self.highlight
        return context

def create_child_context(parent: SelectionContext, name: str, ids: List[str],
                         data: Union[List, None], initattr: Optional[List[Dict]] = None) -> SelectionContext:
    child = parent.copy()
    child.parent = parent
    child.name = name
    child.ids = ids
    child.data = data
    child.init_attr = initattr
    return child
