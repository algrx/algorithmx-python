# AlgorithmX Python
[![travis](https://travis-ci.com/algrx/algorithmx-python.svg)](https://travis-ci.com/algrx/algorithmx-python)
[![PyPI version](https://badge.fury.io/py/algorithmx.svg)](https://pypi.org/project/algorithmx)
[![docs](https://readthedocs.org/projects/algorithmx-python/badge/?version=latest)](https://algorithmx-python.readthedocs.io/en/latest/?badge=latest)

**AlgorithmX Python** is a library for network visualization and algorithm simulation, based on <a href="https://github.com/algrx/algorithmx">AlgorithmX</a>. It works through either a HTTP server, or as a widget in Jupyter Notebooks and JupyterLab.

## Resources
- <a href="https://algorithmx-python.readthedocs.io">Documentation</a>

## Installation

Python 3.6 or higher is required.

AlgorithmX can be installed using pip:

```bash
pip install algorithmx
```

or using conda:

```bash
conda install algorithmx
```

### Jupyter Widget

In classic Jupyter notebooks, the widget will typically be enabled by default. However, if you installed using pip with notebook version <5.3, you will have to manually enable it by running:

```bash
jupyter nbextension enable --sys-prefix --py algorithmx
```

with the <a href="https://jupyter-notebook.readthedocs.io/en/stable/extending/frontend_extensions.html#installing-and-enabling-extensions">appropriate flag</a>. To enable in JupyterLab, run:

```bash
jupyter labextension install @jupyter-widgets/jupyterlab-manager
jupyter labextension install algorithmx-jupyter
```

## Example Usage

If you wish to use the library through a HTTP/WebSocket server, follow the template below:

```python
import algorithmx

server = algorithmx.http_server()
canvas = server.canvas()

def start():
    canvas.nodes([1, 2]).add()
    canvas.edge((1, 2)).add()

canvas.listen('start', start)
server.start()
```

If you are using Jupyter, add the following to a cell:

```python
import algorithmx

widget = algorithmx.jupyter_widget()
canvas = widget.canvas()

canvas.nodes([1, 2]).add()
canvas.edge((1, 2)).add()

display(widget)
```
