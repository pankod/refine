import type { ReactNode } from "react";
import type { ConfigType } from "dayjs";

export type RefineFieldCommonProps<T = unknown> = {
  /**
   * The value of the field.
   */
  value: T;
};

export type RefineFieldTooltipProps = {
  children?: React.ReactElement;
  title?: NonNullable<React.ReactNode>;
};

export type RefineFieldBooleanProps<
  TValueType = boolean,
  TComponentProps extends {} = {},
  TExtraProps extends {} = {},
> = RefineFieldCommonProps<TValueType> &
  RefineFieldTooltipProps &
  TComponentProps &
  TExtraProps & {
    /**
     * If there is a value, this is the text to use.
     */
    valueLabelTrue?: string;
    /**
     * If there no value, this is the text to use.
     */
    valueLabelFalse?: string;
    /**
     * If there is a value, this is the icon to use.
     */
    trueIcon?: ReactNode;
    /**
     * If there is no value, this is the icon to use.
     */
    falseIcon?: ReactNode;
  };

export type RefineFieldDateProps<
  TValueType = ConfigType,
  TComponentProps extends {} = {},
  TExtraProps extends {} = {},
> = RefineFieldCommonProps<TValueType> &
  TComponentProps &
  TExtraProps & {
    /**
     * The locales of the date.
     * By default, Day.js comes with English locale only. If you need other locales, you can load them on demand.
     * [Refer to loading locales](https://day.js.org/docs/en/i18n/loading-into-browser)
     * @default English
     */
    locales?: string;
    /**
     * Gets the formatted date according to the string of the tokens passed in.
     */
    format?: string;
  };

export type RefineFieldEmailProps<
  TValueType = React.ReactNode,
  TComponentProps extends {} = {},
  TExtraProps extends {} = {},
> = RefineFieldCommonProps<TValueType> & TComponentProps & TExtraProps & {};

export type RefineFieldFileProps<
  TComponentProps extends {} = {},
  TExtraProps extends {} = {},
> = TComponentProps &
  TExtraProps & {
    /**
     * Used for file title
     * @default The `src` property
     */
    title?: string;
    /**
     * Used for file path
     */
    src: string;
  };

export type RefineFieldImageProps<
  TValueType = string | undefined,
  TComponentProps extends {} = {},
  TExtraProps extends {} = {},
> = RefineFieldCommonProps<TValueType> & TComponentProps & TExtraProps & {};

export type RefineFieldMarkdownProps<
  TValueType = string | undefined,
  TComponentProps extends {} = {},
  TExtraProps extends {} = {},
> = RefineFieldCommonProps<TValueType> & TComponentProps & TExtraProps & {};

export type RefineFieldNumberProps<
  TValueType = React.ReactNode,
  TComponentProps extends {} = {},
  TExtraProps extends {} = {},
> = RefineFieldCommonProps<TValueType> &
  TComponentProps &
  TExtraProps & {
    /**
     * Override the browser locale in the date formatting. Passed as first argument to [`Intl.NumberFormat()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat)
     */
    locale?: string | string[];
    /**
     * Number formatting options. Passed as second argument to [`Intl.NumberFormat()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat)
     */
    options?: Intl.NumberFormatOptions;
  };

export type RefineFieldTagProps<
  TValueType = React.ReactNode,
  TComponentProps extends {} = {},
  TExtraProps extends {} = {},
> = RefineFieldCommonProps<TValueType> & TComponentProps & TExtraProps & {};

export type RefineFieldTextProps<
  TValueType = React.ReactNode,
  TComponentProps extends {} = {},
  TExtraProps extends {} = {},
> = RefineFieldCommonProps<TValueType> & TComponentProps & TExtraProps & {};

export type RefineFieldUrlProps<
  TValueType = string | undefined,
  TComponentProps extends {} = {},
  TExtraProps extends {} = {},
> = RefineFieldCommonProps<TValueType> & TComponentProps & TExtraProps & {};
