import { useList } from "@refinedev/core";
import { type TimeOff, TimeOffStatus, TimeOffType } from "@/types";
import { useMemo } from "react";
import dayjs from "dayjs";

export const useGetEmployeeTimeOffUsage = ({
  employeeId,
}: { employeeId?: number }) => {
  const migratedMigratedMigratedMigratedMigratedMigratedQuery =
    useList<TimeOff>({
      resource: "time-offs",
      pagination: { pageSize: 999 },
      filters: [
        {
          field: "status",
          operator: "eq",
          value: TimeOffStatus.APPROVED,
        },
        {
          field: "employeeId",
          operator: "eq",
          value: employeeId,
        },
      ],
      queryOptions: {
        enabled: !!employeeId,
      },
    });

  const migratedMigratedMigratedMigratedMigratedQuery = {
    ...migratedMigratedMigratedMigratedMigratedMigratedQuery.result,
    ...migratedMigratedMigratedMigratedMigratedMigratedQuery.query,
    ...migratedMigratedMigratedMigratedMigratedMigratedQuery,
  };

  const migratedMigratedMigratedMigratedQuery = {
    ...migratedMigratedMigratedMigratedMigratedQuery.result,
    ...migratedMigratedMigratedMigratedMigratedQuery.query,
    ...migratedMigratedMigratedMigratedMigratedQuery,
  };

  const migratedMigratedMigratedQuery = {
    ...migratedMigratedMigratedMigratedQuery.result,
    ...migratedMigratedMigratedMigratedQuery.query,
    ...migratedMigratedMigratedMigratedQuery,
  };

  const migratedMigratedQuery = {
    ...migratedMigratedMigratedQuery.result,
    ...migratedMigratedMigratedQuery.query,
    ...migratedMigratedMigratedQuery,
  };

  const migratedQuery = {
    ...migratedMigratedQuery.result,
    ...migratedMigratedQuery.query,
    ...migratedMigratedQuery,
  };

  const query = {
    ...migratedQuery.result,
    ...migratedQuery.query,
    ...migratedQuery,
  };

  const data = query?.data?.data;

  const { sick, casual, annual, sickCount, casualCount, annualCount } =
    useMemo(() => {
      const sick: TimeOff[] = [];
      const casual: TimeOff[] = [];
      const annual: TimeOff[] = [];
      let sickCount = 0;
      let casualCount = 0;
      let annualCount = 0;

      data?.forEach((timeOff) => {
        const duration =
          dayjs(timeOff.endsAt).diff(dayjs(timeOff.startsAt), "days") + 1;

        if (timeOff.timeOffType === TimeOffType.SICK) {
          sick.push(timeOff);
          sickCount += duration;
        } else if (timeOff.timeOffType === TimeOffType.CASUAL) {
          casual.push(timeOff);
          casualCount += duration;
        } else if (timeOff.timeOffType === TimeOffType.ANNUAL) {
          annual.push(timeOff);
          annualCount += duration;
        }
      });

      return {
        sick,
        casual,
        annual,
        sickCount,
        casualCount,
        annualCount,
      };
    }, [data]);

  return {
    query,
    sick,
    casual,
    annual,
    sickCount,
    casualCount,
    annualCount,
  };
};
