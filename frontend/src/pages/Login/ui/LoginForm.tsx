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
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import { loginUser } from '@entities/user';
import { HOME_ROUTE, NamespaceI18N, ROUTE } from '@shared/config';
import {
    extractErrorMessage,
    useErrorNotification,
} from '@shared/lib';
import { useAppDispatch } from '@shared/store';
import { NavigationLink, TextFieldConnected } from '@shared/ui';

import {
    LOGIN_INPUTS,
    loginUserSchema as userValidationSchema,
} from './input';

export type IUserForm = InferType<typeof userValidationSchema>;
export type ISubmitHandler = FormikConfig<IUserForm>['onSubmit'];

const INITIAL_USER_FORM: IUserForm = {
    email: '',
    password: '',
};

export function LoginForm() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const showError = useErrorNotification();
    const { t } = useTranslation();

    const handleSubmit: ISubmitHandler = async (formData, helpers) => {
        try {
            await dispatch(loginUser(formData)).unwrap();
            navigate(HOME_ROUTE);
            helpers.resetForm();
        } catch (e) {
            showError(extractErrorMessage(e));
        }
    };

    // noinspection SpellCheckingInspection
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
                            <Button
                                loading={formProps.isSubmitting}
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                {t('sign-in', { ns: NamespaceI18N.Auth })}
                            </Button>
                            <Grid container justifyContent="center">
                                <NavigationLink to={ROUTE.REGISTER}>
                                    Doesn&#39;t have an account? Sign up
                                </NavigationLink>
                            </Grid>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Container>
    );
}
