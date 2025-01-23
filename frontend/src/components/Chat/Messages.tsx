import { Paper } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import type { IMessage } from '../../store/chat/types';

const EMPTY_CHAT_PLACEHOLDER = 'No messages yet...';

interface IMessageProps {
    message: IMessage;
}

function Message({ message }: IMessageProps) {
    return (
        <Box mb={2}>
            <Typography variant="subtitle2">
                <strong>{message.user}</strong> <em>{message.timestamp}</em>
            </Typography>
            <Typography variant="body1">{message.text}</Typography>
        </Box>
    );
}

interface IMessagesProps {
    messages: IMessage[];
}

function Messages({ messages }: IMessagesProps) {
    const hasMessages = messages.length > 0;

    return (
        <Paper
            variant="outlined"
            style={{ flexGrow: 1, overflowY: 'auto', padding: '10px' }}
        >
            {hasMessages ? (
                messages.map(m => <Message key={m.id} message={m} />)
            ) : (
                <Typography variant="body1">
                    {EMPTY_CHAT_PLACEHOLDER}
                </Typography>
            )}
        </Paper>
    );
}

export default Messages;
