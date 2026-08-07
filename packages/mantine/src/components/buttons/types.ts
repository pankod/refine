import type { ButtonProps } from "@mantine/core";
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

type CommonButtonProps = {
  hidden?: boolean;
  svgIconProps?: Omit<IconProps, "ref">;
};

export type ShowButtonProps = RefineShowButtonProps<
  ButtonProps,
  CommonButtonProps
>;

export type SaveButtonProps = RefineSaveButtonProps<
  ButtonProps,
  CommonButtonProps
>;

export type RefreshButtonProps = RefineRefreshButtonProps<
  ButtonProps,
  CommonButtonProps
>;

export type ListButtonProps = RefineListButtonProps<
  ButtonProps,
  CommonButtonProps
>;

export type ImportButtonProps = RefineImportButtonProps<
  ButtonProps,
  CommonButtonProps & {
    inputProps: UseImportInputPropsType;
  }
>;

export type ExportButtonProps = RefineExportButtonProps<
  ButtonProps,
  CommonButtonProps
>;

export type EditButtonProps = RefineEditButtonProps<
  ButtonProps,
  CommonButtonProps
>;

export type DeleteButtonProps = RefineDeleteButtonProps<
  ButtonProps,
  CommonButtonProps
>;

export type CreateButtonProps = RefineCreateButtonProps<
  ButtonProps,
  CommonButtonProps
>;

export type CloneButtonProps = RefineCloneButtonProps<
  ButtonProps,
  CommonButtonProps
>;
