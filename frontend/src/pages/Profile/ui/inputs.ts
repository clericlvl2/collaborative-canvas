import type { ITextField } from '@shared/ui';

import { object } from 'yup';

import { USER_INPUTS_CONFIGS, USER_SCHEMAS } from '@entities/user';

export const EDIT_PROFILE_INPUTS: ITextField[] = [
    USER_INPUTS_CONFIGS.NAME_FIELD,
    USER_INPUTS_CONFIGS.EMAIL_FIELD,
];
export const editUserSchema = object({
    email: USER_SCHEMAS.EMAIL,
    name: USER_SCHEMAS.NAME,
});
