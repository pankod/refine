import React, { useState } from "react";
import {
  Input,
  Menu,
  IconButton,
  MenuButton,
  MenuList,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { IconFilter, IconX, IconCheck } from "@tabler/icons-react";

import type { ColumnButtonProps } from "../../interfaces";

export const ColumnFilter: React.FC<ColumnButtonProps> = ({ column }) => {
  // eslint-disable-next-line
  const [state, setState] = useState(null as null | { value: any });

  if (!column.getCanFilter()) {
    return null;
  }

  const open = () =>
    setState({
      value: column.getFilterValue(),
    });

  const close = () => setState(null);

  // eslint-disable-next-line
  const change = (value: any) => setState({ value });

  const clear = () => {
    column.setFilterValue(undefined);
    close();
  };

  const save = () => {
    if (!state) return;
    column.setFilterValue(state.value);
    close();
  };

  const renderFilterElement = () => {
    // eslint-disable-next-line
    const FilterComponent = (column.columnDef?.meta as any)?.filterElement;

    if (!FilterComponent && !!state) {
      return (
        <Input
          borderRadius="md"
          size="sm"
          autoComplete="off"
          value={state.value}
          onChange={(e) => change(e.target.value)}
        />
      );
    }

    return (
      <FilterComponent
        value={state?.value}
        onChange={(e: any) => change(e.target.value)}
      />
    );
  };

  return (
    <Menu isOpen={!!state} onClose={close}>
      <MenuButton
        onClick={open}
        as={IconButton}
        aria-label="Options"
        icon={<IconFilter size="16" />}
        variant="ghost"
        size="xs"
      />
      <MenuList p="2">
        {!!state && (
          <VStack align="flex-start">
            {renderFilterElement()}
            <HStack spacing="1">
              <IconButton
                aria-label="Clear"
                size="sm"
                colorScheme="red"
                onClick={clear}
              >
                <IconX size={18} />
              </IconButton>
              <IconButton
                aria-label="Save"
                size="sm"
                onClick={save}
                colorScheme="green"
              >
                <IconCheck size={18} />
              </IconButton>
            </HStack>
          </VStack>
        )}
      </MenuList>
    </Menu>
  );
};
