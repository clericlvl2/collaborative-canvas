import type { FormikConfig } from 'formik/dist/types';
import type { InferType } from 'yup';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Form, Formik } from 'formik';
import { useNavigate } from 'react-router';

import { registerUser } from '@entities/user';
import { ROUTE } from '@shared/config';
import { extractErrorMessage, useErrorNotification } from '@shared/lib';
import { useAppDispatch } from '@shared/store';
import { NavigationLink, TextFieldConnected } from '@shared/ui';

import {
    REGISTER_INPUTS,
    registerUserSchema as userValidationSchema,
} from './input';

export type IUserForm = InferType<typeof userValidationSchema>;
export type ISubmitHandler = FormikConfig<IUserForm>['onSubmit'];

const INITIAL_USER_FORM: IUserForm = {
    name: '',
    email: '',
    password: '',
};

export function RegisterForm() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const showError = useErrorNotification();

    const handleSubmit: ISubmitHandler = async (formData, helpers) => {
        try {
            await dispatch(registerUser(formData)).unwrap();
            navigate(ROUTE.LOGIN);
            helpers.resetForm();
        } catch (e) {
            showError(extractErrorMessage(e));
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
                            <Button
                                loading={formProps.isSubmitting}
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign Up
                            </Button>
                            <Grid container justifyContent="center">
                                <NavigationLink to={ROUTE.LOGIN}>
                                    Already have an account? Sign in
                                </NavigationLink>
                            </Grid>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Container>
    );
}
