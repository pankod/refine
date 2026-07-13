import { useGo, useShow } from "@refinedev/core";
import { TimeOffRequestModal } from "@/components/requests/time-off-request-modal";
import type { Employee, TimeOff } from "@/types";

export const PageManagerRequestsTimeOffsEdit = () => {
  const go = useGo();

  const { query: timeOffRequestQuery } = useShow<
    TimeOff & { employee: Employee }
  >({
    meta: {
      join: ["employee"],
    },
  });

  const loading = timeOffRequestQuery.isLoading;

  return (
    <TimeOffRequestModal
      open
      loading={loading}
      timeOff={timeOffRequestQuery?.data?.data}
      onClose={() =>
        go({
          to: {
            resource: "requests",
            action: "list",
          },
        })
      }
      onSuccess={() => {
        go({
          to: {
            resource: "requests",
            action: "list",
          },
        });
      }}
    />
  );
};
