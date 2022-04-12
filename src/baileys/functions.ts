import {
    proto,
  } from "@adiwajshing/baileys";
  import fs from "fs";
  import { general } from "./configurations/general";
  import { IAntiLink } from "./interfaces/IAntiLink";
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
      // if (isReply) {
      //   options = {
      //     quoted: webMessage,
      //   };
      // }
  
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
  
      // if (isReply) {
      //   options = {
      //     quoted: webMessage,
      //   };
      // }
  
      const sticker =
      message.pathOrBuffer instanceof Buffer
          ? message.pathOrBuffer
          : fs.readFileSync(message.pathOrBuffer);
  
      return await socket.sendMessage(message.remoteJid, { sticker }, message.options);
    };
  
    const sendAudio = async (message: IMessage) => {
      let ptt = message.ptt;
  
      // if (isReply) {
      //   options = {
      //     quoted: webMessage,
      //   };
      // }
  
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
  
    // const reply = async (message: IMessage) => {
    //   return socket.sendMessage(
    //     message.remoteJid,
    //     { text: `${general.prefixEmoji} ${message.text}` },
    //     { quoted: message }
    //   );
    // };
  
    // const {
    //   messageText,
    //   isImage,
    //   isVideo,
    //   isSticker,
    //   isAudio,
    //   isDocument,
    //   userJid,
    //   replyJid,
    // } = extractDataFromWebMessage(webMessage);
  
    // const { command, args } = extractCommandAndArgs(messageText);
  
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
  
  // export const extractDataFromWebMessage = (message: IMessage) => {
  //   let remoteJid: string;
  //   let messageText: string | null | undefined;
  
  //   let isReply = false;
  
  //   let replyJid: string | null = null;
  //   let replyText: string | null = null;
  
  //   const {
  //     remoteJid: jid, participant: tempUserJid
  //   } = message;
  
  //   if (jid) {
  //     remoteJid = jid;
  //   }

  //   replyText = message.replyText;

  //   replyText = message.replyJid;

  //   messageText = message.text;
  
  //   const userJid = tempUserJid?.replace(/:[0-9][0-9]|:[0-9]/g, "");
  
  //   const isImage = message?.type === "image";
  
  //   const isVideo = message?.type === "video";
  
  //   const isAudio = message?.type === "audio";;
  
  //   const isSticker = message?.type === "stiker";;
  
  //   const isDocument = message?.type === "document";;
  
  //   let mentionedJid = message.mentionedJid;
  
  //   return {
  //     userJid,
  //     remoteJid,
  //     messageText,
  //     isReply,
  //     replyJid,
  //     replyText,
  //     isAudio,
  //     isImage,
  //     isSticker,
  //     isVideo,
  //     isDocument,
  //     mentionedJid,
  //     message,
  //   };
  // };
  
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
  
//   export async function getBuffer(url: string) {
//     const res = await fetch(url, {
//       headers: { "User-Agent": "okhttp/4.5.0" },
//       method: "GET",
//     });
  
//     const buff = await res.buffer();
  
//     if (buff) return { type: res.headers.get("content-type"), result: buff };
  
//     return { type: res.headers.get("content-type"), result: "Error" };
//   }