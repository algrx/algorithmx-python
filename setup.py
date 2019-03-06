from glob import glob
from os.path import join as pjoin, exists as pexists

from setupbase import (
    create_cmdclass, install_npm, ensure_targets,
    find_packages, combine_commands, ensure_python,
    get_version, command_for_func, run, skip_npm, HERE
)
from setuptools import setup

ensure_python('>=3.6')

name = 'algorithmx'
version = get_version(pjoin(name, '_version.py'))
with open('README.md', 'r') as fh:
    long_description = fh.read()

js_path = pjoin(HERE, 'js')
nb_path = pjoin(HERE, name, 'nbextension', 'static')
lab_path = pjoin(HERE, name, 'labextension')

js_exists = True
if not pexists(js_path):
    js_exists = False

jstargets = [
    pjoin(nb_path, 'index.js'),
    pjoin(nb_path, 'extension.js')
]

package_data_spec = {
    name: [
        'nbextension/static/*.js*',
        'labextension/*.tgz',
        'server/*.html'
    ]
}

data_files_spec = [
    ('share/jupyter/nbextensions/algorithmx-jupyter', nb_path, '*.js*'),
    ('share/jupyter/lab/extensions', lab_path, '*.tgz'),
    ('etc/jupyter/nbconfig/notebook.d', HERE, 'algorithmx-jupyter -config.json')
]

cmdclass = create_cmdclass('js' if js_exists else None,
    package_data_spec=package_data_spec,
    data_files_spec=data_files_spec
)
cmdclass['js'] = combine_commands(
    install_npm(
        path=js_path,
        build_dir=nb_path,
        source_dir=js_path,
        build_cmd='build'
    ),
    ensure_targets(jstargets)
)

setup_args = dict(
    name = name,
    description = 'A library for network visualization and algorithm simulation.',
    version = version,
    scripts = glob(pjoin('scripts', '*')),
    cmdclass = cmdclass,
    packages = find_packages(),
    author = 'Alex Socha',
    author_email = 'algorithmx.lib@gmail.com',
    long_description = long_description,
    long_description_content_type = 'text/markdown',
    url = 'https://github.com/algrx/algorithmx-python',
    license = 'MIT',
    platforms = ['Linux', 'MacOS', 'Windows'],
    keywords = ['Jupyter', 'Widgets', 'IPython'],
    classifiers = [
        'Intended Audience :: Developers',
        'Intended Audience :: Science/Research',
        'License :: OSI Approved :: MIT License',
        'Programming Language :: Python',
        'Programming Language :: Python :: 3',
        'Programming Language :: Python :: 3.6',
        'Programming Language :: Python :: 3.7',
        'Framework :: Jupyter'
    ],
    include_package_data = True,
    install_requires = [
        'ipywidgets>=7.0.0'
    ],
    extras_require = {
        'networkx': ['networkx'],
        'test': [
            'pytest>=3.3.0',
            'pytest-cov<2.6.0',
        ],
        'docs': [
            'sphinx>=1.5',
            'recommonmark',
            'sphinx_rtd_theme',
            'nbsphinx>=0.2.13',
            'jupyter_sphinx',
            'pytest_check_links',
            'attrs>=17.4.0',
            'networkx',
        ]
    },
    entry_points = {}
)

if __name__ == '__main__':
    setup(**setup_args)
