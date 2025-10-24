import type { IMessage } from '@features/chat';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import styled from '@mui/system/styled';

import { useUser } from '@entities/user';

interface IMessageProps {
    message: IMessage;
}

const MessageAuthor = styled('strong')(({
    display: 'inline-block',
    maxWidth: '60%',
    overflow: 'hidden',
    verticalAlign: 'bottom',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
}));

export function MessagesListItem({ message }: IMessageProps) {
    const { user } = useUser();

    return (
        <Box
            mb={2}
            sx={{ width: '100%' }}
        >
            <Typography variant="subtitle2" sx={{ pr: 1 }}>
                <MessageAuthor
                    sx={theme => ({
                        color: message.authorId === user?.id
                            ? theme.palette.primary.main
                            : theme.palette.primary.secondary,
                    })}
                >
                    {message.authorName}
                </MessageAuthor>
                &nbsp;
                <em style={{ float: 'right' }}>
                    {message.timestamp}
                </em>
            </Typography>
            <Typography variant="body1">{message.content}</Typography>
        </Box>
    );
}
