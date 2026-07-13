import type { BoxProps, StackProps } from "@chakra-ui/react";
import type {
  CreateButtonProps,
  DeleteButtonProps,
  EditButtonProps,
  RefreshButtonProps,
  ListButtonProps,
  SaveButtonProps,
} from "../buttons/types";
import type {
  RefineCrudCreateProps,
  RefineCrudEditProps,
  RefineCrudListProps,
  RefineCrudShowProps,
} from "@refinedev/ui-types";

export type CreateProps = RefineCrudCreateProps<
  SaveButtonProps,
  BoxProps,
  BoxProps,
  StackProps,
  BoxProps,
  BoxProps
>;

export type EditProps = RefineCrudEditProps<
  SaveButtonProps,
  DeleteButtonProps,
  BoxProps,
  BoxProps,
  BoxProps,
  BoxProps,
  BoxProps,
  {},
  RefreshButtonProps,
  ListButtonProps
>;

export type ListProps = RefineCrudListProps<
  CreateButtonProps,
  BoxProps,
  BoxProps,
  BoxProps,
  BoxProps
>;

export type ShowProps = RefineCrudShowProps<
  BoxProps,
  BoxProps,
  BoxProps,
  BoxProps,
  BoxProps,
  {},
  EditButtonProps,
  DeleteButtonProps,
  RefreshButtonProps,
  ListButtonProps
>;
