import type { SyntheticEvent } from 'react';

import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { useNavigate } from 'react-router';

import { deleteRoom } from '@entities/rooms';
import { roomPlaceholderImage } from '@shared/assets';
import { ROUTE } from '@shared/config';
import { extractErrorMessage, useErrorNotification } from '@shared/lib';
import { useAppDispatch } from '@shared/store';
import {
    CardActionsContainer,
    CardDeleteButton,
    CardDescription,
    CardLayout,
    CardTitle,
} from '@shared/ui';

import { RoomMembersAvatarsGroup } from './RoomMembersAvatarsGroup';

interface IRoomProps {
    id: string;
    title: string;
}

export function RoomCard({ id, title }: IRoomProps) {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const showError = useErrorNotification();

    const handleLinkCopy = (e: SyntheticEvent) => {
        e.stopPropagation();
        console.log('link copied');
    };

    const handleCardClick = () => {
        navigate(ROUTE.BOARD + `/${id}`, { state: { id } });
    };

    const handleRemoveClick = async (e: SyntheticEvent) => {
        e.preventDefault();
        e.stopPropagation();

        try {
            await dispatch(deleteRoom(id)).unwrap();
        } catch (e) {
            showError(extractErrorMessage(e));
        }
    };

    return (
        <>
            <CardLayout onClick={handleCardClick}>
                <CardMedia sx={{ height: 140 }} image={roomPlaceholderImage} />
                <CardContent>
                    <CardTitle title={title} />
                    <CardDescription description="Room card description" />
                </CardContent>
                <CardActionsContainer>
                    <CardActions>
                        <Button size="small" onClick={handleLinkCopy}>
                            Copy link
                        </Button>
                    </CardActions>
                    <RoomMembersAvatarsGroup />
                </CardActionsContainer>
                <CardDeleteButton handleRemoveClick={handleRemoveClick} />
            </CardLayout>
        </>
    );
}
