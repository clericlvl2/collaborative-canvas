import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

function PageLoader() {
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

export default PageLoader;
