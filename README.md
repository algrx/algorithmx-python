# AlgorithmX Python
[![travis](https://travis-ci.com/algrx/algorithmx-python.svg)](https://travis-ci.com/algrx/algorithmx-python)
[![PyPI version](https://badge.fury.io/py/algorithmx.svg)](https://pypi.org/project/algorithmx)
[![docs](https://readthedocs.org/projects/algorithmx-python/badge/?version=latest)](https://algorithmx-python.readthedocs.io/en/latest/?badge=latest)

**AlgorithmX Python** is a library for network visualization and algorithm simulation, based on <a href="https://github.com/algrx/algorithmx">AlgorithmX</a>. It works through either a HTTP server, or as a widget in Jupyter Notebooks and JupyterLab.

## Resources
- <a href="https://algorithmx-python.readthedocs.io">Documentation</a>

## Installation

To install the library using pip:

```bash
pip install algorithmx
```

To enable the Jupyter widget in classic notebooks:

```bash
jupyter nbextension enable --sys-prefix --py algorithmx
```

To enable in JupyterLab:

```bash
# if you haven't used widgets before
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