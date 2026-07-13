import type { CardProps, SpaceProps } from "antd";
import type {
  CreateButtonProps,
  DeleteButtonProps,
  EditButtonProps,
  ListButtonProps,
  RefreshButtonProps,
  SaveButtonProps,
} from "../buttons/types";
import type {
  RefineCrudCreateProps,
  RefineCrudEditProps,
  RefineCrudListProps,
  RefineCrudShowProps,
} from "@refinedev/ui-types";
import type { PageHeaderProps } from "../pageHeader";

export type CreateProps = RefineCrudCreateProps<
  SaveButtonProps,
  SpaceProps,
  SpaceProps,
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  PageHeaderProps,
  CardProps
>;

export type EditProps = RefineCrudEditProps<
  SaveButtonProps,
  DeleteButtonProps,
  SpaceProps,
  SpaceProps,
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  PageHeaderProps,
  CardProps,
  {},
  RefreshButtonProps,
  ListButtonProps
>;

export type ListProps = RefineCrudListProps<
  CreateButtonProps,
  SpaceProps,
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  PageHeaderProps,
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
>;

export type ShowProps = RefineCrudShowProps<
  SpaceProps,
  SpaceProps,
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  PageHeaderProps,
  CardProps,
  {},
  EditButtonProps,
  DeleteButtonProps,
  RefreshButtonProps,
  ListButtonProps
>;
