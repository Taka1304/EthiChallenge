# EthiChallenge

![Logo](/public/images/logo.png)

Azure OpenAI Hackathon 2023で作成したサービス


## 必要なもの

- Docker実行環境
- Docker Compose ^2.22
- `.env.local`ファイル

## 実行手順

1. Docker Desktop を起動

```
docker compose build
docker compose watch
# 終了時
Ctrl + C
docker container stop data-dreamers-group3
```

[localhost:3001](http://localhost:3001)にアクセス


ローカルのNode環境で開発する場合

```
npm install -g pnpm
pnpm i
pnpm dev
```