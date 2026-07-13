import { useCallback, useEffect, useState } from "react";
import { useTranslate, useUpdate } from "@refinedev/core";
import {
  type Action,
  createAction,
  Priority,
  useRegisterActions,
} from "@refinedev/kbar";
import CheckOutlined from "@mui/icons-material/CheckOutlined";
import CloseOutlined from "@mui/icons-material/CloseOutlined";

import type { IOrder } from "../../interfaces";

export const useOrderCustomKbarActions = (order?: IOrder): void => {
  const t = useTranslate();
  const canAcceptOrder = order?.status.text === "Pending";
  const canRejectOrder =
    order?.status.text === "Pending" ||
    order?.status.text === "Ready" ||
    order?.status.text === "On The Way";

  const [actions, setActions] = useState<Action[]>([]);
  const { mutate } = useUpdate({
    resource: "orders",
    id: order?.id,
  });

  const handleMutate = useCallback(
    (status: { id: number; text: string }) => {
      if (!order?.id) return;

      mutate({
        values: {
          status,
        },
      });
    },
    [mutate, order?.id],
  );

  useEffect(() => {
    const preActions: Action[] = [];
    if (canAcceptOrder) {
      preActions.push(
        createAction({
          name: t("buttons.accept"),
          icon: <CheckOutlined />,
          section: "actions",
          perform: () => {
            handleMutate({
              id: 2,
              text: "Ready",
            });
          },
          priority: Priority.HIGH,
        }),
      );
    }
    if (canRejectOrder) {
      preActions.push(
        createAction({
          name: t("buttons.reject"),
          icon: <CloseOutlined />,
          section: "actions",
          perform: () => {
            handleMutate({
              id: 5,
              text: "Cancelled",
            });
          },
          priority: Priority.HIGH,
        }),
      );
    }
    setActions(preActions);
  }, [t, canAcceptOrder, canRejectOrder, handleMutate]);

  useRegisterActions(actions, [actions]);
};
