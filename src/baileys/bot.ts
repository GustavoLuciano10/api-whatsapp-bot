import { connect } from "./connection";
import { getBotData } from "./functions";
import { jsonReader } from "../api/utils/jsonFunctions"

export default async () => {
    global.socket = await connect();
    const { ...data } = getBotData(global.socket);

    global.socket.ev.on("messages.upsert", async (message) => {
        const [webMessage] = message.messages;

        try {
            if(!webMessage.key?.fromMe){
                jsonReader("./src/webhook/config.json", (err, config) => {
                    if (err) {
                      console.log(err);
                      return;
                    }
                    console.log(config.url);
                  });
                // console.log(webMessage);
            }
        } catch (error) {
            console.log(error);
        }
    })
};