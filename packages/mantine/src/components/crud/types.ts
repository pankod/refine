import type {
  CreateButtonProps,
  DeleteButtonProps,
  EditButtonProps,
  ListButtonProps,
  RefreshButtonProps,
  SaveButtonProps,
} from "../buttons/types";
import type { BoxProps, CardProps, GroupProps } from "@mantine/core";
import type {
  RefineCrudCreateProps,
  RefineCrudEditProps,
  RefineCrudListProps,
  RefineCrudShowProps,
} from "@refinedev/ui-types";

export type ListProps = RefineCrudListProps<
  CreateButtonProps,
  GroupProps,
  CardProps,
  GroupProps,
  BoxProps
>;

export type ShowProps = RefineCrudShowProps<
  GroupProps,
  GroupProps,
  CardProps,
  GroupProps,
  BoxProps,
  {},
  EditButtonProps,
  DeleteButtonProps,
  RefreshButtonProps,
  ListButtonProps
>;

export type CreateProps = RefineCrudCreateProps<
  SaveButtonProps,
  GroupProps,
  GroupProps,
  CardProps,
  GroupProps,
  BoxProps
>;

export type EditProps = RefineCrudEditProps<
  SaveButtonProps,
  DeleteButtonProps,
  GroupProps,
  GroupProps,
  CardProps,
  GroupProps,
  BoxProps,
  {},
  RefreshButtonProps,
  ListButtonProps
>;
