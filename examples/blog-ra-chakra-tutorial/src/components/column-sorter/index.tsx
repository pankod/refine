import { IconButton } from "@chakra-ui/react";
import {
  IconChevronDown,
  IconSelector,
  IconChevronUp,
} from "@tabler/icons-react";
import type { Column } from "@tanstack/react-table";

export const ColumnSorter: React.FC<{ column: Column<any, any> }> = ({
  column,
}) => {
  if (!column.getCanSort()) {
    return null;
  }

  const sorted = column.getIsSorted();

  const Icon = () => {
    if (!sorted) {
      return <IconSelector size={18} />;
    }

    if (sorted === "asc") {
      return <IconChevronDown size={18} />;
    }

    if (sorted === "desc") {
      return <IconChevronUp size={18} />;
    }

    return null;
  };

  return (
    <IconButton
      aria-label="Sort"
      size="xs"
      onClick={column.getToggleSortingHandler()}
      style={{
        transition: "transform 0.25s",
        transform: `rotate(${sorted === "asc" ? "180" : "0"}deg)`,
      }}
      icon={<Icon />}
    />
  );
};
