import type { ReactNode } from "react";
import type {
  LinkProps,
  TagProps,
  TextProps,
  TooltipProps,
} from "@chakra-ui/react";
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

export type BooleanFieldProps = RefineFieldBooleanProps<
  unknown,
  Omit<TooltipProps, "label" | "children">,
  { svgIconProps?: Omit<IconProps, "ref"> }
>;

export type DateFieldProps = RefineFieldDateProps<ConfigType, TextProps>;

export type EmailFieldProps = RefineFieldEmailProps<ReactNode, LinkProps>;

export type FileFieldProps = RefineFieldFileProps<LinkProps>;

export type MarkdownFieldProps = RefineFieldMarkdownProps<string | undefined>;

export type NumberFieldProps = RefineFieldNumberProps<ReactNode, TextProps>;

export type TagFieldProps = RefineFieldTagProps<ReactNode, TagProps>;

export type TextFieldProps = RefineFieldTextProps<ReactNode, TextProps>;

export type UrlFieldProps = RefineFieldUrlProps<
  string | undefined,
  LinkProps,
  {
    title?: string;
  }
>;
