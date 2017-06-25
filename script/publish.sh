#!/bin/sh

# npm version するために掃除
gch .

# 先にバージョンあげてから
npm version $1
# ビルドしないとアプリ内バージョンが上がらない
npm run build

# それをpush
ga .
gc -m 'dist'
git push origin master
