project_dir=$(dirname $0)/..

python -m twine upload $project_dir/dist/algorithmx*
