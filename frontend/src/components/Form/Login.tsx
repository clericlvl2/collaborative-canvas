import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LoadingButton from '@mui/lab/LoadingButton';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid2 from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import { Form, Formik } from 'formik';
import type { FormikConfig } from 'formik/dist/types';
import { useNavigate } from 'react-router-dom';
import type { InferType } from 'yup';

import { useErrorNotification } from '../../hooks/useErrorNotification';
import { PagesRoutes } from '../../router/pages';
import { executeLogin } from '../../store/auth/actions';
import { useAppDispatch } from '../../store/hooks';
import { NavigationLink } from '../NavigationLink/NavigationLink';
import { LOGIN_INPUTS } from './inputConfig';
import { TextFieldConnected } from './TextFieldConnected';
import { loginUserSchema as userValidationSchema } from './validation';

export type IUserForm = InferType<typeof userValidationSchema>;
export type ISubmitHandler = FormikConfig<IUserForm>['onSubmit'];

const INITIAL_USER_FORM: IUserForm = {
    email: '',
    password: '',
};

function Login() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const showError = useErrorNotification();

    const handleSubmit: ISubmitHandler = async (formData, helpers) => {
        try {
            await dispatch(executeLogin(formData)).unwrap();
            navigate(PagesRoutes.Rooms);
            helpers.resetForm();
        } catch (e) {
            showError(e.message);
        }
    };

    return (
        <Container maxWidth="xs">
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar
                    sx={{
                        m: 1,
                        bgcolor: 'secondary.main',
                    }}
                >
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Formik
                    initialValues={INITIAL_USER_FORM}
                    onSubmit={handleSubmit}
                    validateOnBlur={false}
                    validationSchema={userValidationSchema}
                >
                    {formProps => (
                        <Form>
                            {LOGIN_INPUTS.map(config => (
                                <TextFieldConnected
                                    key={config.id}
                                    {...config}
                                />
                            ))}
                            <LoadingButton
                                loading={formProps.isSubmitting}
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign In
                            </LoadingButton>
                            <Grid2 container justifyContent="center">
                                <NavigationLink to={PagesRoutes.SignUp}>
                                    Doesn't have an account? Sign up
                                </NavigationLink>
                            </Grid2>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Container>
    );
}

export default Login;
