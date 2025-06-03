export type TMessageId = string;

export enum MessageStatus {
    Pending,
    Sent,
    Error,
    Seen
}

export interface IMessage {
    id: TMessageId;
    text: string;
    user: string;
    timestamp: string;
    status?: MessageStatus;
}
