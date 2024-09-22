import Grid2 from '@mui/material/Grid2';
import { useEffect } from 'react';

import { RequestStatus } from '../../common/enums';
import { getErrorMessage } from '../../common/errors/getErrorMessage';
import { useErrorNotification } from '../../hooks/useErrorNotification';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchRooms } from '../../store/rooms/actions';
import {
    selectAllRooms,
    selectRoomsError,
    selectRoomsStatus,
} from '../../store/rooms/rooms';
import PageLoader from '../Loader/PageLoader';
import NewRoom from '../RoomCard/NewRoom';
import Room from '../RoomCard/Room';
import ErrorFallback from './ErrorFallback';
import RoomsGridItem from './RoomsGridItem';

function RoomsGrid() {
    const dispatch = useAppDispatch();
    const rooms = useAppSelector(selectAllRooms);
    const status = useAppSelector(selectRoomsStatus);
    const error = useAppSelector(selectRoomsError);
    const showError = useErrorNotification();

    const isLoading = status === RequestStatus.Loading;

    const fetchGridData = async () => {
        try {
            await dispatch(fetchRooms()).unwrap();
        } catch (e) {
            showError(getErrorMessage(e));
        }
    };

    useEffect(() => {
        fetchGridData();
    }, []);

    if (isLoading) {
        return <PageLoader />;
    }

    if (error) {
        return <ErrorFallback onRetry={fetchGridData} />;
    }

    const hasRooms = rooms.length > 0;

    return (
        <Grid2
            container
            spacing={4}
            rowSpacing={2}
            sx={{
                justifyContent: hasRooms ? undefined : 'center',
            }}
        >
            <>
                {rooms.map(room => (
                    <RoomsGridItem key={room.id}>
                        <Room id={room.id} title={room.name} />
                    </RoomsGridItem>
                ))}
                <RoomsGridItem>
                    <NewRoom />
                </RoomsGridItem>
            </>
        </Grid2>
    );
}

export default RoomsGrid;
