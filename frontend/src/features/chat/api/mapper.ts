import type { IMessage } from '../model/types';

interface ISocketMessage {
    sender: string;
    message: string;
}

export const socketMessageMapper = ({
    sender,
    message,
}: ISocketMessage): IMessage => ({
    id: String(Math.random()),
    user: sender,
    text: message,
    timestamp: new Date().toLocaleTimeString(),
});
