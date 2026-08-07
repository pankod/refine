import type { ReactNode } from "react";
import type { ConfigType } from "dayjs";
import type {
  RefineFieldBooleanProps,
  RefineFieldDateProps,
  RefineFieldEmailProps,
  RefineFieldFileProps,
  RefineFieldImageProps,
  RefineFieldMarkdownProps as BaseRefineFieldMarkdownProps,
  RefineFieldNumberProps,
  RefineFieldTagProps,
  RefineFieldTextProps,
  RefineFieldUrlProps,
} from "@refinedev/ui-types";
import type { ImageProps, TagProps } from "antd";
import type { AbstractTooltipProps } from "antd/lib/tooltip";
import type { TextProps } from "antd/lib/typography/Text";
import type { LinkProps } from "antd/lib/typography/Link";

export type BooleanFieldProps = RefineFieldBooleanProps<
  unknown,
  AbstractTooltipProps
>;

export type DateFieldProps = RefineFieldDateProps<ConfigType, TextProps>;

export type EmailFieldProps = RefineFieldEmailProps<ReactNode, LinkProps>;

export type FileFieldProps = RefineFieldFileProps<LinkProps>;

export type ImageFieldProps = RefineFieldImageProps<
  string | undefined,
  ImageProps,
  {
    imageTitle?: string;
  }
>;

export type RefineFieldMarkdownProps = BaseRefineFieldMarkdownProps<
  string | undefined
>;

export type NumberFieldProps = RefineFieldNumberProps<ReactNode, TextProps>;

export type TagFieldProps = RefineFieldTagProps<ReactNode, TagProps>;

export type TextFieldProps = RefineFieldTextProps<ReactNode, TextProps>;

export type UrlFieldProps = RefineFieldUrlProps<string | undefined, LinkProps>;
