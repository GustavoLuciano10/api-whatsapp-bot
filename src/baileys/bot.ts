import { connect } from "./connection";
import { jsonReader } from "../api/utils/jsonFunctions"
import axios from 'axios';
import https from 'https'

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
                        participant: webMessage.key.participant || "",
                        pushName: webMessage.pushName,
                        conversation: webMessage.message.conversation
                    };
                    console.log('Try to send payload', config.url, payload)
                    const agent = new https.Agent({
                        rejectUnauthorized: false
                    })
                    axios.post(config.url, payload, {
                        httpsAgent: agent
                    })
                });
            }
        } catch (error) {
            console.error('Error while trying to send request', error);
        }
    })
};