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

import { getErrorMessage } from '../../common/errors/getErrorMessage';
import { useErrorNotification } from '../../hooks/useErrorNotification';
import { PagesRoutes } from '../../router/pages';
import { executeRegister } from '../../store/auth/actions';
import { useAppDispatch } from '../../store/hooks';
import { NavigationLink } from '../NavigationLink/NavigationLink';
import { REGISTER_INPUTS } from './inputConfig';
import { TextFieldConnected } from './TextFieldConnected';
import { registerUserSchema as userValidationSchema } from './validation';

export type IUserForm = InferType<typeof userValidationSchema>;
export type ISubmitHandler = FormikConfig<IUserForm>['onSubmit'];

const INITIAL_USER_FORM: IUserForm = {
    name: '',
    email: '',
    password: '',
};

function Register() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const showError = useErrorNotification();

    const handleSubmit: ISubmitHandler = async (formData, helpers) => {
        try {
            await dispatch(executeRegister(formData)).unwrap();
            navigate(PagesRoutes.SignIn);
            helpers.resetForm();
        } catch (e) {
            showError(getErrorMessage(e));
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
                            {REGISTER_INPUTS.map(config => (
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

export default Register;
