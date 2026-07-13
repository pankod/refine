import type {
  RefineThemedLayoutSiderProps as BaseRefineThemedLayoutSiderProps,
  RefineThemedLayoutHeaderProps,
  RefineThemedLayoutProps,
  RefineLayoutThemedTitleProps,
} from "@refinedev/ui-types";

type RefineThemedLayoutSiderProps = BaseRefineThemedLayoutSiderProps & {
  fixed?: boolean;
};

export type {
  RefineLayoutThemedTitleProps,
  RefineThemedLayoutSiderProps,
  RefineThemedLayoutHeaderProps,
  RefineThemedLayoutProps,
};
