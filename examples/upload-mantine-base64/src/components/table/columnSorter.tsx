import { ActionIcon } from "@mantine/core";
import {
  IconChevronDown,
  IconSelector,
  IconChevronUp,
} from "@tabler/icons-react";

import type { ColumnButtonProps } from "../../interfaces";

export const ColumnSorter: React.FC<ColumnButtonProps> = ({ column }) => {
  if (!column.getCanSort()) {
    return null;
  }

  const sorted = column.getIsSorted();

  return (
    <ActionIcon
      size="xs"
      onClick={column.getToggleSortingHandler()}
      style={{
        transition: "transform 0.25s",
        transform: `rotate(${sorted === "asc" ? "180" : "0"}deg)`,
      }}
      variant={sorted ? "light" : "transparent"}
      color={sorted ? "primary" : "gray"}
    >
      {!sorted && <IconSelector size={18} />}
      {sorted === "asc" && <IconChevronDown size={18} />}
      {sorted === "desc" && <IconChevronUp size={18} />}
    </ActionIcon>
  );
};
