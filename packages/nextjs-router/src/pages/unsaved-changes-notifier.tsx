import React from "react";
import { useTranslate, useWarnAboutChange } from "@refinedev/core";
import { useRouter } from "next/router";

type UnsavedChangesNotifierProps = {
  translationKey?: string;
  message?: string;
};

export const UnsavedChangesNotifier: React.FC<UnsavedChangesNotifierProps> = ({
  translationKey = "warnWhenUnsavedChanges",
  message = "Are you sure you want to leave? You have unsaved changes.",
}) => {
  const translate = useTranslate();
  const router = useRouter();
  const { warnWhen, setWarnWhen } = useWarnAboutChange();

  const warnMessage = React.useMemo(() => {
    return translate(translationKey, message);
  }, [translationKey, message, translate]);

  const warnWhenListener = React.useCallback(
    (e: { preventDefault: () => void; returnValue: string }) => {
      e.preventDefault();

      e.returnValue = warnMessage;

      return e.returnValue;
    },
    [warnMessage],
  );

  React.useEffect(() => {
    if (warnWhen) {
      window.addEventListener("beforeunload", warnWhenListener);
    }

    return () => {
      window.removeEventListener("beforeunload", warnWhenListener);
    };
  }, [warnWhen, warnWhenListener]);

  React.useEffect(() => {
    const routeChangeStart = () => {
      if (warnWhen) {
        const allowTransition = window.confirm(warnMessage);
        if (allowTransition) {
          setWarnWhen?.(false);
        } else {
          router.events.emit("routeChangeError");
          throw "Abort route change due to unsaved changes prompt. Ignore this error.";
        }
      }
    };
    router.events.on("routeChangeStart", routeChangeStart);

    return () => router.events.off("routeChangeStart", routeChangeStart);
  }, [warnWhen, warnMessage, setWarnWhen]);

  return null;
};
