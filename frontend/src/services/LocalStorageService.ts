import type { INullable } from '../common/types';

export enum StorageKey {
    Token = 'token',
    User = 'user',
}

export interface IStorageSchema {
    [StorageKey.Token]: string;
    [StorageKey.User]: {
        id: string;
        name: string;
        email: string;
    };
}

export class LocalStorageService {
    static get<T extends StorageKey>(field: T): INullable<IStorageSchema[T]> {
        const value = localStorage.getItem(field);

        if (!value) {
            return null;
        }

        return JSON.parse(value);
    }

    static set<T extends StorageKey>(field: T, value: IStorageSchema[T]): void {
        localStorage.setItem(field, JSON.stringify(value));
    }

    static remove(field: StorageKey): void {
        localStorage.removeItem(field);
    }
}
