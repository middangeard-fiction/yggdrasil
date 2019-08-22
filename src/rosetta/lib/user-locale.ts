import { normalize, languageCode, find } from "./util";

declare global {
  interface Window {
    // IE navigator lanuage settings (non-standard)
    userLanguage: string;
    browserLanguage: string;
  }
}

export default function resolveUserLocale(
  supportedLocales: ReadonlyArray<string>,
): string | undefined {
  const userLocale = normalize(getUserLocale());

  const exactMatch = find(
    supportedLocales,
    (supported) => supported === userLocale,
  );

  if (exactMatch) { return exactMatch; }

  const userLanguageCode = languageCode(userLocale);

  const languageCodeMatch = find(
    supportedLocales,
    (supported) => languageCode(supported) === userLanguageCode,
  );

  if (languageCodeMatch) {
    return languageCodeMatch;
  }
}

export function getUserLocale(): string {
  return window.navigator.language || window.browserLanguage || window.userLanguage;
}
