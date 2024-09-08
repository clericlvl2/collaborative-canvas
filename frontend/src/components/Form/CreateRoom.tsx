import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { Form, Formik } from 'formik';
import type { FormikConfig } from 'formik/dist/types';
import type { InferType } from 'yup';

import type { ICreateRoomParams } from '../../api/shared/types';
import { ROOM_CREATION_INPUTS } from './inputConfig';
import { TextFieldConnected } from './TextFieldConnected';
import { createRoomSchema as roomValidationSchema } from './validation';

export type IUserForm = InferType<typeof roomValidationSchema>;
export type IOnSubmitUserCallback = FormikConfig<IUserForm>['onSubmit'];

interface IRoomCreationProps {
    onSubmit: (params: ICreateRoomParams) => Promise<void>;
    onCancel: () => void;
}

const INITIAL_ROOM_FORM = {
    title: '',
};

function CreateRoom({ onSubmit, onCancel }: IRoomCreationProps) {
    const handleSubmit: IOnSubmitUserCallback = async (formData, helpers) => {
        await onSubmit({ name: formData.title });
        helpers.resetForm();
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
                                {ROOM_CREATION_INPUTS.map(config => (
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
                                    <LoadingButton
                                        loading={formProps.isSubmitting}
                                        type="submit"
                                        variant="contained"
                                    >
                                        Save
                                    </LoadingButton>
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

export default CreateRoom;
