.. _install:

Installation
============

Python 3.7.0 or higher is required. Using pip::

    python -m pip install algorithmx

.. _install-jupyter:

Jupyter Widget
--------------

In classic Jupyter notebooks, the widget will typically be enabled by default. To enable it
manually, run::

    python -m jupyter nbextension enable --sys-prefix --py algorithmx

with the `appropriate flag`_. To enable in JupyterLab, run::

    python -m jupyter labextension install @jupyter-widgets/jupyterlab-manager --no-build
    python -m jupyter lab build

.. links

.. _`appropriate flag`: https://jupyter-notebook.readthedocs.io/en/stable/extending/frontend_extensions.html#installing-and-enabling-extensions
