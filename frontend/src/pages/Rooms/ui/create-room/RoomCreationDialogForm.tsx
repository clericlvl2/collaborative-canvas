import type { FormikConfig } from 'formik/dist/types';
import type { InferType } from 'yup';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { Form, Formik } from 'formik';

import { createRoom } from '@entities/rooms';
import { useAppDispatch } from '@shared/store';
import { TextFieldConnected } from '@shared/ui';

import { CREATE_ROOM_INPUTS } from './input';
import { createRoomSchema as roomValidationSchema } from './schema';

export type IUserForm = InferType<typeof roomValidationSchema>;
export type IOnSubmitUserCallback = FormikConfig<IUserForm>['onSubmit'];

interface ICreateRoomFormProps {
    onSuccess: () => void;
    onError: (error: unknown) => void;
    onCancel: () => void;
}

const INITIAL_ROOM_FORM = {
    title: '',
};

export function RoomCreationDialogForm({
    onSuccess,
    onCancel,
    onError,
}: ICreateRoomFormProps) {
    const dispatch = useAppDispatch();

    const handleSubmit: IOnSubmitUserCallback = async (formData, helpers) => {
        try {
            await dispatch(createRoom({ name: formData.title })).unwrap();
            helpers.resetForm();
            onSuccess();
        } catch (e) {
            onError(e);
        }
    };

    return (
        <Container maxWidth="xs">
            <Box
                sx={{
                    height: 216,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Formik
                    initialValues={INITIAL_ROOM_FORM}
                    onSubmit={handleSubmit}
                    validateOnBlur={false}
                    validationSchema={roomValidationSchema}
                >
                    {formProps => (
                        <Box
                            component={Form}
                            sx={{
                                height: '100%',
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    height: '100%',
                                }}
                            >
                                {CREATE_ROOM_INPUTS.map(config => (
                                    <TextFieldConnected
                                        key={config.id}
                                        {...config}
                                    />
                                ))}

                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: 1,
                                        width: '100%',
                                        mt: 'auto',
                                        mb: 2,
                                    }}
                                >
                                    <Button
                                        loading={formProps.isSubmitting}
                                        type="submit"
                                        variant="contained"
                                    >
                                        Save
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        onClick={onCancel}
                                    >
                                        Cancel
                                    </Button>
                                </Box>
                            </Box>
                        </Box>
                    )}
                </Formik>
            </Box>
        </Container>
    );
}
