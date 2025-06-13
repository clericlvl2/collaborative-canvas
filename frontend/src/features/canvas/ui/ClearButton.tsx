import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

export const ClearButton = styled(Button)({
    transition: 'opacity 0.2s ease-in-out',
    opacity: 1,
    '&:hover': {
        transform: 'opacity .85',
    },
});
