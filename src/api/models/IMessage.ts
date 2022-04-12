export interface IMessage {
    remoteJid?: string,
    participant?: string,
    mentionedJid?: string,
    replyText?: string,
    replyJid?: string,
    text?: string,
    buttonMessage?: {},
    pathOrBuffer?: string | Buffer,
    caption?: string,
    isReply?: boolean,
    options?: {},
    ptt?: boolean,
    type?: string
}