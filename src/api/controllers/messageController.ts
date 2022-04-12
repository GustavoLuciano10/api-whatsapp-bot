import { Request, Response } from "express";
import { getBotData } from "../../baileys/functions";
const fs = require("fs");

class MessageController {
    public sendText(req: Request, res: Response) {
        try {
            const { ...data } = getBotData(global.socket);

            const { remoteJid, text } = req.body;
            const message = { remoteJid: remoteJid, text: text }

            data.sendText(message);
            return res.json({
                response: "Mensagem enviada com sucesso",
            });
        } catch (error) {
            return res.json({
                response: "Ocorreu um erro ao enviar a mensagem",
            });
        }
    }

    public sendImage(req: Request, res: Response) {
        try {
            const { ...data } = getBotData(global.socket);

            const { remoteJid, caption, base64 } = req.body;
            const buf = Buffer.from(base64, 'base64');
            const message = { remoteJid: remoteJid, pathOrBuffer: buf, caption: caption }

            data.sendImage(message);
            return res.json({
                response: "Imagem enviada com sucesso",
            });
        } catch (error) {
            return res.json({
                response: "Ocorreu um erro ao enviar a imagem",
            });
        }
    }
}

export const messageController = new MessageController();
