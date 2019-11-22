project_dir=$(dirname $0)/..

python -m pip install -e $project_dir
jupyter nbextension install --py --symlink --sys-prefix algorithmx
jupyter nbextension enable --py --sys-prefix algorithmx
