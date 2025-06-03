import type { IMessage } from '@features/chat';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface IMessageProps {
    message: IMessage;
}

export function MessagesListItem({ message }: IMessageProps) {
    return (
        <Box
            mb={2}
            sx={{ width: '100%' }}
        >
            <Typography variant="subtitle2" sx={{ pr: 1 }}>
                <strong
                    style={{
                        display: 'inline-block',
                        maxWidth: '60%',
                        overflow: 'hidden',
                        verticalAlign: 'bottom',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                    }}
                >
                    {message.user}
                </strong>
                &nbsp;
                <em style={{ float: 'right' }}>
                    {message.timestamp}
                </em>
            </Typography>
            <Typography variant="body1">{message.text}</Typography>
        </Box>
    );
}
