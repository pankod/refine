import type { ButtonProps } from "@chakra-ui/react";
import type { UseImportInputPropsType } from "@refinedev/core";
import type {
  RefineCloneButtonProps,
  RefineCreateButtonProps,
  RefineDeleteButtonProps,
  RefineEditButtonProps,
  RefineExportButtonProps,
  RefineImportButtonProps,
  RefineListButtonProps,
  RefineRefreshButtonProps,
  RefineSaveButtonProps,
  RefineShowButtonProps,
} from "@refinedev/ui-types";
import type { IconProps } from "@tabler/icons-react";

export type ShowButtonProps = Omit<
  RefineShowButtonProps<
    ButtonProps,
    {
      svgIconProps?: Omit<IconProps, "ref">;
    }
  >,
  "ignoreAccessControlProvider"
>;

export type SaveButtonProps = RefineSaveButtonProps<
  ButtonProps,
  {
    svgIconProps?: Omit<IconProps, "ref">;
  }
>;

export type RefreshButtonProps = RefineRefreshButtonProps<
  ButtonProps,
  {
    svgIconProps?: Omit<IconProps, "ref">;
  }
>;

export type ListButtonProps = Omit<
  RefineListButtonProps<
    ButtonProps,
    {
      svgIconProps?: Omit<IconProps, "ref">;
    }
  >,
  "ignoreAccessControlProvider"
>;

export type ImportButtonProps = RefineImportButtonProps<
  ButtonProps,
  {
    inputProps: UseImportInputPropsType;
    svgIconProps?: Omit<IconProps, "ref">;
  }
>;

export type ExportButtonProps = RefineExportButtonProps<
  ButtonProps,
  {
    svgIconProps?: Omit<IconProps, "ref">;
  }
>;

export type EditButtonProps = Omit<
  RefineEditButtonProps<
    ButtonProps,
    {
      svgIconProps?: Omit<IconProps, "ref">;
    }
  >,
  "ignoreAccessControlProvider"
>;

export type DeleteButtonProps = Omit<
  RefineDeleteButtonProps<
    ButtonProps,
    {
      svgIconProps?: Omit<IconProps, "ref">;
    }
  >,
  "ignoreAccessControlProvider"
>;

export type CloneButtonProps = Omit<
  RefineCloneButtonProps<
    ButtonProps,
    {
      svgIconProps?: Omit<IconProps, "ref">;
    }
  >,
  "ignoreAccessControlProvider"
>;

export type CreateButtonProps = Omit<
  RefineCreateButtonProps<
    ButtonProps,
    {
      svgIconProps?: Omit<IconProps, "ref">;
    }
  >,
  "ignoreAccessControlProvider"
>;
