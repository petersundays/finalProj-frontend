import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEN from './en.json';
import translationPT from './pt.json';
import useLanguageStore from '../stores/UseLanguageStore';

const initialState = useLanguageStore.getState();

i18n.use(initReactI18next).init({
    resources: {
        en: {translation: translationEN},
        pt: {translation: translationPT},
    },
    lng: initialState.language,
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false,
    },
    detection: {
        order: ['localStorage'],
        caches: ['localStorage'],
    },
});

useLanguageStore.subscribe(
    (state) => {
    i18n.changeLanguage(state.language);
},
(state) => state.language
);

export default i18n;