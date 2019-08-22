import load from './lib/load';
import { Translations } from './lib/types';
import resolveUserLocale from './lib/user-locale';
import { normalize, containsNormalized } from './lib/util';

let _locale: string;
let _translations: Translations;
let _supportedLocales: ReadonlyArray<string>;

export class Rosetta {
  init(options: {
    supportedLocales: string[],
    locale?: string,
    fallbackLocale?: string,
  }): Promise<string> {
    return new Promise((resolve, reject) => {
      if (!options.supportedLocales ||
        options.supportedLocales.length === 0
      ) {
        return reject(new Error(
          'No supported locales given. Please provide ' +
          'supported locales.'
        ));
      }

      _supportedLocales = Object.freeze(
        options.supportedLocales.map(normalize)
      );

      if (options.fallbackLocale &&
        !this.isSupported(options.fallbackLocale)
      ) {
        return reject(new Error(
          `Fallback locale ${options.fallbackLocale} is not in ` +
          'supported locales given: ' +
          `[${_supportedLocales.join(', ')}].`
        ));
      }

      if (options.locale && this.isSupported(options.locale)) {
        _locale = options.locale;
      } else if (options.locale && !this.isSupported(options.locale)) {
        _locale = options.fallbackLocale;
      } else {
        _locale = resolveUserLocale(_supportedLocales) ||
          options.fallbackLocale ||
          _supportedLocales[0];
      }

      return this.loadAndSet(_locale).then(() => resolve(_locale));
    });
  }

  /**
   * Normalized array of given supported locales
   * e.g. `['en-us', 'ar', 'fr']`.
   */
  get supportedLocales(): ReadonlyArray<string> {
    return _supportedLocales;
  }

  /**
   * Check if the given locale is supported.
   *
   * @param locale The locale to check.
   */
  private isSupported(locale: string): boolean {
    return containsNormalized(this.supportedLocales, locale);
  }


  /**
   * The current locale code e.g. 'en-us'
   */
  get locale() { return _locale; }

  /**
   * Set the current locale, reloading translations.
   *
   * @param locale The locale to set.
   */
  setUILanguage(locale: string): Promise<void> {
    return this.loadAndSet(locale);
  }

  getMessage(key: string): string {
    return (_translations[key]) ? _translations[key].message : key;
  }

  private loadAndSet(locale: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.isSupported(locale)) {
        return reject(new Error(`Locale ${locale} is not in supported ` +
          `locales given: [${_supportedLocales.join(', ')}].`));
      }

      const normalizedLocale = normalize(locale);

      return load(normalizedLocale).then((json) => {
        _locale = normalizedLocale;
        _translations = json;

        return resolve();
      });
    });
  }
};

export default Rosetta;
