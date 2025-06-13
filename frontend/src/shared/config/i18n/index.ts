import auth_en from './locales/en/auth.json';
import common_en from './locales/en/common.json';
import draw_en from './locales/en/draw.json';
import auth_ru from './locales/ru/auth.json';
import common_ru from './locales/ru/common.json';
import draw_ru from './locales/ru/draw.json';

export enum Language {
    EN = 'en',
    RU = 'ru'
}

export enum NamespaceI18N {
    Auth = 'auth',
    Common = 'common',
    Draw = 'draw',
    Error = 'error'
}

export const Translations = {
    En: {
        [NamespaceI18N.Common]: common_en,
        [NamespaceI18N.Auth]: auth_en,
        [NamespaceI18N.Draw]: draw_en,
    },
    Ru: {
        [NamespaceI18N.Common]: common_ru,
        [NamespaceI18N.Auth]: auth_ru,
        [NamespaceI18N.Draw]: draw_ru,
    },
};
