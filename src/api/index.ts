import { App } from "./app"
import bot from "../baileys/bot";

new App().server.listen(3000);
bot();