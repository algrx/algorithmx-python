import sys
from os.path import dirname, join as pjoin, exists as pexists
import os

# sphinx extensions
extensions = [
    "sphinx.ext.autodoc",
    "sphinx.ext.viewcode",
    "sphinx.ext.intersphinx",
    "sphinx.ext.napoleon",
    "sphinx.ext.todo",
    "jupyter_sphinx",
]

# add relevant paths
name = "algorithmx"
docs_dir = dirname(dirname(__file__))
base_dir = dirname(docs_dir)
js_dist_dir = pjoin(base_dir, "js", "dist")
module_dir = pjoin(docs_dir, "..", name)
sys.path.insert(0, base_dir)
sys.path.insert(0, pjoin(docs_dir, "sphinxext"))
sys.path.insert(0, module_dir)

# sphinx config
templates_path = ["_templates"]
source_suffix = ".rst"
master_doc = "index"
language = None
exclude_patterns = ["**.ipynb_checkpoints"]
pygments_style = "sphinx"
todo_include_todos = False
html_static_path = [pjoin(js_dist_dir)]
htmlhelp_basename = name + "doc"

# extension config
nbsphinx_allow_errors = True
autodoc_member_order = "bysource"
linkcheck_anchors = False

# project config
project = name
copyright = "2020, Alex Socha"
author = "Alex Socha"

# project version
version_ns = {}
with open(pjoin(module_dir, "_version.py")) as f:
    exec(f.read(), version_ns)

version = "%i.%i" % version_ns["version_info"][:2]
release = version_ns["__version__"]

# other output formats

latex_documents = [
    (master_doc, name + ".tex", name + " Documentation", "alexsocha", "manual"),
]

man_pages = [(master_doc, name, name + " Documentation", [author], 1)]

texinfo_documents = [
    (
        master_doc,
        name,
        name + " Documentation",
        author,
        name,
        "A Custom Jupyter Widget Library",
        "Miscellaneous",
    ),
]

intersphinx_mapping = {"https://docs.python.org/": None}

# theme
import sphinx_rtd_theme

html_theme = "sphinx_rtd_theme"
html_theme_path = [sphinx_rtd_theme.get_html_theme_path()]


def split_brackets(s):
    parts = []
    bracket_level = 0
    current = []
    for c in s + ",":
        if c == "," and bracket_level == 0:
            parts.append("".join(current))
            current = []
        else:
            if c == "[":
                bracket_level += 1
            elif c == "]":
                bracket_level -= 1
            current.append(c)
    return parts


# sphinx doesn't seem to handle custom data types well, so we remove them with a custom callback
def signature_callback(app, what, name, obj, options, signature, return_annotation):
    ignore_types_paths = ["graphics"]
    ignore_types = len([d for d in ignore_types_paths if name.startswith(d)]) > 0

    if ignore_types and signature is not None:
        split_sig = signature.split("->")

        params = split_sig[0].strip()
        returns = split_sig[1].strip() if len(split_sig) > 1 else return_annotation

        params_inner = params[1:-1]
        params_inner_split = split_brackets(params_inner)
        params_no_type = [s.split(":")[0] for s in params_inner_split]

        return (
            "(" + ", ".join(params_no_type) + ")",
            "self" if returns == "S" else returns,
        )


def setup(app):
    app.setup_extension("jupyter_sphinx")
    # app.connect("autodoc-process-signature", signature_callback)

    # add js dependencies
    def add_scripts(app):
        for fname in ["index.js"]:
            if not pexists(pjoin(js_dist_dir)):
                print(f"missing javascript file: {fname}")
            app.add_js_file(fname)

    app.connect("builder-inited", add_scripts)
