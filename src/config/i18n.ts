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
  },

  fallbackLocale: 'en',
};

export default i18nConfig;
