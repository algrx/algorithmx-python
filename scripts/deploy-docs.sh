# clone and merge
git clone "https://${GITHUB_TOKEN}@github.com/algrx/algrx.github.io.git" website
mkdir -p website/docs && rm -rf website/docs/python
cp -r docs/build website/docs/python
cd website

git config --local user.name "GitHub Action"
git config --local user.email "action@github.com"

# deploy
git add .
git commit -m "deploy: python docs"
git push -u origin master --force

# clean
cd ..
rm -rf website
