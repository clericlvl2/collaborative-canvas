import EditIcon from '@mui/icons-material/Edit';
import { LoadingButton } from '@mui/lab';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Form, Formik } from 'formik';
import type { FormikConfig } from 'formik/dist/types';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import type { InferType } from 'yup';

import { LocalStorageKey } from '../../common/enums';
import { useAuth } from '../../hooks/useAuth';
import { PagesRoutes } from '../../router/pages';
import { PROFILE_EDITING_INPUTS } from './inputConfig';
import { TextFieldConnected } from './TextFieldConnected';
import { editUserSchema as userValidationSchema } from './validation';

export type IUserForm = InferType<typeof userValidationSchema>;
export type IOnSubmitUserCallback = FormikConfig<IUserForm>['onSubmit'];

const readUserDataFromLocalStorage = () => {
    return {
        name: localStorage.getItem(LocalStorageKey.UserName) ?? '',
        email: localStorage.getItem(LocalStorageKey.UserEmail) ?? '',
    };
};

function EditProfile() {
    const auth = useAuth();
    const navigate = useNavigate();
    const initialUser = useMemo(() => readUserDataFromLocalStorage(), []);

    const handleSignOut = async () => {
        const result = await auth.signOut();

        if (result) {
            navigate(PagesRoutes.SignIn);
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
                            {PROFILE_EDITING_INPUTS.map(config => (
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
