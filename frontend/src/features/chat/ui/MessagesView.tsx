import type { IMessage } from '../model/types';

import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import { MessagesList } from './MessagesList';

const EMPTY_CHAT_PLACEHOLDER = 'No messages yet...';

interface IMessagesProps {
    messages: IMessage[];
}

export function MessagesView({ messages }: IMessagesProps) {
    const hasMessages = messages.length > 0;

    return (
        <Paper
            variant="outlined"
            style={{ flexGrow: 1, overflowY: 'auto', padding: '10px' }}
        >
            {
                hasMessages
                    ? <MessagesList messages={messages} />
                    : <Typography variant="body1">{EMPTY_CHAT_PLACEHOLDER}</Typography>
            }
        </Paper>
    );
}
