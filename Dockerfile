# === build js ===
FROM node:10 as build-js
WORKDIR /app

COPY ./js/src ./src
COPY ./js/tsconfig.json .
COPY ./js/webpack.config.js .
COPY ./js/package*.json ./

RUN npm ci
RUN npm run build

# === setup python ===
FROM python:3.7.0 as setup
WORKDIR /app

COPY ./requirements ./requirements/
COPY ./algorithmx ./algorithmx/
COPY ./setup.py .
COPY ./setupbase.py .
COPY ./README.md .
COPY ./LICENSE.txt .
COPY ./MANIFEST.in .

# install python dependencies
RUN python -m pip install --upgrade pip \
&& python -m pip install -r /app/requirements/common.txt -r /app/requirements/dev.txt

# copy built js
COPY --from=build-js /app/dist/nbextension ./algorithmx/nbextension/static
COPY --from=build-js /app/dist/labextension ./algorithmx/labextension


# === http server ===
FROM setup as http-server

# install optional dependencies and the module itself
RUN python -m pip install -r /app/requirements/optional.txt \
&& python -m pip install --no-deps .

EXPOSE 5050
EXPOSE 5051


# === docs ===
FROM setup as setup-docs
WORKDIR /app

# install dependencies and the module itself
RUN python -m pip install -r /app/requirements/docs.txt \
&& python -m pip install --no-deps .

WORKDIR /app/docs
COPY docs ./

# copy built js
COPY --from=build-js /app/dist/docs ./src/_static


# === jupyter notebook ===
FROM setup as setup-jupyter

# install and enable jupyter plugin
RUN python -m jupyter nbextension install --symlink --sys-prefix --py algorithmx \
&& python -m jupyter nbextension enable --sys-prefix --py algorithmx

EXPOSE 8888


# === install jupyter lab plugin ===
FROM setup-jupyter as install-jupyter-lab

# install nodejs
RUN apt-get update
RUN apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash
RUN apt-get install -y nodejs

# install the jupyter widget manager package
RUN conda run -n algorithmx jupyter labextension install @jupyter-widgets/jupyterlab-manager

# rebuild jupyter lab, installing the plugin from the python package
RUN conda run -n algorithmx jupyter lab build

# list installed extensions
RUN conda run -n algorithmx jupyter labextension list
