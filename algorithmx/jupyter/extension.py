"""
Information about the frontend package of the widget.
"""

module_name = "algorithmx-jupyter"
module_version = "^3.0.0"


def _jupyter_nbextension_paths():
    return [
        {
            "section": "notebook",
            "src": "nbextension",
            "dest": "algorithmx-jupyter",
            "require": "algorithmx-jupyter/extension",
        }
    ]
