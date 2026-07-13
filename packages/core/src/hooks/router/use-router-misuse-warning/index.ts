import { checkRouterPropMisuse } from "@definitions/helpers/check-router-prop-misuse";
import React from "react";
import type { RouterProvider } from "../../../contexts/router/types";

export const useRouterMisuseWarning = (value?: RouterProvider) => {
  const warned = React.useRef(false);

  React.useEffect(() => {
    if (warned.current === false) {
      if (value) {
        const warn = checkRouterPropMisuse(value);
        if (warn) {
          warned.current = true;
        }
      }
    }
  }, [value]);
};
