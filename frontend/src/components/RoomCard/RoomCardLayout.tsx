import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import type { ReactNode, SyntheticEvent } from 'react';

interface ICardLayoutProps {
    children?: ReactNode;
    onClick: (e: SyntheticEvent) => void;
}

function RoomCardLayout({ children, onClick }: ICardLayoutProps) {
    return (
        <Card
            sx={{
                height: 286,
                ':hover': {
                    '& .hover-button': {
                        opacity: 0.8, // Reveal the button when card is hovered
                        pointerEvents: 'auto', // Make the button clickable
                    },
                },
            }}
        >
            <CardActionArea
                component="a"
                onClick={onClick}
                sx={{
                    height: '100%',
                }}
            >
                {children}
            </CardActionArea>
        </Card>
    );
}

export default RoomCardLayout;
