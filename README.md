# AlgorithmX Python
[![travis](https://travis-ci.com/algrx/algorithmx-python.svg)](https://travis-ci.com/algrx/algorithmx-python)
[![PyPI version](https://badge.fury.io/py/algorithmx.svg)](https://pypi.org/project/algorithmx)

<img src="https://raw.githubusercontent.com/algrx/algorithmx/master/img/logo.svg?sanitize=true" align="left" hspace="10" width="80px">

**AlgorithmX Python** is a library for network visualization and algorithm simulation, built on <a href="https://github.com/algrx/algorithmx">AlgorithmX</a>. It works through either a WebSocket server, or as a widget in Jupyter Notebooks and JupyterLab.
<br><br>

<img src="https://raw.githubusercontent.com/algrx/algorithmx/master/img/example.svg?sanitize=true" align="center" width="600px">

## Resources
  - <a href="https://algrx.github.io/">Website</a>
  - <a href="https://algrx.github.io/algorithmx/docs/python/">Documentation</a>

## Installation

Python 3.6 or higher is required.

AlgorithmX can be installed using pip:

```bash
pip install algorithmx
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

server = algorithmx.http_server(port=5050)
canvas = server.canvas()

def start():
    canvas.nodes([1, 2]).add()
    canvas.edge((1, 2)).add()

canvas.listen('start', start)
server.start()
```

Be default, the output can be found at `http://localhost:5050/`.

If you are using Jupyter, add the following to a cell:

```python
import algorithmx

canvas = algorithmx.jupyter_canvas()

canvas.nodes([1, 2]).add()
canvas.edge((1, 2)).add()

display(canvas)
```

## Development

### Install

If you aren't using docker, you can install the package locally:
```
cd js
npm run build
npm run inject
cd ..

pip install --no-deps --editable .
```

### Run HTTP Server

With docker:
```
docker-compose up http-server
```

Manually:
```
python -u examples/basic_http_server.py
```

Then, in both cases, open `localhost:5050` in a browser.

### Run Notebook

With docker:
```
docker-compose up notebook
```
You will need to follow the link which appears in the output.

Manually:
```
jupyter nbextension install --symlink --sys-prefix --py algorithmx
jupyter nbextension enable --sys-prefix --py algorithmx
jupyter notebook 
```

Then, in both cases, navigate to `examples/basic.ipynb`.

### Build package
```
rm -rf build dist
```

With docker:

```
docker-compose up --build build
```

Manually:
```
python setup.py build sdist bdist_wheel
```

In both cases, the bundle can be found in `dist/`.
