import Typography from '@mui/material/Typography';

export const CardDescription = ({ description }: { description: string }) => {
    return (
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {description}
        </Typography>
    );
};
