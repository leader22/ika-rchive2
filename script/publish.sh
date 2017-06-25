#!/bin/sh

# npm version するために掃除
git checkout HEAD .

# 先にバージョンあげてから
npm version $1
# ビルドしないとアプリ内バージョンが上がらない
npm run build

# それをpush
git add .
git commit -m 'dist'
git push origin master
