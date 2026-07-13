type TranslateFunction = (
  key: string,
  options?: any,
  defaultMessage?: string,
) => string;

type ChangeLocaleFunction = (
  locale: string,
  options?: any,
) => Promise<any> | any;

type GetLocaleFunction = () => string;

export type I18nProvider = {
  translate: TranslateFunction;
  changeLocale: ChangeLocaleFunction;
  getLocale: GetLocaleFunction;
};

export interface II18nContext {
  i18nProvider?: I18nProvider;
}
