import type {
  RefineThemedLayoutSiderProps as BaseRefineThemedLayoutSiderProps,
  RefineThemedLayoutHeaderProps,
  RefineThemedLayoutProps,
  RefineLayoutThemedTitleProps,
} from "@refinedev/ui-types";

type RefineThemedLayoutSiderProps = BaseRefineThemedLayoutSiderProps & {
  fixed?: boolean;
  width?: React.CSSProperties["width"];
  collapsedWidth?: React.CSSProperties["width"];
};

export type {
  RefineLayoutThemedTitleProps,
  RefineThemedLayoutSiderProps,
  RefineThemedLayoutHeaderProps,
  RefineThemedLayoutProps,
};
