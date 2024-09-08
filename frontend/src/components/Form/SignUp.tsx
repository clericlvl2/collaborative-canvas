import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { LoadingButton } from '@mui/lab';
import { Grid2 } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Form, Formik } from 'formik';
import type { FormikConfig } from 'formik/dist/types';
import { useNavigate } from 'react-router-dom';
import type { InferType } from 'yup';

import { useAuth } from '../../hooks/useAuth';
import { PagesRoutes } from '../../router/pages';
import { NavigationLink } from '../NavigationLink/NavigationLink';
import { SIGN_UP_INPUTS } from './inputConfig';
import { TextFieldConnected } from './TextFieldConnected';
import { signUpUserSchema as userValidationSchema } from './validation';

export type IUserForm = InferType<typeof userValidationSchema>;
export type IOnSubmitUserCallback = FormikConfig<IUserForm>['onSubmit'];

const INITIAL_USER_FORM: IUserForm = {
    name: '',
    email: '',
    password: '',
};

function SignUp() {
    const navigate = useNavigate();
    const auth = useAuth();

    const handleSubmit: IOnSubmitUserCallback = async (formData, helpers) => {
        const res = await auth.signUp(formData);

        if (!res) {
            return;
        }

        navigate(PagesRoutes.SignIn);
        helpers.resetForm();
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
                    Sign up
                </Typography>
                <Formik
                    initialValues={INITIAL_USER_FORM}
                    onSubmit={handleSubmit}
                    validateOnBlur={false}
                    validationSchema={userValidationSchema}
                >
                    {formProps => (
                        <Form>
                            {SIGN_UP_INPUTS.map(config => (
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
                                Sign Up
                            </LoadingButton>
                            <Grid2 container justifyContent="center">
                                <NavigationLink to={PagesRoutes.SignIn}>
                                    Already have an account? Sign in
                                </NavigationLink>
                            </Grid2>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Container>
    );
}

export default SignUp;
