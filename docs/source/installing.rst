.. _install:

Installation
============

Python 3.6 or higher is required.

The simplest way to install algorithmx is via pip::

    pip install algorithmx

or via conda::

    conda install algorithmx


.. _install-jupyter:

Jupyter Widget
--------------

If you installed via pip, and notebook version < 5.3, you will also have to
enable the Jupyter widget. If you are using classic notebooks, run::

    jupyter nbextension enable --sys-prefix --py algorithmx

with the `appropriate flag`_. If you are using JupyterLab, run::

    jupyter labextension install algorithmx-jupyter

If you installed using conda, these commands should be unnecessary.


.. links

.. _`appropriate flag`: https://jupyter-notebook.readthedocs.io/en/stable/extending/frontend_extensions.html#installing-and-enabling-extensions
