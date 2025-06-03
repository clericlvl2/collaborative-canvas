import type { ITextField } from '@shared/ui';

import { object } from 'yup';

import { USER_INPUTS_CONFIGS, USER_SCHEMAS } from '@entities/user';

export const LOGIN_INPUTS: ITextField[] = [
    USER_INPUTS_CONFIGS.EMAIL_FIELD,
    USER_INPUTS_CONFIGS.PASSWORD_FIELD,
];

export const loginUserSchema = object({
    email: USER_SCHEMAS.EMAIL,
    password: USER_SCHEMAS.PASSWORD,
});
