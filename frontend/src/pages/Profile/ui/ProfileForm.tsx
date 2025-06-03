import type { FormikConfig } from 'formik/dist/types';
import type { InferType } from 'yup';

import EditIcon from '@mui/icons-material/Edit';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Form, Formik } from 'formik';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import { logoutUser, selectUser } from '@entities/user';
import { ROUTE } from '@shared/config';
import {
    extractErrorMessage,
    useErrorNotification,
} from '@shared/lib';
import { useAppDispatch } from '@shared/store';
import { TextFieldConnected } from '@shared/ui';

import {
    EDIT_PROFILE_INPUTS,
    editUserSchema as userValidationSchema,
} from './inputs';

export type IUserForm = InferType<typeof userValidationSchema>;
export type IOnSubmitUserCallback = FormikConfig<IUserForm>['onSubmit'] | (() => void);

export function ProfileForm() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const user = useSelector(selectUser);
    const showError = useErrorNotification();

    const initialUser = useMemo(
        () => ({
            name: user?.name ?? '',
            email: user?.email ?? '',
        }),
        [user]
    );

    const handleLogout = async () => {
        try {
            await dispatch(logoutUser()).unwrap();
            navigate(ROUTE.LOGIN);
        } catch (e) {
            showError(extractErrorMessage(e));
        }
    };

    const handleSubmit: IOnSubmitUserCallback = async () => {
        alert('Feature is not ready');
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
                    <EditIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Profile Settings
                </Typography>
                <Formik
                    initialValues={initialUser}
                    onSubmit={handleSubmit}
                    validateOnBlur={false}
                    validationSchema={userValidationSchema}
                >
                    {formProps => (
                        <Form>
                            {EDIT_PROFILE_INPUTS.map(config => (
                                <TextFieldConnected
                                    key={config.id}
                                    {...config}
                                />
                            ))}
                            <Button
                                loading={formProps.isSubmitting}
                                disabled={!formProps.dirty}
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Confirm
                            </Button>
                        </Form>
                    )}
                </Formik>
                <Button fullWidth variant="outlined" onClick={handleLogout}>
                    Sign Out
                </Button>
            </Box>
        </Container>
    );
}
