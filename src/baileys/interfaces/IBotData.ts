import { proto } from "@adiwajshing/baileys";
import { IMessage } from "../../api/models/IMessage";

export interface IBotData {
  sendText: (message: IMessage) => Promise<proto.WebMessageInfo>;
  sendButtons: (message: IMessage) => Promise<proto.WebMessageInfo>;
  sendImage: (message: IMessage) => Promise<proto.WebMessageInfo>;
  sendSticker: (message: IMessage) => Promise<proto.WebMessageInfo>;
  sendAudio: (message: IMessage) => Promise<proto.WebMessageInfo>;
  socket: any;
}