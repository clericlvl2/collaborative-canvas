import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import { Language, NamespaceI18N, Translations } from '@shared/config';

type TTranslations = typeof Translations['En'];

declare module 'i18next' {
    interface CustomTypeOptions {
        defaultNS: 'common';
        resources: {
            [NamespaceI18N.Common]: TTranslations[NamespaceI18N.Common];
            [NamespaceI18N.Auth]: TTranslations[NamespaceI18N.Auth];
            [NamespaceI18N.Draw]: TTranslations[NamespaceI18N.Draw];
        };
    }
}

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        debug: import.meta.env.DEV,
        defaultNS: NamespaceI18N.Common,
        fallbackLng: Language.EN,
        supportedLngs: [Language.EN, Language.RU],
        resources: {
            [Language.EN]: Translations.En,
            [Language.RU]: Translations.Ru,
        },
    });
