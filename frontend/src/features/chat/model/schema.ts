import { object, string } from 'yup';

export const chatMessageSchema = object({
    message: string(),
});
