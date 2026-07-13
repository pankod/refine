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

import type { LoadingButtonProps } from "@mui/lab/LoadingButton";
import type { ButtonProps } from "@mui/material/Button";
import type { SvgIconProps } from "@mui/material/SvgIcon";

export type CloneButtonProps = RefineCloneButtonProps<
  ButtonProps,
  {
    svgIconProps?: SvgIconProps;
  }
>;

export type CreateButtonProps = RefineCreateButtonProps<
  ButtonProps,
  {
    svgIconProps?: SvgIconProps;
  }
>;

export type DeleteButtonProps = RefineDeleteButtonProps<
  ButtonProps,
  {
    /**
     * SVG icon props for the delete button
     */
    svgIconProps?: SvgIconProps;
  }
>;

export type EditButtonProps = RefineEditButtonProps<
  ButtonProps,
  {
    svgIconProps?: SvgIconProps;
  }
>;

export type ExportButtonProps = RefineExportButtonProps<
  LoadingButtonProps,
  {
    svgIconProps?: SvgIconProps;
  }
>;

export type ImportButtonProps = RefineImportButtonProps<
  ButtonProps,
  {
    inputProps: UseImportInputPropsType;
    svgIconProps?: SvgIconProps;
  }
>;

export type ListButtonProps = RefineListButtonProps<
  ButtonProps,
  {
    svgIconProps?: SvgIconProps;
  }
>;

export type RefreshButtonProps = RefineRefreshButtonProps<
  ButtonProps,
  {
    svgIconProps?: SvgIconProps;
  }
>;

export type SaveButtonProps = RefineSaveButtonProps<
  LoadingButtonProps,
  {
    svgIconProps?: SvgIconProps;
  }
>;

export type ShowButtonProps = RefineShowButtonProps<
  ButtonProps,
  {
    svgIconProps?: SvgIconProps;
  }
>;
