import type { TNullable } from '@shared/lib';

export enum StorageKey {
    Token = 'token',
    User = 'user'
}

export interface IStorageSchema {
    [StorageKey.Token]: string;
    [StorageKey.User]: {
        id: string;
        name: string;
        email: string;
    };
}

export interface IStorageService {
    get: <T extends StorageKey>(field: T) => TNullable<IStorageSchema[T]>;
    set: <T extends StorageKey>(field: T, value: IStorageSchema[T]) => void;
    remove: (field: StorageKey) => void;
}
