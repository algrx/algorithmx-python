# === build js ===
FROM node:10 as build-js
COPY ./js /app
WORKDIR /app
RUN npm ci
RUN npm run build


# === build ===

# conda dependencies
FROM continuumio/miniconda3 as build
COPY ./environment.yml /tmp/environment.yml
RUN conda env create --file /tmp/environment.yml --name algorithmx
RUN echo "source activate algorithmx" > ~/.bashrc
ENV PATH /opt/conda/envs/env/bin:$PATH

# copy python sources
WORKDIR /app
COPY algorithmx ./algorithmx
COPY setup.py .
COPY setupbase.py .
COPY README.md .
COPY LICENSE.txt .
COPY MANIFEST.in .

# copy built js
COPY --from=build-js /app/dist/nbextension ./algorithmx/nbextension/static
COPY --from=build-js /app/dist/labextension ./algorithmx/labextension

# install module
RUN conda run -n algorithmx pip install --no-deps --editable .


# === docs ===
FROM build as docs
COPY ./docs/environment.yml /tmp/environment.yml
RUN conda create --name docs --clone algorithmx
RUN conda env update --file /tmp/environment.yml --name docs

COPY docs /app/docs
WORKDIR /app/docs
COPY algorithmx/_version.py /app/algorithmx/_version.py
COPY --from=build-js /app/dist/docs ./source/_static


# === install jupyter ===
FROM build as install-jupyter

# install jupyter notebook plugin
EXPOSE 8888
RUN conda run -n algorithmx jupyter nbextension install --symlink --sys-prefix --py algorithmx
RUN conda run -n algorithmx jupyter nbextension enable --sys-prefix --py algorithmx

# install jupyter lab plugin
RUN apt-get update
RUN apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash
RUN apt-get install -y nodejs
RUN conda run -n algorithmx jupyter labextension install @jupyter-widgets/jupyterlab-manager
RUN conda run -n algorithmx jupyter labextension install algorithmx-jupyter
