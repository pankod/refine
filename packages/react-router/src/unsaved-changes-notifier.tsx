import React from "react";
import { useTranslate, useWarnAboutChange } from "@refinedev/core";
import { usePrompt } from "./use-prompt-workaround";
import { useLocation } from "react-router";

type UnsavedChangesNotifierProps = {
  translationKey?: string;
  message?: string;
};

export const UnsavedChangesNotifier: React.FC<UnsavedChangesNotifierProps> = ({
  translationKey = "warnWhenUnsavedChanges",
  message = "Are you sure you want to leave? You have unsaved changes.",
}) => {
  const translate = useTranslate();
  const { pathname } = useLocation();
  const { warnWhen, setWarnWhen } = useWarnAboutChange();

  React.useEffect(() => {
    return () => setWarnWhen?.(false);
  }, [pathname]);

  const warnMessage = React.useMemo(() => {
    return translate(translationKey, message);
  }, [translationKey, message, translate]);

  usePrompt(warnMessage, warnWhen, () => {
    setWarnWhen?.(false);
  });

  return null;
};
