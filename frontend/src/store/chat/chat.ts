import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { RequestStatus } from '../../common/enums';
import { getErrorMessage } from '../../common/errors/getErrorMessage';
import { fetchMessages } from './actions';
import type { IChatState, IMessage, TMessageId } from './types';

const INITIAL_STATE: IChatState = {
    messages: [],
    map: {},
    status: RequestStatus.Idle,
    error: null,
};

export const chatSlice = createSlice({
    name: 'chat',
    initialState: INITIAL_STATE,
    reducers: {
        messageSent: (state, action: PayloadAction<IMessage>) => {
            const message = action.payload;

            state.messages.push(message);
            state.map[message.id] = message;
        },
    },
    extraReducers: builder => {
        builder
            // Fetch Messages
            .addCase(fetchMessages.fulfilled, (state, action) => {
                state.messages = action.payload;

                state.status = RequestStatus.Completed;
                state.error = null;
            })
            .addCase(fetchMessages.pending, state => {
                state.status = RequestStatus.Loading;
                state.error = null;
            })
            .addCase(fetchMessages.rejected, (state, action) => {
                state.status = RequestStatus.Failed;
                state.error = getErrorMessage(action.payload);
            });
    },
    selectors: {
        selectAllMessages: state => state.messages,
        selectMessageById: (state: IChatState, roomId: TMessageId) =>
            state.messages.find(message => message.id === roomId),
        selectChatStatus: state => state.status,
        selectChatError: state => state.error,
    },
});

export const { messageSent } = chatSlice.actions;
export const {
    selectAllMessages,
    selectMessageById,
    selectChatStatus,
    selectChatError,
} = chatSlice.selectors;

export default chatSlice.reducer;
