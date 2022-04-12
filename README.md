# Api WhatsApp Bot

This is a REST API for sending and receiving whatsapp messages developed using node, express and baileys with typescriptt

![alt text](https://image.ibb.co/nAd9OF/logos.png "Node Typescript")

## Requirements
- Node.js

## Technologies used:
- Typescript
- Express.js
- Baileys
- Swagger

## Setup
1. Install dependencies
```
npm install
```
2. Run project
```
npm run dev
```
3. Build project
```
npm run build
```

## REST services
The application exposes a few REST endpoints

`HTTP` `PUT` http://localhost:3000/api/setWebHook

`HTTP` `POST` http://localhost:3000/api/sendText

`HTTP` `POST` http://localhost:3000/api/sendImage


For more details on route delivery use swagger
```
http://localhost:3000/api/docs
```

## WebHook configuration
You should receive the following parameters in the body of your request
- remoteJid: string
- participant: string
- pushName: string
- conversation: string