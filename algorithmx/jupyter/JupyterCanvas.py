from ..graphics import CanvasSelection, canvas_selection
from IPython.display import display

class JupyterCanvas(CanvasSelection):
    def _ipython_display_(self):
        display(self._context.client)

