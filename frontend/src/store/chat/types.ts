import { RequestStatus } from '../../common/enums';
import type { INullable } from '../../common/types';

export type TMessageId = string;

export interface IMessage {
    id: TMessageId;
    text: string;
    user: string;
    timestamp: string;
}

export interface IChatState {
    messages: IMessage[];
    map: Record<string, IMessage>;
    status: RequestStatus;
    error: INullable<string>;
}
