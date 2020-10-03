import sys
from os.path import dirname, join as pjoin
import os

# sphinx extensions
extensions = [
    'sphinx.ext.autodoc',
    'sphinx.ext.viewcode',
    'sphinx.ext.intersphinx',
    'sphinx.ext.napoleon',
    'sphinx.ext.todo',
    'jupyter_sphinx'
]

# add relevant paths
docs = dirname(dirname(__file__))
root = dirname(docs)
sys.path.insert(0, root)
sys.path.insert(0, pjoin(docs, 'sphinxext'))
sys.path.insert(0, pjoin(docs, '../algorithmx'))

# sphinx config
templates_path = ['_templates']
source_suffix = '.rst'
master_doc = 'index'
language = None
exclude_patterns = ['**.ipynb_checkpoints']
pygments_style = 'sphinx'
todo_include_todos = False
html_static_path = ['_static']
htmlhelp_basename = 'algorithmxdoc'

# extension config
nbsphinx_allow_errors = True
autodoc_member_order = 'bysource'
linkcheck_anchors = False

# project config
project = 'algorithmx'
copyright = '2019, Alex Socha'
author = 'Alex Socha'

# project version
here = dirname(__file__)
repo = pjoin(here, '..', '..')
_version_py = pjoin(repo, 'algorithmx', '_version.py')
version_ns = {}
with open(_version_py) as f:
    exec(f.read(), version_ns)

version = '%i.%i' % version_ns['version_info'][:2]
release = version_ns['__version__']

# other output formats

latex_documents = [
    (master_doc, 'algorithmx.tex', 'algorithmx Documentation',
     'alexsocha', 'manual'),
]

man_pages = [
    (master_doc,
    'algorithmx',
    'algorithmx Documentation',
     [author], 1)
]

texinfo_documents = [
    (master_doc,
     'algorithmx',
     'algorithmx Documentation',
     author,
     'algorithmx',
     'A Custom Jupyter Widget Library',
     'Miscellaneous'),
]

intersphinx_mapping = {'https://docs.python.org/': None}

# theme
import sphinx_rtd_theme
html_theme = 'sphinx_rtd_theme'
html_theme_path = [sphinx_rtd_theme.get_html_theme_path()]


def split_brackets(s):
    parts = []
    bracket_level = 0
    current = []
    for c in (s + ','):
        if c == ',' and bracket_level == 0:
            parts.append(''.join(current))
            current = []
        else:
            if c == '[':
                bracket_level += 1
            elif c == ']':
                bracket_level -= 1
            current.append(c)
    return parts


# sphinx doesn't seem to handle custom data types well, so we remove them with a custom callback
def signature_callback(app, what, name, obj, options, signature,
                       return_annotation):
    ignore_types_paths = ['graphics']
    ignore_types = len([d for d in ignore_types_paths if name.startswith(d)]) > 0

    if ignore_types and signature is not None:
        split_sig = signature.split('->')

        params = split_sig[0].strip()
        returns = split_sig[1].strip() if len(split_sig) > 1 else return_annotation

        params_inner = params[1:-1]
        params_inner_split = split_brackets(params_inner)
        params_no_type = [s.split(':')[0] for s in params_inner_split]

        return (
            '(' + ', '.join(params_no_type) + ')',
            'self' if returns == 'S' else returns
        )


def setup(app):
    app.setup_extension('jupyter_sphinx')
    app.connect('autodoc-process-signature', signature_callback)

    # add js dependencies
    def add_scripts(app):
        for fname in ['index.js']:
            if not os.path.exists(os.path.join(here, '_static', fname)):
                print(f'missing javascript file: {fname}')
            app.add_js_file(fname)

    app.connect('builder-inited', add_scripts)
