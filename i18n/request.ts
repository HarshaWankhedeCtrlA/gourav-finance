import {getRequestConfig} from 'next-intl/server';
import {routing} from './routing';
import {hasLocale} from 'next-intl';

export default getRequestConfig(async ({requestLocale}) => {
  // Read the locale from the request
  let locale = await requestLocale;

  // Validate the locale
  if (!locale || !hasLocale(routing.locales, locale)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});