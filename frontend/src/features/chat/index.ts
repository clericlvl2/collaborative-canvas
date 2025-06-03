export { socketMessageMapper } from './api/mapper';

export {
    CHAT_SLICE_NAME,
    chatReducer,
    messageSent,
    messagesRemoved,
    selectAllMessages,
    selectChatError,
    selectChatStatus,
    selectMessageById,
} from './model/store';
export type { IMessage } from './model/types';

export { Chat } from './ui/Chat';
