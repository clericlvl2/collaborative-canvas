import type { ITextField } from '@shared/ui';

import { object } from 'yup';

import { USER_INPUTS_CONFIGS, USER_SCHEMAS } from '@entities/user';

export const REGISTER_INPUTS: ITextField[] = [
    USER_INPUTS_CONFIGS.NAME_FIELD,
    USER_INPUTS_CONFIGS.EMAIL_FIELD,
    USER_INPUTS_CONFIGS.PASSWORD_FIELD,
];

export const registerUserSchema = object({
    email: USER_SCHEMAS.EMAIL,
    password: USER_SCHEMAS.PASSWORD,
    name: USER_SCHEMAS.NAME,
});
