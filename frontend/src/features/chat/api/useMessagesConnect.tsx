import { useCallback, useEffect } from 'react';

import { SocketEvent, useSocketClient } from '@shared/api';
import { usePageParams } from '@shared/config';
import { extractErrorMessage, instanceOfHttpError, useErrorNotification } from '@shared/lib';
import { useAppDispatch, useAppSelector } from '@shared/store';

import { socketMessageMapper } from '../api/mapper';
import { IChatMessageEventPayload } from '../api/types';
import { messageSent, messageStatusChanged, selectAllMessages } from '../model/store';
import { IMessage, MessageStatus } from '../model/types';

interface IUseMessagesConnectReturn {
    messages: IMessage[];
    sendMessage: (
        authorId: string,
        authorName: string,
        message: string
    ) => Promise<void>;
}

export const useMessagesConnect = (): IUseMessagesConnectReturn => {
    const dispatch = useAppDispatch();
    const messages = useAppSelector(selectAllMessages);
    const socketClient = useSocketClient();
    const { boardId } = usePageParams();
    const showError = useErrorNotification();

    const onMessageReceived = useCallback(
        (payload: IChatMessageEventPayload) => {
            const newMessage: IMessage = socketMessageMapper(payload);

            dispatch(messageSent(newMessage));
        },
        [dispatch]
    );

    const sendMessage = useCallback(
        async (authorId: string, authorName: string, message: string) => {
            const messageItem = {
                ...socketMessageMapper({
                    sender: authorId,
                    senderName: authorName,
                    message,
                }),
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

                if (instanceOfHttpError(e)) {
                    showError(extractErrorMessage(e));
                }
            }
        },
        [dispatch, socketClient, boardId, showError]
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

    return { messages, sendMessage };
};
