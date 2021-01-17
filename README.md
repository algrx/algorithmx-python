# AlgorithmX Python

![build](https://github.com/algrx/algorithmx-python/workflows/build/badge.svg)
[![PyPI version](https://badge.fury.io/py/algorithmx.svg)](https://pypi.org/project/algorithmx)

<img src="https://raw.githubusercontent.com/algrx/algorithmx/master/img/logo.svg?sanitize=true" align="left" hspace="10" width="80px">

**AlgorithmX Python** is a library for network visualization and algorithm simulation, built on <a
href="https://github.com/algrx/algorithmx">AlgorithmX</a>. It can be used through a HTTP/WebSocket
server, or as a widget in Jupyter Notebooks and JupyterLab.
<br><br>

<img src="https://raw.githubusercontent.com/algrx/algorithmx/master/img/example.svg?sanitize=true" align="center" width="600px">

## Resources

- <a href="https://algrx.github.io/">Website</a>
- <a href="https://algrx.github.io/docs/python/">Documentation</a>

## Installation

Python 3.7.0 or higher is required. Using pip:

```
python -m pip install algorithmx
```

### Jupyter Widget

In classic Jupyter notebooks, the widget will typically be enabled by default. To enable it
manually, run

```
jupyter nbextension enable --sys-prefix --py algorithmx
```

with the <a href="https://jupyter-notebook.readthedocs.io/en/stable/extending/frontend_extensions.html#installing-and-enabling-extensions">appropriate flag</a>. To enable in JupyterLab, run

```
python -m jupyter labextension install @jupyter-widgets/jupyterlab-manager --no-build
python -m jupyter lab build
```

## Example Usage

If you wish to use the library through a HTTP/WebSocket server, follow the template below:

```python
import algorithmx

server = algorithmx.http_server(port=5050)
canvas = server.canvas()

def start():
    canvas.nodes([1, 2]).add()
    canvas.edge((1, 2)).add()

canvas.onmessage('start', start)
server.start()
```

The graphics can be found at `http://localhost:5050/`.

If you are using Jupyter, try adding the following code to a cell:

```python
from algorithmx import jupyter_canvas

canvas = jupyter_canvas()

canvas.nodes([1, 2]).add()
canvas.edge((1, 2)).add()

canvas
```

## Development

### Manual install

Make sure you have Python 3.7 of higher, then run

```
# build js
cd js
npm run build
cd ..

# install dependencies
python -m pip install -r dev-requirements.txt
python -m pip install --no-deps --editable ".[jupyter,networkx]"
```

### HTTP Server

Docker: `Docker-compose up http-server`
Manually: `python examples/basic_http_server.py`

Then open `localhost:5050` in a browser.

### Jupyter notebook

Docker: `docker-compose up notebook`
Manually:
```
python -m jupyter nbextenion list
python -m jupyter notebook
```

Then try opening `examples/basic_notebook.ipynb`.

### Jupyter lab

Docker: `docker-compose up jupyter-lab`
Manually:
```
python -m jupyter labextension install @jupyter-widgets/jupyterlab-manager --no-build
python -m jupyter lab build
python -m jupyter labextension list
python -m jupyter lab
```

Then try opening `examples/basic_notebook.ipynb`.

### Build and test package

Clean any previous builds with `rm -rf build dist`.

Docker: `docker-compose up --build build`
Manually:
```
python -m mypy .
python -m pytest tests -vv
python setup.py build sdist bdist_wheel
```

The bundle can be found in `dist/`.

### Distribute

- Set up pre-commit hooks: `pre-commit install`
- Publish to PyPI: `./scripts/deploy.sh`
