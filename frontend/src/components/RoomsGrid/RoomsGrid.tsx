import { Backdrop, CircularProgress, Grid2 } from '@mui/material';
import { useEffect, useState } from 'react';

import type { IRoomResponseData as IRoom } from '../../api/shared/types';
import { useRooms } from '../../hooks/useRooms';
import NewRoom from '../RoomCard/NewRoom';
import Room from '../RoomCard/Room';
import RoomContainer from './RoomContainer';

function RoomsGrid() {
    const [rooms, setRooms] = useState<IRoom[]>([]);
    const { isLoading, getRooms } = useRooms();

    useEffect(() => {
        const initRooms = async () => {
            const data = await getRooms();

            if (data) {
                setRooms(data);
            }
        };

        initRooms();
    }, [getRooms]);

    if (isLoading) {
        return (
            <Backdrop
                open
                sx={{
                    background: '#FFF',
                }}
            >
                <CircularProgress color="primary" />
            </Backdrop>
        );
    }

    const handleRoomCreate = (room: IRoom) => {
        setRooms(state => [...state, room]);
    };

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
                    <RoomContainer key={room._id}>
                        <Room id={room._id} title={room.name} />
                    </RoomContainer>
                ))}
                <RoomContainer>
                    <NewRoom onCreate={handleRoomCreate} />
                </RoomContainer>
            </>
        </Grid2>
    );
}

export default RoomsGrid;
