import type { ITextField } from '@shared/ui';

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

export const CREATE_ROOM_INPUTS: ITextField[] = [
    ROOMS_INPUTS_CONFIGS.TITLE_FIELD,
];
