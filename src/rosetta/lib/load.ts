import { Translations } from './types';

export default function load(locale: string): Promise<Translations> {
  const url = `locales/${locale}/messages.json`;

  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `${response.status}: Could not retrieve file at ${url}`
        );
      }

      return response.json();
    });
}
