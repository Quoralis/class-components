import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'sr'],
  defaultLocale: 'en',
  pathnames: {
    '/': '/',
    '/about': {
      en: '/about',
      sr: '/o-aplikaciji',
    },
    '/results': {
      en: '/results',
      sr: '/rezultati',
    },
  },
});

export type Locale = (typeof routing.locales)[number];
