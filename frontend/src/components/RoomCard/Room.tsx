import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { type SyntheticEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import { getErrorMessage } from '../../common/errors/getErrorMessage';
import { useErrorNotification } from '../../hooks/useErrorNotification';
import { PagesRoutes } from '../../router/pages';
import { useAppDispatch } from '../../store/hooks';
import { deleteRoom } from '../../store/rooms/actions';
import roomPlaceholderImage from '../../vendor/images/roomPlaceholder.jpg';
import RoomCardLayout from './RoomCardLayout';
import RoomMembers from './RoomMembers';

interface IRoomProps {
    id: string;
    title: string;
}

function Room({ id, title }: IRoomProps) {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const showError = useErrorNotification();

    const handleLinkCopy = (e: SyntheticEvent) => {
        e.stopPropagation();
        console.log('link copied');
    };

    const handleCardClick = () => {
        navigate(PagesRoutes.Board + `/${id}`, {
            state: {
                id,
            },
        });
    };

    const handleRemoveClick = async (e: SyntheticEvent) => {
        e.stopPropagation();

        try {
            await dispatch(deleteRoom(id)).unwrap();
        } catch (e) {
            showError(getErrorMessage(e));
        }
    };

    return (
        <>
            <RoomCardLayout onClick={handleCardClick}>
                <CardMedia
                    sx={{ height: 140 }}
                    image={roomPlaceholderImage}
                    title="green iguana"
                />
                <CardContent>
                    <Typography
                        title={title}
                        noWrap
                        gutterBottom
                        variant="h5"
                        component="div"
                    >
                        {title}
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{ color: 'text.secondary' }}
                    >
                        Room description
                    </Typography>
                </CardContent>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <CardActions>
                        <Button size="small" onClick={handleLinkCopy}>
                            Copy link
                        </Button>
                    </CardActions>
                    <RoomMembers />
                </Box>
                <IconButton
                    onClick={handleRemoveClick}
                    disableRipple
                    className="hover-button"
                    sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        background: 'none',
                        opacity: 0, // Initially invisible
                        transition: 'opacity 0.3s ease',
                        pointerEvents: 'none', // Prevents button from being clickable when hidden
                    }}
                >
                    <DeleteIcon />
                </IconButton>
            </RoomCardLayout>
        </>
    );
}

export default Room;
