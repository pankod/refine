import React from "react";

import { useTranslate } from "@hooks/i18n";

import type { BaseRecord, HttpError } from "../../contexts/data/types";
import type { AutoSaveIndicatorElements } from "../../hooks/form/types";
import type { UseUpdateReturnType } from "../../hooks/data/useUpdate";

export type AutoSaveIndicatorProps<
  TData extends BaseRecord = BaseRecord,
  TError extends HttpError = HttpError,
  TVariables = {},
> = {
  /**
   * The data returned by the update request.
   */
  data?: UseUpdateReturnType<TData, TError, TVariables>["mutation"]["data"];
  /**
   * The error returned by the update request.
   */
  error?: UseUpdateReturnType<TData, TError, TVariables>["mutation"]["error"];
  /**
   * The status of the update request.
   */
  status: UseUpdateReturnType<TData, TError, TVariables>["mutation"]["status"];

  /**
   * The elements to display for each status.
   */
  elements?: AutoSaveIndicatorElements;
};

export const AutoSaveIndicator: React.FC<AutoSaveIndicatorProps> = ({
  status,
  elements: {
    success = (
      <Message translationKey="autoSave.success" defaultMessage="saved" />
    ),
    error = (
      <Message
        translationKey="autoSave.error"
        defaultMessage="auto save failure"
      />
    ),
    loading = (
      <Message translationKey="autoSave.loading" defaultMessage="saving..." />
    ),
    idle = (
      <Message
        translationKey="autoSave.idle"
        defaultMessage="waiting for changes"
      />
    ),
  } = {},
}) => {
  switch (status) {
    case "success":
      return <>{success}</>;
    case "error":
      return <>{error}</>;
    case "pending":
      return <>{loading}</>;
    case "idle":
      return <>{idle}</>;
    default:
      return <>{idle}</>;
  }
};

const Message = ({
  translationKey,
  defaultMessage,
}: {
  translationKey: string;
  defaultMessage: string;
}) => {
  const translate = useTranslate();

  return <span>{translate(translationKey, defaultMessage)}</span>;
};
