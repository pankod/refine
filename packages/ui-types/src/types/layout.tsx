import type { TitleProps, LayoutProps } from "@refinedev/core";

export type SiderRenderProps = {
  /**
   * menu items created depending on the `resources` defined in `<Refine>` component.
   */
  items: React.JSX.Element[];
  /**
   * logout button if you have `authProvider` defined and the current session is authenticated.
   */
  logout: React.ReactNode;
  /**
   * Whether the sider is collapsed or not.
   */
  collapsed: boolean;
};

export type RefineLayoutSiderProps = {
  Title?: React.FC<TitleProps>;
  render?: (props: SiderRenderProps) => React.ReactNode;
  meta?: Record<string, unknown>;
};

export type RefineLayoutHeaderProps = {};

export type RefineLayoutFooterProps = {};

export type RefineLayoutTitleProps = TitleProps;

export type RefineLayoutLayoutProps = LayoutProps;

export type RefineLayoutThemedTitleProps = RefineLayoutTitleProps & {
  /**
   *
   * Icon element to be displayed in the title.
   *
   * Default: Refine Icon
   *
   * ![Refine](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgZGF0YS10ZXN0aWQ9InJlZmluZS1sb2dvIiBmaWxsPSJub25lIj48cGF0aCBmaWxsPSIjZmZmIiBkPSJNMCAwaDI0djI0SDB6Ii8+PHBhdGggZmlsbD0iIzAwMCIgZD0iTTEzLjguNGE0IDQgMCAwIDAtMy42IDBsLTggNEE0IDQgMCAwIDAgMCA4djhhNCA0IDAgMCAwIDIuMiAzLjZsOCA0YTQgNCAwIDAgMCAzLjYgMGw4LTRBNCA0IDAgMCAwIDI0IDE2VjhhNCA0IDAgMCAwLTIuMi0zLjZsLTgtNHpNOCA4YTQgNCAwIDEgMSA4IDB2OGE0IDQgMCAwIDEtOCAwVjh6IiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjxwYXRoIGZpbGw9IiMwMDAiIGQ9Ik0xNCA4YTIgMiAwIDEgMS00IDAgMiAyIDAgMCAxIDQgMHoiLz48L3N2Zz4=)
   */
  icon?: React.ReactNode;
  /**
   * Text to be displayed in the title.
   *
   * @default "Refine Project"
   */
  text?: React.ReactNode;
  wrapperStyles?: React.CSSProperties;
};

export type RefineThemedLayoutProps = {
  /**
   * Whether the sider is collapsed or not by default.
   */
  initialSiderCollapsed?: boolean;

  /**
   * Callback function triggered when the sider's collapsed state changes.
   */
  onSiderCollapsed?: (collapsed: boolean) => void;
} & RefineLayoutLayoutProps;
export type RefineThemedLayoutSiderProps = RefineLayoutSiderProps & {
  activeItemDisabled?: boolean;
  siderItemsAreCollapsed?: boolean;
};
export type RefineThemedLayoutHeaderProps = RefineLayoutHeaderProps & {
  sticky?: boolean;
};
