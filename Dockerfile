# === build js ===
FROM node:10 as build-js
WORKDIR /app

COPY ./js/src ./src
COPY ./js/tsconfig.json ./js/webpack.config.js ./js/package*.json ./

RUN npm ci
RUN npm run build:js && npm run build:labextension


# === setup python ===
FROM python:3.7.0 as setup
WORKDIR /app

COPY ./algorithmx ./algorithmx
COPY ./docs ./docs
COPY ./dev-requirements.txt ./setup.py ./pyproject.toml ./algorithmx-jupyter.json \
./README.md ./LICENSE.txt ./MANIFEST.in ./

# upgrade pip
RUN python -m pip install --upgrade pip

# copy built js
COPY --from=build-js /app/dist ./algorithmx/js_dist
COPY --from=build-js /app/dist ./docs/js_dist
COPY --from=build-js /app/dist-lab ./algorithmx/labextension


# === prepare build ===
FROM setup as prepare-build

# install dev dependencies and the module itself
RUN python -m pip install -r /app/dev-requirements.txt \
&& python -m pip install -e ".[networkx]"


# === http server ===
FROM setup as http-server

# install the module itself
RUN python -m pip install --no-deps -e .

EXPOSE 5050
EXPOSE 5051


# === jupyter notebook ===
FROM setup as jupyter-notebook

# install jupyter nodebook and the module itself
RUN python -m pip install -e ".[jupyter]" \
&& python -m jupyter nbextension list

EXPOSE 8888


# === jupyter lab ===
FROM setup as jupyter-lab

# install nodejs
RUN apt-get update \
&& apt-get install -y curl \
&& curl -sL https://deb.nodesource.com/setup_12.x | bash \
&& apt-get install -y nodejs

# install jupyter lab and the module itself
RUN python -m pip install -e ".[jupyter]"

# enable the jupyter lab extension
RUN python -m jupyter labextension install @jupyter-widgets/jupyterlab-manager --no-build \
&& python -m jupyter lab build --dev-build=true --minimize=false \
&& python -m jupyter labextension list

EXPOSE 8888
