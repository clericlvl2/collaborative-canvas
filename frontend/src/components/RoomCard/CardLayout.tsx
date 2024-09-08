import { Card, CardActionArea } from '@mui/material';
import type { ReactNode, SyntheticEvent } from 'react';

interface ICardLayoutProps {
    children?: ReactNode;
    onClick: (e: SyntheticEvent) => void;
}

function CardLayout({ children, onClick }: ICardLayoutProps) {
    return (
        <Card
            sx={{
                height: 286,
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

export default CardLayout;
