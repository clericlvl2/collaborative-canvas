import type { IChatMessageEventPayload } from './types';
import type { IMessage } from '../model/types';

export const socketMessageMapper = ({
    sender,
    senderName,
    message,
}: IChatMessageEventPayload): IMessage => ({
    id: String(Math.random()),
    authorName: senderName,
    content: message,
    authorId: sender,
    timestamp: new Date().toLocaleTimeString(),
});
