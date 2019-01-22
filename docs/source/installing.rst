.. _install:

Installation
============

Python 3.6 or higher is required.

AlgorithmX can be installed using pip::

    pip install algorithmx

or using conda::

    conda install algorithmx


The Jupyter widget will typically be enabled by default. However, if you installed using pip with notebook version <5.3,
you will have to manually enable it using::

    jupyter nbextension enable --sys-prefix --py algorithmx

with the `appropriate flag`_.

.. links

.. _`appropriate flag`: https://jupyter-notebook.readthedocs.io/en/stable/extending/frontend_extensions.html#installing-and-enabling-extensions
