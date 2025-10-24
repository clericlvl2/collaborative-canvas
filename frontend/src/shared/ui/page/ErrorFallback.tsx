import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import styled from '@mui/system/styled';

interface IErrorFallbackProps {
    onRetry: () => void;
}

const ErrorFallbackContainer = styled(Container)(({ theme }) => ({
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100%',
}));

export function ErrorFallback({ onRetry }: IErrorFallbackProps) {
    return (
        <ErrorFallbackContainer>
            <Typography variant="h6" color="error" gutterBottom>
                Something went wrong!
            </Typography>
            <Button variant="contained" color="primary" onClick={onRetry}>
                Refresh
            </Button>
        </ErrorFallbackContainer>
    );
}
