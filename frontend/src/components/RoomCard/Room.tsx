import {
    Box,
    Button,
    CardActions,
    CardContent,
    CardMedia,
    Typography,
} from '@mui/material';
import type { SyntheticEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import { PagesRoutes } from '../../router/pages';
import roomPlaceholderImage from '../../vendor/images/roomPlaceholder.jpg';
import CardLayout from './CardLayout';
import RoomMembers from './RoomMembers';

interface IRoomProps {
    id: string;
    title: string;
}

function Room({ id, title }: IRoomProps) {
    const navigate = useNavigate();

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

    return (
        <>
            <CardLayout onClick={handleCardClick}>
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
            </CardLayout>
        </>
    );
}

export default Room;
