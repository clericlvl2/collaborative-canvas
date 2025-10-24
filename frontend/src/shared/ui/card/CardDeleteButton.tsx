import type { SyntheticEvent } from 'react';

import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import styled from '@mui/system/styled';

const StyledIconButton = styled(IconButton)(() => ({
    position: 'absolute',
    top: 8,
    right: 8,
    background: 'none',
    opacity: 0,
    transition: 'opacity 0.3s ease',
    pointerEvents: 'none',
}));

interface IDeleteButton {
    handleRemoveClick: (e: SyntheticEvent) => Promise<void>;
}

export function CardDeleteButton({ handleRemoveClick }: IDeleteButton) {
    return (
        <StyledIconButton
            className="hover-button"
            disableRipple
            onClick={handleRemoveClick}
        >
            <DeleteIcon />
        </StyledIconButton>
    );
}
