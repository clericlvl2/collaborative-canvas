export type TMessageId = string;

export enum MessageStatus {
    Pending,
    Sent,
    Error,
    Seen
}

export interface IMessage {
    id: TMessageId;
    content: string;
    authorId: string;
    authorName: string;
    timestamp: string;
    status?: MessageStatus;
}
