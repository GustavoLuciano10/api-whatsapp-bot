import { Request, Response } from "express";
import { jsonReader } from "../utils/jsonFunctions";
const fs = require("fs");

class WebHookController {
    public setWebHook(req: Request, res: Response) {
        try {
            const { url } = req.body;

            jsonReader("./src/webhook/config.json", (err, config) => {
                if (err) {
                  console.log("Error reading file:", err);
                  return;
                }

                config.url = url;
                fs.writeFile("./src/webhook/config.json", JSON.stringify(config), err => {
                  if (err) console.log("Error writing file:", err);
                });
              });

            return res.json({
                response: "Webhook atualizado com sucesso",
            });
        } catch (error) {
            return res.json({
                response: "Ocorreu um erro ao atualizado o Webhook",
            });
        }
    }
}

export const webHookController = new WebHookController();