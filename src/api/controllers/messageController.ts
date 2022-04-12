import { Request, Response } from "express";
import { getBotData } from "../../baileys/functions";

class MessageController {
    public sendText(req: Request, res: Response) {
        const { ...data } = getBotData(global.socket);

        const { remoteJid, text } = req.body;
        const message = { remoteJid: remoteJid, text: text }
        try {
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
        const { ...data } = getBotData(global.socket);

        const { remoteJid, caption, base64 } = req.body;
        const buf = Buffer.from(base64, 'base64');
        const message = { remoteJid: remoteJid, pathOrBuffer: buf, caption: caption }

        try {
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
