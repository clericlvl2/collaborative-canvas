import auth_en from './locales/en/auth.json';
import common_en from './locales/en/common.json';
import auth_ru from './locales/ru/auth.json';
import common_ru from './locales/ru/common.json';

export enum Language {
    EN = 'en',
    RU = 'ru'
}

export enum Namespace {
    Auth = 'auth',
    Common = 'common',
    Error = 'error'
}

export const Translations = {
    En: {
        [Namespace.Common]: common_en,
        [Namespace.Auth]: auth_en,
    },
    Ru: {
        [Namespace.Common]: common_ru,
        [Namespace.Auth]: auth_ru,
    },
};
