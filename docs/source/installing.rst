.. _install:

Installation
============

Python 3.6 or higher is required.

AlgorithmX can be installed using pip::

    pip install algorithmx

.. _install-jupyter:

Jupyter Widget
--------------

In classic Jupyter notebooks, the widget will typically be enabled by default. However, if you installed using pip with notebook version <5.3, you will have to manually enable it by running::

    jupyter nbextension enable --sys-prefix --py algorithmx

with the `appropriate flag`_. To enable in JupyterLab, run::

    jupyter labextension install @jupyter-widgets/jupyterlab-manager
    jupyter labextension install algorithmx-jupyter

.. links

.. _`appropriate flag`: https://jupyter-notebook.readthedocs.io/en/stable/extending/frontend_extensions.html#installing-and-enabling-extensions
