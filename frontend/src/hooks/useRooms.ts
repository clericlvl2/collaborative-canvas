import { useCallback, useState } from 'react';

import RoomsController from '../api/RoomsController';
import type {
    ICreateRoomParams,
    IRoomResponseData,
    IRoomsResponseData,
} from '../api/shared/types';
import { ERROR_MESSAGE } from '../common/constants';
import type { IResult } from './types';
import { useErrorNotification } from './useErrorNotification';

// TODO implement deleteRoom
export const useRooms = () => {
    const { showError } = useErrorNotification();
    const [isLoading, setIsLoading] = useState(false);

    const createRoom = useCallback(
        async (
            data: ICreateRoomParams
        ): Promise<IResult<IRoomResponseData>> => {
            setIsLoading(true);
            let result: IResult<IRoomResponseData> = false;

            try {
                result = await RoomsController.createRoom(data);
            } catch (e) {
                showError(e, ERROR_MESSAGE.DEFAULT);
            }

            setIsLoading(false);

            return result;
        },
        [showError]
    );

    const getRooms = useCallback(async (): Promise<
        IResult<IRoomsResponseData>
    > => {
        setIsLoading(true);
        let result: IResult<IRoomsResponseData> = false;

        try {
            result = await RoomsController.getRooms();
        } catch (e) {
            showError(e, ERROR_MESSAGE.DEFAULT);
        }

        setIsLoading(false);

        return result;
    }, [showError]);

    return {
        getRooms,
        createRoom,
        isLoading,
    };
};
