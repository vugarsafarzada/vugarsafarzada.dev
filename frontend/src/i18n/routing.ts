export const routing = {
  locales: ["en", "ru", "az"],
  defaultLocale: "en",
} as const;

export type Locale = (typeof routing.locales)[number];

export const isLocale = (locale: string): locale is Locale =>
  routing.locales.includes(locale as Locale);
