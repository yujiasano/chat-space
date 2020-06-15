# chat-space
　チャットアプリケーションです。

 
# DEMO
![](https://github.com/yujiasano/chat-space/blob/master/d16a8fcf1f29a8341a9c8455a97c47c5.gif)

# App URL
http://18.181.127.208/

# Features
- ユーザー新規登録、ログイン機能
- 1対１のチャット機能
- 複数人によるグループチャット機能
- チャットメンバーの検索機能(インクリメンタルサーチ)
- 画像送信機能
- チャットの自動更新機能

## usersテーブル

|Column|Type|Options|
|------|----|-------|
|nickname|string|null: false|
|email|string|null: false|
|password|string|null: false|
### Association
- has_many :messages
- has_many :groups, through: :groups_users
- has_many :groups_users

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
### Association
- has_many :groups_users
- has_many :messages
- has_many :users, through: :groups_users

## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foregin_key: true|
|group_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :group
- belongs_to :user

## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|body|text||
|image|text||
|user_id|integer|null: false, foregin_key: true|
|group_id|integer|null: false, foreign_key; true|
### Association
- belongs_to :group
- belongs_to :user
