rm -r ./algorithmx/nbextension/static
rm -r ./docs/source/_static

mkdir ./algorithmx/nbextension/static
mkdir ./docs/source/_static

cp -r ./js/dist/nbextension/* ./algorithmx/nbextension/static
cp -r ./js/dist/labextension ./algorithmx
cp -r ./js/dist/docs/* ./docs/source/_static
