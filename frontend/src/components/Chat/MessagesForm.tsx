import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Field, Form, Formik } from 'formik';

import type { IMessage } from '../../store/chat/types';
import { chatMessageSchema } from '../Form/validation';

interface IMessagesFormProps {
    onSubmit: (message: IMessage) => void;
}

const INITIAL_MESSAGE_FORM = { message: '' };
const MESSAGE_FORM_PLACEHOLDER = 'Type a message...';

function MessagesForm({ onSubmit }: IMessagesFormProps) {
    const handleSubmit = (values: { message: string }, { resetForm }: any) => {
        const newMessage: IMessage = {
            id: String(Math.random()),
            user: 'User',
            text: values.message,
            timestamp: new Date().toLocaleTimeString(),
        };
        onSubmit(newMessage);
        resetForm();
    };
    return (
        <Formik
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

export default MessagesForm;
