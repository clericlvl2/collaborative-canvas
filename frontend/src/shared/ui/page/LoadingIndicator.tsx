import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

export function LoadingIndicator() {
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
