import type { ReactNode } from "react";
import type {
  AnchorProps,
  ChipProps,
  TextProps,
  TooltipProps,
} from "@mantine/core";
import type {
  RefineFieldBooleanProps,
  RefineFieldDateProps,
  RefineFieldEmailProps,
  RefineFieldFileProps,
  RefineFieldMarkdownProps,
  RefineFieldNumberProps,
  RefineFieldTagProps,
  RefineFieldTextProps,
  RefineFieldUrlProps,
} from "@refinedev/ui-types";
import type { IconProps } from "@tabler/icons-react";
import type { ConfigType } from "dayjs";
import type { ReactMarkdownOptions } from "react-markdown";

export type BooleanFieldProps = RefineFieldBooleanProps<
  unknown,
  Omit<TooltipProps, "label" | "children">,
  { svgIconProps?: Omit<IconProps, "ref"> }
>;

export type DateFieldProps = RefineFieldDateProps<ConfigType, TextProps>;

export type EmailFieldProps = RefineFieldEmailProps<ReactNode, AnchorProps>;

export type FileFieldProps = RefineFieldFileProps<TextProps>;

export type MarkdownFieldProps = RefineFieldMarkdownProps<
  string | undefined,
  Partial<ReactMarkdownOptions>
>;

export type NumberFieldProps = RefineFieldNumberProps<ReactNode, TextProps>;

export type TagFieldProps = RefineFieldTagProps<
  ReactNode,
  Omit<ChipProps, "children">
>;

export type TextFieldProps = RefineFieldTextProps<ReactNode, TextProps>;

export type UrlFieldProps = RefineFieldUrlProps<
  string | undefined,
  AnchorProps & TextProps,
  {
    title?: string;
  }
>;
