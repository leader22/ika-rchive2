# ウデマエアーカイブ2

## v0.x TODO

> 2が発売されるまで

- ブキのトウケイ
  - ブキ別の使用割合
- なにか要望あればそれ

## 時間あればTODO
- 入力フォーム洗練
  - なんかどうにかできるはず
- ストレージをAsyncI/Oにする？
  - ↑の検証で重いと思ったら
  - 現状だと10000件くらいなら、なんとか見れる（今の時点では
  - 処理中..みたいなUIだせばまあ許容できる
- UI調整？
  - 768pxまではモバイルとして
  - それ以降をPCとしてもーちょい見やすく

## v1.x TODO

> 2が発売されてから

- キル・デス or 総キル・スペシャル発動数どうするか
  - どういう画面で見れるかわからんので

## メモ
- 何件まで登録できるようにするか
  - メインターゲットであるSafariのLocalStorageが5MB
  - 俺の総プレイ時間が1500時間
  - ガチマッチは1試合5分+入れ替え1分として6分だと、15000試合できる
  - いまのデータ（100b/件）だと、50000試合までいける
  - プレイ時間が5000時間越え + 全ての時間をガチマに捧げるやつがいたら溢れる
  - そこまでヘビーに使うやつはいないと思うので、上限は設けない
