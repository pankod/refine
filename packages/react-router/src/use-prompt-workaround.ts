/**
 * `useBlocker` and `usePrompt` is no longer part of react-router for the routers other than `DataRouter`.
 *
 * The previous workaround (<v6.4) was to use `block` function in `UNSAFE_NavigationContext` which is now removed.
 *
 * We're using a workaround from the gist https://gist.github.com/MarksCode/64e438c82b0b2a1161e01c88ca0d0355 with some modifications
 * Thanks to @MarksCode(https://github.com/MarksCode) for the workaround.
 */

import React from "react";
import { UNSAFE_NavigationContext as NavigationContext } from "react-router";

function useConfirmExit(confirmExit: () => boolean, when = true) {
  const { navigator } = React.useContext(NavigationContext);

  React.useEffect(() => {
    if (!when) {
      return;
    }

    const go = navigator.go;
    const push = navigator.push;

    navigator.push = (...args: Parameters<typeof push>) => {
      const result = confirmExit();
      if (result !== false) {
        push(...args);
      }
    };

    navigator.go = (...args: Parameters<typeof go>) => {
      const result = confirmExit();
      if (result !== false) {
        go(...args);
      }
    };

    return () => {
      navigator.push = push;
      navigator.go = go;
    };
  }, [navigator, confirmExit, when]);
}

export function usePrompt(
  message: string,
  when = true,
  onConfirm?: () => void,
) {
  const warnWhenListener = React.useCallback(
    (e: { preventDefault: () => void; returnValue: string }) => {
      e.preventDefault();

      e.returnValue = message;

      return e.returnValue;
    },
    [message],
  );

  React.useEffect(() => {
    if (when) {
      window.addEventListener("beforeunload", warnWhenListener);
    }

    return () => {
      window.removeEventListener("beforeunload", warnWhenListener);
    };
  }, [warnWhenListener, when]);

  const confirmExit = React.useCallback(() => {
    const confirm = window.confirm(message);
    if (confirm && onConfirm) {
      onConfirm();
    }
    return confirm;
  }, [message]);

  useConfirmExit(confirmExit, when);
}
