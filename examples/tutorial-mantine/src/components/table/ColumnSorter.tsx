import { ActionIcon } from "@mantine/core";
import {
  IconChevronDown,
  IconChevronUp,
  IconSelector,
} from "@tabler/icons-react";
import type { Column } from "@tanstack/react-table";

export const ColumnSorter: React.FC<{ column: Column<any, any> }> = ({
  column,
}) => {
  if (!column.getCanSort()) {
    return null;
  }

  const sorted = column.getIsSorted();

  return (
    <ActionIcon size="xs" onClick={column.getToggleSortingHandler()}>
      {!sorted && <IconSelector size={18} />}
      {sorted === "asc" && <IconChevronDown size={18} />}
      {sorted === "desc" && <IconChevronUp size={18} />}
    </ActionIcon>
  );
};
