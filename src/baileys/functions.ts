  import fs from "fs";
  import { general } from "./configurations/general";
  import { IBotData } from "./interfaces/IBotData";
  import { IMessage } from "../api/models/IMessage";
  
  export const getBotData = (
    socket: any,
  ): IBotData => {
  
    const sendText = async (message: IMessage) => {
      return await socket.sendMessage(message.remoteJid, {
        text: `${general.prefixEmoji} ${message.text}`,
      });
    };

    const sendButtons = async (message: IMessage) => {
        return socket.sendMessage(message.remoteJid, message.buttonMessage);
    };
  
    const sendImage = async (message: IMessage) => {
      const image =
      message.pathOrBuffer instanceof Buffer
          ? message.pathOrBuffer
          : fs.readFileSync(message.pathOrBuffer);
  
      const params = message.caption
        ? {
            image,
            caption: `${general.prefixEmoji} ${message.caption}`,
          }
        : { image };
  
      return await socket.sendMessage(message.remoteJid, params, message.options);
    };
  
    const sendSticker = async (message: IMessage) => {
      const sticker =
      message.pathOrBuffer instanceof Buffer
          ? message.pathOrBuffer
          : fs.readFileSync(message.pathOrBuffer);
  
      return await socket.sendMessage(message.remoteJid, { sticker }, message.options);
    };
  
    const sendAudio = async (message: IMessage) => {
      let ptt = message.ptt;

      const audio =
      message.pathOrBuffer instanceof Buffer
          ? message.pathOrBuffer
          : fs.readFileSync(message.pathOrBuffer);
  
      if (message.pathOrBuffer instanceof Buffer) {
        return await socket.sendMessage(
          message.remoteJid,
          {
            audio,
            ptt,
            mimetype: "audio/mpeg",
          },
          message.options
        );
      }
  
      message.options = { ...message.options, url: message.pathOrBuffer };
  
      return await socket.sendMessage(
        message.remoteJid,
        {
          audio: { url: message.pathOrBuffer },
          ptt,
          mimetype: "audio/mpeg",
        },
        message.options
      );
    };
  
    return {
      sendText,
      sendButtons,
      sendImage,
      sendSticker,
      sendAudio,
      socket
    };
  };
  
  export const readJSON = (pathFile: string) => {
    // @ts-ignore
    return JSON.parse(fs.readFileSync(pathFile));
  };
  
  export const writeJSON = (pathFile: string, data: any) => {
    fs.writeFileSync(pathFile, JSON.stringify(data));
  };
  
  export const extractCommandAndArgs = (message: string) => {
    if (!message) return { command: "", args: "" };
  
    const [command, ...tempArgs] = message.trim().split(" ");
  
    const args = tempArgs.reduce((acc, arg) => acc + " " + arg, "").trim();
  
    return { command, args };
  };
  
  export const isCommand = (message: string) =>
    message.length > 1 && message.startsWith(general.prefix);
  
  export const getRandomName = (extension?: string) => {
    const fileName = Math.floor(Math.random() * 10000);
  
    if (!extension) return fileName.toString();
  
    return `${fileName}.${extension}`;
  };
  
  export const onlyNumbers = (text: string) => {
    return text.replace(/[^0-9]/g, "");
  };