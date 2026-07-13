import type { ButtonProps, UploadProps } from "antd";
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

export type ShowButtonProps = RefineShowButtonProps<ButtonProps>;

export type CloneButtonProps = RefineCloneButtonProps<ButtonProps>;

export type CreateButtonProps = RefineCreateButtonProps<ButtonProps>;

export type DeleteButtonProps = RefineDeleteButtonProps<ButtonProps>;

export type EditButtonProps = RefineEditButtonProps<ButtonProps>;

export type ExportButtonProps = RefineExportButtonProps<ButtonProps>;

export type ImportButtonProps = RefineImportButtonProps & {
  /**
   * Sets the button type
   * @type [UploadProps](https://ant.design/components/upload/#API)
   */
  uploadProps: UploadProps;
  /**
   * Sets props of the button
   * @type [ButtonProps](https://ant.design/components/button/#API)
   */
  buttonProps: ButtonProps;
};

export type ListButtonProps = RefineListButtonProps<ButtonProps>;

export type RefreshButtonProps = RefineRefreshButtonProps<ButtonProps>;

export type SaveButtonProps = RefineSaveButtonProps<ButtonProps>;
