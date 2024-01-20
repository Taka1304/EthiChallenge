# EthiChallenge

![Logo](/public/images/logo.png)

Azure OpenAI Hackathon 2023

## Requirements
- `.env.local`
  - `AZURE_OPENAI_KEY`
  - `AZURE_OPENAI_ENDPOINT`
  - `KV_URL`
  - `KV_REST_API_URL`
  - `KV_REST_API_TOKEN`
  - `KV_REST_API_READ_ONLY_TOKEN`

## Initial Setup(Development)
Use by Docker or Node.js

### Docker
Docker Compose >= v2.22
```
docker compose build
docker compose watch

# kill command
Ctrl + C
docker container stop data-dreamers-group3
```

Access to [localhost:3001](http://localhost:3001)

### Node.js
Node.js >= v20.7
```
npm install -g pnpm
pnpm i
pnpm dev
```

Access to [localhost:3000](http://localhost:3000)
