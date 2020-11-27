from glob import glob
from os.path import join as pjoin, abspath, dirname
from setuptools import setup, find_packages  # type: ignore
from jupyter_packaging import (  # type: ignore
    create_cmdclass,
    install_npm,
    ensure_targets,
    combine_commands,
    ensure_python,
    get_version,
)

ensure_python(">=3.7")
HERE = abspath(dirname(__file__))

name = "algorithmx"
version = get_version(pjoin(name, "_version.py"))

package_data_spec = {
    name: [
        "nbextension/*",
        "labextension/*",
        "server/*.html",
        "server/dist/*",
    ]
}

data_files_spec = [
    (
        "share/jupyter/nbextensions/algorithmx-jupyter",
        pjoin(HERE, name, "nbextension"),
        "*.js*",
    ),
    ("share/jupyter/lab/extensions", pjoin(HERE, name, "labextension"), "*.tgz"),
    ("etc/jupyter/nbconfig/notebook.d", HERE, "algorithmx-jupyter.json"),
]

cmdclass = create_cmdclass(
    None, package_data_spec=package_data_spec, data_files_spec=data_files_spec
)

cmdclass["jsdeps"] = combine_commands(
    install_npm(HERE, build_cmd="build", npm=["jlpm"]),
    ensure_targets(pjoin(HERE, name, "nbextension", "index.js")),
)

with open(pjoin(HERE, "README.md"), "r") as f:
    long_description = f.read()

setup_args = dict(
    name=name,
    description="A library for network visualization and algorithm simulation.",
    version=version,
    cmdclass=cmdclass,
    packages=find_packages(),
    author="Alex Socha",
    author_email="algorithmx.lib@gmail.com",
    long_description=long_description,
    long_description_content_type="text/markdown",
    url="https://github.com/algrx/algorithmx-python",
    license="MIT",
    platforms=["Linux", "MacOS", "Windows"],
    keywords=["Jupyter", "JupyterLab", "IPython"],
    classifiers=[
        "Intended Audience :: Developers",
        "Intended Audience :: Science/Research",
        "License :: OSI Approved :: MIT License",
        "Programming Language :: Python",
        "Programming Language :: Python :: 3",
        "Programming Language :: Python :: 3.7",
        "Framework :: Jupyter",
    ],
    include_package_data=True,
    install_requires=[],
    extras_require={
        "jupyter": [
            "ipywidgets>=7.0.0",
            "jupyterlab>=2.0.0",
        ],
        "networkx": ["networkx>=2.5"],
    },
    entry_points={},
)

if __name__ == "__main__":
    setup(**setup_args)
