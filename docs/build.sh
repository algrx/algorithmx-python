#!/bin/bash

docs_dir=$(dirname $0)
cd $docs_dir

mkdir -p cache

python -m sphinx -b html src build
python -m pytest \
    --check-links --check-links-cache \
    --check-links-cache-name cache/check-links \
    --rootdir=. -o testpaths=build
