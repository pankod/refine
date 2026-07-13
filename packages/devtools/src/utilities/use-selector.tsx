import React from "react";
import { DevToolsContext } from "@refinedev/devtools-shared";

import {
  filterInvisibleNodes,
  getUniqueNodes,
  traverseDom,
  type SelectableElement,
} from "./selector-helpers";

export const useSelector = (active: boolean) => {
  const { httpUrl } = React.useContext(DevToolsContext);
  const [selectableElements, setSelectableElements] = React.useState<
    SelectableElement[]
  >([]);

  const fetchTraceItems = React.useCallback(async () => {
    const response = await fetch(`${httpUrl}/api/unique-trace-items`);
    const data = await response.json();

    return data.data as string[];
  }, [httpUrl]);

  const prepareSelector = React.useCallback(async () => {
    const fetchedTraceItems = await fetchTraceItems();
    const traversedNodes = traverseDom(document.body, fetchedTraceItems);
    const filterInvisible = filterInvisibleNodes(traversedNodes);
    const uniqueNodes = getUniqueNodes(filterInvisible);

    setSelectableElements(uniqueNodes);
  }, [fetchTraceItems]);

  React.useEffect(() => {
    if (active) {
      prepareSelector();
    }
  }, [active, prepareSelector]);

  return {
    selectableElements,
  };
};
