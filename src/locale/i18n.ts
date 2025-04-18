import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import enLocales from './languages/en.json';
import vnLocales from './languages/vn.json';

import { enUS, viVN } from '@mui/material/locale';

const allLangs = [
    {
        label: 'Vietnamese',
        value: 'vn',
        systemValue: viVN,
        icon: '/assets/icons/flags/ic_flag_vn.svg',
    },
    {
        label: 'English',
        value: 'en',
        systemValue: enUS,
        icon: '/assets/icons/flags/ic_flag_en.svg',
    }
];

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            en: { translations: enLocales },
            vn: { translations: vnLocales },
        },
        lng: typeof window !== 'undefined' ?
            localStorage.getItem('i18nextLng')?.toString() : allLangs[0].value.toString(),
        fallbackLng: allLangs[0].value,
        debug: false,
        ns: ['translations'],
        defaultNS: 'translations',
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
