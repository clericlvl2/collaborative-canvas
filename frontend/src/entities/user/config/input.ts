export const USER_INPUTS_CONFIGS = {
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
