project_dir=$(dirname $0)/..

rm -rf $project_dir/build
rm -rf $project_dir/dist

python $project_dir/setup.py sdist bdist_wheel
