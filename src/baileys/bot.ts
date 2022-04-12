import { connect } from "./connection";
import { getBotData } from "./functions";

export default async () => {
    global.socket = await connect();
    const { ...data } = getBotData(global.socket);

    global.socket.ev.on("messages.upsert", async (message) => {
        const [webMessage] = message.messages;

        try {
            if(!webMessage.key?.fromMe){
                //Disparar WebHooks
                console.log(webMessage);
            }
        } catch (error) {
            console.log(error);
        }
    })
};