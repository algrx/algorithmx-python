rm -rf public && mkdir public

# config
git config --global user.email "travis@travis-ci.com"
git config --global user.name "Travis CI"

# git
cd public
git init
git remote add origin "https://${GITHUB_TOKEN}@github.com/algrx/algorithmx.git"
git pull origin gh-pages

# copy
rm -rf docs/python && mkdir docs/python
cp -rf ../docs/build/. docs/python

# create a file at the root to prevent default jekyll behaviour (e.g. ignoring _static)
touch .nojekyll

# deploy
git add .
git commit -m "docs: deploy python docs"
git push -u origin master:gh-pages --force
