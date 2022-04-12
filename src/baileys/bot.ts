import { connect } from "./connection";
import { jsonReader } from "../api/utils/jsonFunctions"
const axios = require('axios');

export default async () => {
    global.socket = await connect();

    global.socket.ev.on("messages.upsert", async (message) => {
        const [webMessage] = message.messages;

        try {
            if (!webMessage.key?.fromMe && webMessage.message?.conversation !== undefined && webMessage.message?.conversation !== "") {
                jsonReader("./src/webhook/config.json", async (err, config) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    let payload = { 
                        remoteJid: webMessage.key.remoteJid, 
                        participant: webMessage.key.participant,
                        pushName: webMessage.pushName,
                        conversation: webMessage.message.conversation
                    };
                    let res = await axios.post(config.url, payload);
                    console.log(res.data);
                });
            }
        } catch (error) {
            console.log(error);
        }
    })
};