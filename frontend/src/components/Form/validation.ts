import { object, string } from 'yup';

const USER_SCHEMAS = {
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

export const loginUserSchema = object({
    email: USER_SCHEMAS.EMAIL,
    password: USER_SCHEMAS.PASSWORD,
});

export const registerUserSchema = object({
    email: USER_SCHEMAS.EMAIL,
    password: USER_SCHEMAS.PASSWORD,
    name: USER_SCHEMAS.NAME,
});

export const editUserSchema = object({
    email: USER_SCHEMAS.EMAIL,
    name: USER_SCHEMAS.NAME,
});

export const createRoomSchema = object({
    title: string()
        .max(36, 'Must be 20 characters or less')
        .min(2, 'Must be 2 characters or more')
        .required('Title is required'),
});
