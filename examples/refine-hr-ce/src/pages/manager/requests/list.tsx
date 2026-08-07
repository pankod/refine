import type { PropsWithChildren, ReactNode } from "react";
import { useGo, useInfiniteList } from "@refinedev/core";
import { Box, Typography } from "@mui/material";
import dayjs from "dayjs";
import { Frame } from "@/components/frame";
import { PageHeader } from "@/components/layout/page-header";
import { RequestsListItem } from "@/components/requests/list-item";
import { RequestsList } from "@/components/requests/list";
import { indigo } from "@/providers/theme-provider/colors";
import { TimeOffIcon, RequestTypeIcon, NoTimeOffIcon } from "@/icons";
import { TimeOffStatus, type Employee, type TimeOff } from "@/types";

export const PageManagerRequestsList = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Box>
        <PageHeader title="Awaiting Requests" />
        <TimeOffsList />
      </Box>
      {children}
    </>
  );
};

const TimeOffsList = () => {
  const go = useGo();

  const {
    query: { isLoading: timeOffsLoading, fetchNextPage: timeOffsFetchNextPage },

    result: { data: timeOffsData, hasNextPage: timeOffsHasNextPage },
  } = useInfiniteList<
    TimeOff & {
      employee: Employee;
    }
  >({
    resource: "time-offs",
    filters: [
      { field: "status", operator: "eq", value: TimeOffStatus.PENDING },
    ],
    sorters: [{ field: "createdAt", order: "desc" }],
    meta: {
      join: ["employee"],
    },
  });

  const timeOffs = timeOffsData?.pages.flatMap((page) => page.data) || [];
  const totalCount = timeOffsData?.pages[0].total;

  return (
    <Frame
      title="Time off Requests"
      titleSuffix={
        !!totalCount &&
        totalCount > 0 && (
          <Box
            sx={{
              padding: "4px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minWidth: "24px",
              height: "24px",
              borderRadius: "4px",
              backgroundColor: indigo[100],
            }}
          >
            <Typography
              variant="caption"
              sx={{
                color: indigo[500],
                fontSize: "12px",
                lineHeight: "16px",
              }}
            >
              {totalCount}
            </Typography>
          </Box>
        )
      }
      icon={<TimeOffIcon width={24} height={24} />}
      sx={{
        flex: 1,
        paddingBottom: "0px",
      }}
      sxChildren={{
        padding: 0,
      }}
    >
      <RequestsList
        loading={timeOffsLoading}
        dataLength={timeOffs.length}
        hasMore={timeOffsHasNextPage || false}
        next={timeOffsFetchNextPage}
        scrollableTarget="scrollableDiv-timeOffs"
        noDataText="No time off requests right now."
        noDataIcon={<NoTimeOffIcon />}
      >
        {timeOffs.map((timeOff) => {
          const date = dayjs(timeOff.createdAt).fromNow();
          const fullName = `${timeOff.employee.firstName} ${timeOff.employee.lastName}`;
          const avatarURL = timeOff.employee.avatarUrl;
          const requestedDay =
            dayjs(timeOff.endsAt).diff(dayjs(timeOff.startsAt), "day") + 1;
          const description = `Requested ${requestedDay} ${
            requestedDay > 1 ? "days" : "day"
          } of time  ${timeOff.timeOffType.toLowerCase()} leave.`;

          return (
            <RequestsListItem
              key={timeOff.id}
              date={date}
              avatarURL={avatarURL}
              title={fullName}
              showTimeSince
              descriptionIcon={<RequestTypeIcon type={timeOff.timeOffType} />}
              description={description}
              onClick={() => {
                go({
                  type: "replace",
                  to: {
                    resource: "requests",
                    id: timeOff.id,
                    action: "edit",
                  },
                });
              }}
            />
          );
        })}
      </RequestsList>
    </Frame>
  );
};
