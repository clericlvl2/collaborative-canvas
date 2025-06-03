import Grid from '@mui/material/Grid';
import { useCallback, useEffect } from 'react';

import {
    fetchRooms,
    selectAllRooms,
    selectRoomsError,
    selectRoomsStatus,
} from '@entities/rooms';
import { RequestStatus } from '@shared/api';
import {
    extractErrorMessage,
    useErrorNotification,
} from '@shared/lib';
import { useAppDispatch, useAppSelector } from '@shared/store';
import { ErrorFallback, LoadingIndicator } from '@shared/ui';

import { RoomCard } from '../card/RoomCard';
import { RoomCreationCard } from '../create-room/RoomCreationCard';

import { RoomsGridItem } from './RoomsGridItem';

export function RoomsGrid() {
    const dispatch = useAppDispatch();
    const rooms = useAppSelector(selectAllRooms);
    const roomsRequestStatus = useAppSelector(selectRoomsStatus);
    const error = useAppSelector(selectRoomsError);
    const showError = useErrorNotification();

    const fetchGridData = useCallback(async () => {
        try {
            await dispatch(fetchRooms()).unwrap();
        } catch (e) {
            showError(extractErrorMessage(e));
        }
    }, [dispatch, showError]);

    useEffect(() => {
        fetchGridData().catch();
    }, [fetchGridData]);

    if (roomsRequestStatus === RequestStatus.Loading) {
        return <LoadingIndicator />;
    }

    if (error) {
        return <ErrorFallback onRetry={fetchGridData} />;
    }

    return (
        <Grid
            container
            spacing={4}
            rowSpacing={2}
            sx={{
                justifyContent: rooms.length ? 'flex-start' : 'center',
            }}
        >
            <>
                {rooms.map(room => (
                    <RoomsGridItem key={room.id}>
                        <RoomCard id={room.id} title={room.name} />
                    </RoomsGridItem>
                ))}
                <RoomsGridItem>
                    <RoomCreationCard />
                </RoomsGridItem>
            </>
        </Grid>
    );
}
