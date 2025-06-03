import { useCallback, useEffect } from 'react';
import { useParams } from 'react-router';

import { SocketEvent, useSocketClient } from '@shared/api';
import { extractErrorMessage, useErrorNotification } from '@shared/lib';
import { useAppDispatch, useAppSelector } from '@shared/store';

import { socketMessageMapper } from '../api/mapper';
import { IChatMessageEventPayload } from '../api/types';
import { messageSent, messagesRemoved, messageStatusChanged, selectAllMessages } from '../model/store';
import { IMessage, MessageStatus } from '../model/types';

export const useMessagesConnect = () => {
    const dispatch = useAppDispatch();
    const messages = useAppSelector(selectAllMessages);
    const socketClient = useSocketClient();
    const { boardId } = useParams();
    const showError = useErrorNotification();

    const onMessageReceived = useCallback(
        (payload: IChatMessageEventPayload) => {
            const newMessage: IMessage = socketMessageMapper(payload);

            dispatch(messageSent(newMessage));
        },
        [dispatch]
    );

    const sendMessage = useCallback(
        async (sender: string, message: string) => {
            const messageItem = {
                ...socketMessageMapper({ sender, message }),
                status: MessageStatus.Pending,
            };
            const messageId = messageItem.id;

            dispatch(messageSent(messageItem));

            try {
                await socketClient?.emitWithAck(SocketEvent.ChatMessage, {
                    roomId: boardId,
                    message: message,
                });

                dispatch(messageStatusChanged({
                    id: messageId,
                    status: MessageStatus.Sent,
                }));
            } catch (e) {
                dispatch(messageStatusChanged({
                    id: messageId,
                    status: MessageStatus.Error,
                }));

                showError(extractErrorMessage(e));
            }
        },
        [dispatch, socketClient, boardId, showError]
    );

    useEffect(
        () => {
            return () => {
                dispatch(messagesRemoved());
            };
        },
        [dispatch]
    );

    useEffect(
        () => {
            socketClient?.on(SocketEvent.ChatMessage, onMessageReceived);
            return () => {
                socketClient?.off(SocketEvent.ChatMessage, onMessageReceived);
            };
        },
        [socketClient, onMessageReceived]
    );

    return { messages, sendMessage, onMessageReceived };
};
