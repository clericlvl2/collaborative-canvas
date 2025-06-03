import type { IMessage, TMessageId } from './types';
import type { TNullable } from '@shared/lib';

import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { RequestStatus } from '@shared/api';
import { extractErrorMessage } from '@shared/lib';

import { fetchMessages } from './actions';

export interface IChatState {
    messages: IMessage[];
    map: Record<string, IMessage>;
    status: RequestStatus;
    error: TNullable<string>;
}

const INITIAL_STATE: IChatState = {
    messages: [],
    map: {},
    status: RequestStatus.Idle,
    error: null,
};

export const CHAT_SLICE_NAME = 'chat';

const chatSlice = createSlice({
    name: CHAT_SLICE_NAME,
    initialState: INITIAL_STATE,
    reducers: {
        messageSent: (state, action: PayloadAction<IMessage>) => {
            const message = action.payload;

            state.messages.push(message);
            state.map[message.id] = message;
        },
        messagesRemoved: (state) => {
            state.messages = [];
            state.map = {};
        },
        messageStatusChanged: (state, action: PayloadAction<Required<Pick<IMessage, 'id' | 'status'>>>) => {
            const { id, status } = action.payload;

            // todo change in list? may i modify only item?
            state.map[id].status = status;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch Messages
            .addCase(fetchMessages.fulfilled, (state, action) => {
                state.messages = action.payload;

                state.status = RequestStatus.Completed;
                state.error = null;
            })
            .addCase(fetchMessages.pending, (state) => {
                state.status = RequestStatus.Loading;
                state.error = null;
            })
            .addCase(fetchMessages.rejected, (state, action) => {
                state.status = RequestStatus.Failed;
                state.error = extractErrorMessage(action.payload);
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

export const chatReducer = chatSlice.reducer;
export const {
    messageSent,
    messagesRemoved,
    messageStatusChanged,
} = chatSlice.actions;
export const {
    selectAllMessages,
    selectMessageById,
    selectChatStatus,
    selectChatError,
} = chatSlice.selectors;
