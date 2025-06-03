import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Field, Form, Formik, type FormikHelpers } from 'formik';

import { chatMessageSchema } from '../model/schema';

interface IMessageForm {
    message: string;
}

interface IMessagesFormProps {
    onSubmit: (message: string) => void;
}

const INITIAL_MESSAGE_FORM = { message: '' };
const MESSAGE_FORM_PLACEHOLDER = 'Type a message...';

export function MessagesForm({ onSubmit }: IMessagesFormProps) {
    const handleSubmit = (
        values: IMessageForm,
        { resetForm }: FormikHelpers<IMessageForm>
    ) => {
        onSubmit(values.message);
        resetForm();
    };

    return (
        <Formik<IMessageForm>
            initialValues={INITIAL_MESSAGE_FORM}
            validationSchema={chatMessageSchema}
            onSubmit={handleSubmit}
        >
            {({ values }) => (
                <Form>
                    <Box mt={2} display="flex" alignItems="center">
                        <Field
                            as={TextField}
                            name="message"
                            placeholder={MESSAGE_FORM_PLACEHOLDER}
                            variant="outlined"
                            fullWidth
                            multiline
                            rows={2}
                        />
                        <Button
                            disabled={values.message.length === 0}
                            type="submit"
                            variant="contained"
                            color="primary"
                            style={{ marginLeft: '10px' }}
                        >
                            Send
                        </Button>
                    </Box>
                </Form>
            )}
        </Formik>
    );
}
