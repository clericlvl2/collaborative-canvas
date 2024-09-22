import EditIcon from '@mui/icons-material/Edit';
import LoadingButton from '@mui/lab/LoadingButton';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Form, Formik } from 'formik';
import type { FormikConfig } from 'formik/dist/types';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { InferType } from 'yup';

import { PagesRoutes } from '../../router/pages';
import { loggedOut, selectUser } from '../../store/auth/auth';
import { useAppDispatch } from '../../store/hooks';
import { EDIT_PROFILE_INPUTS } from './inputConfig';
import { TextFieldConnected } from './TextFieldConnected';
import { editUserSchema as userValidationSchema } from './validation';

export type IUserForm = InferType<typeof userValidationSchema>;
export type IOnSubmitUserCallback = FormikConfig<IUserForm>['onSubmit'];

function EditProfile() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const user = useSelector(selectUser);

    const initialUser = useMemo(
        () => ({
            name: user?.name ?? '',
            email: user?.email ?? '',
        }),
        [user]
    );

    const handleSignOut = () => {
        dispatch(loggedOut());
        navigate(PagesRoutes.SignIn);
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
                            <LoadingButton
                                loading={formProps.isSubmitting}
                                disabled={!formProps.dirty}
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Confirm
                            </LoadingButton>
                        </Form>
                    )}
                </Formik>
                <Button fullWidth variant="outlined" onClick={handleSignOut}>
                    Sign Out
                </Button>
            </Box>
        </Container>
    );
}

export default EditProfile;
