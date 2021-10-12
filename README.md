# 栞 〜shiori〜

栞は自分用のプライベートなブックマークを管理するために作りました。

日々、増えていく iPhone のタブを減らすため。

（Safari にタブグループが追加されて、整理できるようになったので、早々に役目を終えるかもしれません）

## ディレクトリ構成

今どきなサーバレスの構成で作りました。初期費用を抑えるために Firebase を中心に使ってます。

### backend/functions

Firebase Functions にデプロイする、バックエンドのソースコードが含まれています。

### frontend

Firebase Hosting にデプロイする、フロントエンドのソースコードが含まれています。

## 公開 URL

https://kght6123-shiori.web.app/

## 必須要件

このソースコードを利用するためには、Firebase CLI のインストール＆ログイン、Firebase プロジェクトの作成が必要です。

```sh
$ npm install -g firebase-tools
$ firebase login
$ firebase projects:list
```
