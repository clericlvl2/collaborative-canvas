import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import { Language, Namespace, Translations } from '@shared/config';

declare module 'i18next' {
    interface CustomTypeOptions {
        defaultNS: 'common';
        resources: {
            [Namespace.Common]: typeof Translations.En[Namespace.Common];
            [Namespace.Auth]: typeof Translations.En[Namespace.Auth];
        };
    }
}

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        debug: import.meta.env.VITE_REACT_APP_MODE === 'dev',
        defaultNS: Namespace.Common,
        fallbackLng: Language.EN,
        supportedLngs: [Language.EN, Language.RU],
        resources: {
            [Language.EN]: Translations.En,
            [Language.RU]: Translations.Ru,
        },
    });
