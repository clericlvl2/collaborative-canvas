import Typography from '@mui/material/Typography';

export const CardTitle = ({ title }: { title: string }) => {
    return (
        <Typography
            title={title}
            noWrap
            gutterBottom
            variant="h5"
            component="div"
        >
            {title}
        </Typography>
    );
};
