import type { ReactNode, SyntheticEvent } from 'react';

import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import styled from '@mui/system/styled';

interface ICardLayoutProps {
    children?: ReactNode;
    onClick: (e: SyntheticEvent) => void;
}

const StyledCard = styled(Card)(() => ({
    height: 286,
    ':hover': {
        '& .hover-button': {
            opacity: 1,
            pointerEvents: 'auto',
        },
    },
}));

export function CardLayout({ children, onClick }: ICardLayoutProps) {
    return (
        <StyledCard>
            <CardActionArea
                component="a"
                disableRipple
                onClick={onClick}
                sx={{ height: '100%' }}
            >
                {children}
            </CardActionArea>
        </StyledCard>
    );
}
