import { useQueryClient } from "@tanstack/react-query";

import { useTranslate } from "../../i18n";
import { useInvalidate } from "../../invalidate";
import { useResourceParams } from "../../use-resource-params";
import { useKeys } from "../../useKeys";
import { pickDataProvider } from "../../../definitions";

import type { BaseKey } from "../../../contexts/data/types";

export type RefreshButtonProps = {
  resource?: string;
  id?: BaseKey;
  dataProviderName?: string;
  meta?: Record<string, unknown>;
};

export type RefreshButtonValues = {
  onClick: () => void;
  label: string;
  loading: boolean;
};

export function useRefreshButton(
  props: RefreshButtonProps,
): RefreshButtonValues {
  const translate = useTranslate();
  const { keys } = useKeys();

  const queryClient = useQueryClient();
  const invalidates = useInvalidate();

  const { identifier, id, resources } = useResourceParams({
    resource: props.resource,
    id: props.id,
  });

  const loading = !!queryClient.isFetching({
    queryKey: keys()
      .data(pickDataProvider(identifier, props.dataProviderName, resources))
      .resource(identifier)
      .action("one")
      .get(),
  });

  const onClick = () => {
    invalidates({
      id,
      invalidates: ["detail"],
      dataProviderName: props.dataProviderName,
      resource: identifier,
    });
  };

  const label = translate("buttons.refresh", "Refresh");

  return {
    onClick,
    label,
    loading,
  };
}
