import { string } from 'yup';

export const USER_SCHEMAS = {
    EMAIL: string()
        .email('Invalid email address')
        .required('Email is required'),
    NAME: string()
        .max(36, 'Must be 20 characters or less')
        .min(2, 'Must be 2 characters or more')
        .required('Name is required'),
    PASSWORD: string()
        .min(3, 'Must be more than 3 characters')
        .required('Password is required'),
};
