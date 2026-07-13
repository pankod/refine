import React from "react";
import { Button } from "@chakra-ui/react";

type FilterButtonProps = {
  setFilters: () => void;
  children: React.ReactNode;
};

export const FilterButton: React.FC<FilterButtonProps> = ({
  setFilters,
  children,
}) => {
  return (
    <Button
      size={"md"}
      colorScheme="teal"
      variant="solid"
      onClick={() => setFilters()}
    >
      {children}
    </Button>
  );
};
