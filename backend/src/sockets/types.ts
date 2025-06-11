import { Socket, DefaultEventsMap, ExtendedError} from 'socket.io';
import { Types } from 'mongoose';

export interface SocketData {
    userId: Types.ObjectId | null;
    username: string | null;
}

export type TSocket = Socket<
    DefaultEventsMap,
    DefaultEventsMap,
    DefaultEventsMap,
    SocketData
>

export type TNextCallback = (err?: ExtendedError) => void;