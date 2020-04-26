# config (this used to work on Travis CI)
#git config --global user.email "alex@alexsocha.com"
#git config --global user.name "alexsocha"

# git
rm -rf public && mkdir public
cd public
git init
#git remote add origin "https://${GH_DEPLOY_TOKEN}@github.com/algrx/algorithmx.git"
git remote add origin "https://github.com/algrx/algorithmx.git"
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
