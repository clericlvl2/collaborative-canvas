import type { IMessage } from '@features/chat';

import { MessagesListItem } from './MessagesListItem';

interface IMessagesListProps {
    messages: IMessage[];
}

export function MessagesList({ messages }: IMessagesListProps) {
    return messages.map(m => <MessagesListItem key={m.id} message={m} />);
}
