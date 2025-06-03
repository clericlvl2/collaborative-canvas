import { object, string } from 'yup';

export const createRoomSchema = object({
    title: string()
        .max(36, 'Must be 20 characters or less')
        .min(2, 'Must be 2 characters or more')
        .required('Title is required'),
});
