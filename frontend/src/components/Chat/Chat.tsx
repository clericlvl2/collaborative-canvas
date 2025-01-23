import Grid from '@mui/material/Grid2';

import { messageSent, selectAllMessages } from '../../store/chat/chat';
import type { IMessage } from '../../store/chat/types';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import Messages from './Messages';
import MessagesForm from './MessagesForm';

function Chat() {
    const dispatch = useAppDispatch();
    const messages = useAppSelector(selectAllMessages);

    const onSubmitMessage = (message: IMessage) => {
        dispatch(messageSent(message));
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
            <Messages messages={messages} />
            <MessagesForm onSubmit={onSubmitMessage} />
        </Grid>
    );
}

export default Chat;
