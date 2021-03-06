interface I18nConfig {
  supportedLocales: {
    [key: string]: string;
  };

  fallbackLocale: string;
}

const i18nConfig: I18nConfig = {
  supportedLocales: {
    de: 'Deutsch',
    en: 'English',
    fr: 'Français',
    nl: 'Nederlands',
    pt: 'Português',
  },

  fallbackLocale: 'en',
};

export default i18nConfig;
