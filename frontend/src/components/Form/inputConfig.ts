import type { ITextField } from './TextFieldConnected';

const USER_INPUTS_CONFIGS = {
    NAME_FIELD: {
        margin: 'normal',
        fullWidth: true,
        id: 'name',
        label: 'Name',
        type: 'text',
        name: 'name',
        autoComplete: 'name',
    },
    EMAIL_FIELD: {
        margin: 'normal',
        fullWidth: true,
        id: 'email',
        label: 'Email Address',
        type: 'email',
        name: 'email',
        autoComplete: 'email',
    },
    PASSWORD_FIELD: {
        margin: 'normal',
        fullWidth: true,
        name: 'password',
        label: 'Password',
        type: 'password',
        id: 'password',
        autoComplete: 'current-password',
    },
} as const;

const ROOMS_INPUTS_CONFIGS = {
    TITLE_FIELD: {
        margin: 'normal',
        fullWidth: true,
        id: 'title',
        label: 'Title',
        type: 'text',
        name: 'title',
        autoComplete: 'title',
    },
} as const;

export const LOGIN_INPUTS: ITextField[] = [
    USER_INPUTS_CONFIGS.EMAIL_FIELD,
    USER_INPUTS_CONFIGS.PASSWORD_FIELD,
];

export const REGISTER_INPUTS: ITextField[] = [
    USER_INPUTS_CONFIGS.NAME_FIELD,
    USER_INPUTS_CONFIGS.EMAIL_FIELD,
    USER_INPUTS_CONFIGS.PASSWORD_FIELD,
];

export const EDIT_PROFILE_INPUTS: ITextField[] = [
    USER_INPUTS_CONFIGS.NAME_FIELD,
    USER_INPUTS_CONFIGS.EMAIL_FIELD,
];

export const CREATE_ROOM_INPUTS: ITextField[] = [
    ROOMS_INPUTS_CONFIGS.TITLE_FIELD,
];
