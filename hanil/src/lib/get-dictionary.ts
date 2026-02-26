import 'server-only';

const dictionaries = {
  ko: () => import('@messages/ko.json').then((module) => module.default),
  ja: () => import('@messages/ja.json').then((module) => module.default),
  en: () => import('@messages/en.json').then((module) => module.default),
};

export const getDictionary = async (locale: string) => {
  return dictionaries[locale as keyof typeof dictionaries]?.() ?? dictionaries.ko();
};

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>;
