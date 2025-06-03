import Grid from '@mui/material/Grid';

import { useUser } from '@entities/user';

import { useMessagesConnect } from '../api/useMessagesConnect';

import { MessagesForm } from './MessagesForm';
import { MessagesView } from './MessagesView';

const NO_USER_PROVIDED_ERROR = 'User data is not provided!';

export function Chat() {
    const { user } = useUser();
    const { messages, sendMessage } = useMessagesConnect();

    const onSubmitMessage = (message: string) => {
        if (!user) {
            throw new Error(NO_USER_PROVIDED_ERROR);
        }

        sendMessage(user.name, message);
    };

    return (
        <Grid
            container
            sx={{
                flexDirection: 'column',
                height: '100%',
                mr: 2,
                ml: 2,
            }}
        >
            <MessagesView messages={messages} />
            <MessagesForm onSubmit={onSubmitMessage} />
        </Grid>
    );
}
