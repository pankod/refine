import { IconButton } from "@chakra-ui/react";
import {
  IconChevronDown,
  IconSelector,
  IconChevronUp,
} from "@tabler/icons-react";

import type { ColumnButtonProps } from "../../interfaces";
import type { SortDirection } from "@tanstack/react-table";

export const ColumnSorter: React.FC<ColumnButtonProps> = ({ column }) => {
  if (!column.getCanSort()) {
    return null;
  }

  const sorted = column.getIsSorted();

  return (
    <IconButton
      aria-label="Sort"
      size="xs"
      onClick={column.getToggleSortingHandler()}
      icon={<ColumnSorterIcon sorted={sorted} />}
      variant={sorted ? "light" : "transparent"}
      color={sorted ? "primary" : "gray"}
    />
  );
};

const ColumnSorterIcon = ({ sorted }: { sorted: false | SortDirection }) => {
  if (sorted === "asc") return <IconChevronDown size={18} />;
  if (sorted === "desc") return <IconChevronUp size={18} />;
  return <IconSelector size={18} />;
};
