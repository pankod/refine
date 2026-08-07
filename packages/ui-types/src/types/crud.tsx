import type { PropsWithChildren } from "react";
import type {
  AutoSaveIndicatorProps,
  BaseKey,
  MutationMode,
} from "@refinedev/core";

export type ActionButtonRenderer<
  TExtraProps extends {} = Record<keyof any, unknown>,
> =
  | ((
      context: { defaultButtons: React.ReactNode } & TExtraProps,
    ) => React.ReactNode)
  | React.ReactNode;

/**
 * This should be the base type for `List` crud component implementations in UI integrations.
 */
export type RefineCrudListProps<
  TCreateButtonProps extends {} = Record<keyof any, unknown>,
  THeaderButtonProps extends {} = Record<keyof any, unknown>,
  TWrapperProps extends {} = Record<keyof any, unknown>,
  THeaderProps extends {} = Record<keyof any, unknown>,
  TContentProps extends {} = Record<keyof any, unknown>,
  TExtraProps extends {} = {},
> = PropsWithChildren<{
  /**
   * Resource name for API data interactions
   * @default Reads `:resource` from the URL
   */
  resource?: string;
  /**
   * Title of the create view
   * @default Plural of the resource.name
   */
  title?: React.ReactNode;
  /**
   * Props for the wrapper component of the view
   */
  wrapperProps?: TWrapperProps;
  /**
   * Props for the header component
   */
  headerProps?: THeaderProps;
  /**
   * Props for the content wrapper component
   */
  contentProps?: TContentProps;
  /**
   * Breadcrumb to be displayed in the header
   * @default `<Breadcrumb />`
   */
  breadcrumb?: React.ReactNode;
  /**
   * Header action buttons to be displayed in the header
   * @default If `canCreate` is passed `<CreateButton />` otherwise `null`
   */
  headerButtons?: ActionButtonRenderer<{
    /**
     * Default `<CreateButton />` props
     */
    createButtonProps: TCreateButtonProps | undefined;
  }>;
  /**
   * Additional props to be passed to the wrapper of the header buttons
   */
  headerButtonProps?: THeaderButtonProps;
  /**
   * Adds create button
   * @default If the resource is passed a create component, `true` else `false`
   */
  canCreate?: boolean;
  /**
   * Adds props for create button
   */
  createButtonProps?: TCreateButtonProps;
}> &
  TExtraProps;

/**
 * This should be the base type for `Create` crud component implementations in UI integrations.
 */
export type RefineCrudCreateProps<
  TSaveButtonProps extends {} = Record<keyof any, unknown>,
  THeaderButtonProps extends {} = Record<keyof any, unknown>,
  TFooterButtonProps extends {} = Record<keyof any, unknown>,
  TWrapperProps extends {} = Record<keyof any, unknown>,
  THeaderProps extends {} = Record<keyof any, unknown>,
  TContentProps extends {} = Record<keyof any, unknown>,
  TExtraProps extends {} = {},
> = PropsWithChildren<{
  /**
   * Resource name for API data interactions
   * @default Reads `:resource` from the URL
   */
  resource?: string;
  /**
   * Title of the create view
   * @default Create {resource.name}
   */
  title?: React.ReactNode;
  /**
   * Props for the wrapper component of the view
   */
  wrapperProps?: TWrapperProps;
  /**
   * Props for the header component
   */
  headerProps?: THeaderProps;
  /**
   * Props for the content wrapper component
   */
  contentProps?: TContentProps;
  /**
   * Breadcrumb to be displayed in the header
   * @default `<Breadcrumb />`
   */
  breadcrumb?: React.ReactNode;
  /**
   * Back button element at the top left of the page
   */
  goBack?: React.ReactNode;
  /**
   * Header action buttons to be displayed in the header
   * @default `null`
   */
  headerButtons?: ActionButtonRenderer;
  /**
   * Additional props to be passed to the wrapper of the header buttons
   */
  headerButtonProps?: THeaderButtonProps;
  /**
   * Footer action buttons to be displayed in the footer
   * @default `<SaveButton />`
   */
  footerButtons?: ActionButtonRenderer<{
    /**
     * Default `<SaveButton />` props
     */
    saveButtonProps: TSaveButtonProps | undefined;
  }>;
  /**
   * Additional props to be passed to the wrapper of the footer buttons
   */
  footerButtonProps?: TFooterButtonProps;
  /**
   * Loading state of the component
   */
  isLoading?: boolean;
  /**
   * Additional props for the `<SaveButton />` component
   */
  saveButtonProps?: TSaveButtonProps;
}> &
  TExtraProps;

/**
 * This should be the base type for `Edit` crud component implementations in UI integrations.
 */
export type RefineCrudEditProps<
  TSaveButtonProps extends {} = Record<keyof any, unknown>,
  TDeleteButtonProps extends {} = Record<keyof any, unknown>,
  THeaderButtonProps extends {} = Record<keyof any, unknown>,
  TFooterButtonProps extends {} = Record<keyof any, unknown>,
  TWrapperProps extends {} = Record<keyof any, unknown>,
  THeaderProps extends {} = Record<keyof any, unknown>,
  TContentProps extends {} = Record<keyof any, unknown>,
  TExtraProps extends {} = {},
  TRefreshButtonProps extends {} = Record<keyof any, unknown>,
  TListButtonProps extends {} = Record<keyof any, unknown>,
> = PropsWithChildren<{
  /**
   * Resource name for API data interactions
   * @default Reads `:resource` from the URL
   */
  resource?: string;
  /**
   * Title of the edit view
   * @default Edit {resource.name}
   */
  title?: React.ReactNode;
  /**
   * Props for the wrapper component of the view
   */
  wrapperProps?: TWrapperProps;
  /**
   * Props for the header component
   */
  headerProps?: THeaderProps;
  /**
   * Props for the content wrapper component
   */
  contentProps?: TContentProps;
  /**
   * Breadcrumb to be displayed in the header
   * @default `<Breadcrumb />`
   */
  breadcrumb?: React.ReactNode;
  /**
   * Back button element at the top left of the page
   */
  goBack?: React.ReactNode;
  /**
   * Header action buttons to be displayed in the header
   * @default If `recordItemId` is passed `<RefreshButton />` otherwise `<RefreshButton /> <ListButton />`
   */
  headerButtons?: ActionButtonRenderer<{
    /**
     * Default `<RefreshButton />` props
     */
    refreshButtonProps: TRefreshButtonProps | undefined;
    /**
     * Default `<ListButton />` props
     */
    listButtonProps: TListButtonProps | undefined;
  }>;
  /**
   * Additional props to be passed to the wrapper of the header buttons
   */
  headerButtonProps?: THeaderButtonProps;
  /**
   * Footer action buttons to be displayed in the footer
   * @default If `canDelete` is passed `<SaveButton /> <DeleteButton />` otherwise `<SaveButton />`
   */
  footerButtons?: ActionButtonRenderer<{
    /**
     * Default `<DeleteButton />` props
     */
    deleteButtonProps: TDeleteButtonProps | undefined;
    /**
     * Default `<SaveButton />` props
     */
    saveButtonProps: TSaveButtonProps | undefined;
  }>;
  /**
   * Additional props to be passed to the wrapper of the footer buttons
   */
  footerButtonProps?: TFooterButtonProps;
  /**
   * To specify a data provider other than default use this property
   */
  dataProviderName?: string;
  /**
   * Loading state of the component
   * @default `false`
   */
  isLoading?: boolean;
  /**
   * Adds a `<DeleteButton />`
   * @default If the resource has `canDelete` prop it is `true` else `false`
   */
  canDelete?: boolean;
  /**
   * Additional props for the `<SaveButton />` component
   */
  saveButtonProps?: TSaveButtonProps;
  /**
   * Adds properties for `<DeleteButton />`
   */
  deleteButtonProps?: TDeleteButtonProps;
  /**
   * [Determines when mutations are executed](/docs/advanced-tutorials/mutation-mode/)
   * @default `"pessimistic"`\*
   */
  mutationMode?: MutationMode;
  /**
   *  The record id for `<RefreshButton>`
   */
  recordItemId?: BaseKey;
  /**
   * Show <AutoSaveIndicator /> component on header buttons
   */
  autoSaveProps?: AutoSaveIndicatorProps;
}> &
  TExtraProps;

/**
 * This should be the base type for `Show` crud component implementations in UI integrations.
 */
export type RefineCrudShowProps<
  THeaderButtonProps extends {} = Record<keyof any, unknown>,
  TFooterButtonProps extends {} = Record<keyof any, unknown>,
  TWrapperProps extends {} = Record<keyof any, unknown>,
  THeaderProps extends {} = Record<keyof any, unknown>,
  TContentProps extends {} = Record<keyof any, unknown>,
  TExtraProps extends {} = {},
  TEditButtonProps extends {} = Record<keyof any, unknown>,
  TDeleteButtonProps extends {} = Record<keyof any, unknown>,
  TRefreshButtonProps extends {} = Record<keyof any, unknown>,
  TListButtonProps extends {} = Record<keyof any, unknown>,
> = PropsWithChildren<{
  /**
   * Resource name for API data interactions
   * @default Reads `:resource` from the URL
   */
  resource?: string;
  /**
   * Title of the edit view
   * @default Show {resource.name}
   */
  title?: React.ReactNode;
  /**
   * Props for the wrapper component of the view
   */
  wrapperProps?: TWrapperProps;
  /**
   * Props for the header component
   */
  headerProps?: THeaderProps;
  /**
   * Props for the content wrapper component
   */
  contentProps?: TContentProps;
  /**
   * Breadcrumb to be displayed in the header
   * @default `<Breadcrumb />`
   */
  breadcrumb?: React.ReactNode;
  /**
   * Back button element at the top left of the page
   */
  goBack?: React.ReactNode;
  /**
   * Header action buttons to be displayed in the header
   */
  headerButtons?: ActionButtonRenderer<{
    /**
     * Default `<EditButton />` props
     */
    editButtonProps: TEditButtonProps | undefined;
    /**
     * Default `<DeleteButton />` props
     */
    deleteButtonProps: TDeleteButtonProps | undefined;
    /**
     * Default `<RefreshButton />` props
     */
    refreshButtonProps: TRefreshButtonProps | undefined;
    /**
     * Default `<ListButton />` props
     */
    listButtonProps: TListButtonProps | undefined;
  }>;
  /**
   * Additional props to be passed to the wrapper of the header buttons
   */
  headerButtonProps?: THeaderButtonProps;
  /**
   * Footer action buttons to be displayed in the footer
   * @default `null`
   */
  footerButtons?: ActionButtonRenderer;
  /**
   * Additional props to be passed to the wrapper of the footer buttons
   */
  footerButtonProps?: TFooterButtonProps;
  /**
   * To specify a data provider other than default use this property
   */
  dataProviderName?: string;
  /**
   * Loading state of the component
   */
  isLoading?: boolean;
  /**
   * Adds a `<DeleteButton />`
   * @default If the resource has `canDelete` prop it is `true` else `false`
   */
  canDelete?: boolean;
  /**
   * Adds properties for `<DeleteButton />`
   */
  deleteButtonProps?: TDeleteButtonProps;
  /**
   * Adds a `<EditButton />`
   * @default If the resource is passed a edit component, `true` else `false`
   */
  canEdit?: boolean;
  /**
   * The record id for `<RefreshButton />`
   */
  recordItemId?: BaseKey;
}> &
  TExtraProps;
