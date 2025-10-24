import type { TNullable } from '@shared/lib';

import { type IStorageSchema, StorageKey } from './IStorageService';

export class LocalStorageService {
    static get<T extends StorageKey>(field: T): TNullable<IStorageSchema[T]> {
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
