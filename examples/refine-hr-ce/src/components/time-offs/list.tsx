import { useState } from "react";
import {
  type CrudFilters,
  type CrudSort,
  useDelete,
  useGetIdentity,
  useInfiniteList,
} from "@refinedev/core";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Popover,
  Typography,
} from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";
import dayjs from "dayjs";
import { DateField } from "@refinedev/mui";
import { Frame } from "@/components/frame";
import { LoadingOverlay } from "@/components/loading-overlay";
import { red } from "@/providers/theme-provider/colors";
import {
  AnnualLeaveIcon,
  CasualLeaveIcon,
  DeleteIcon,
  NoTimeOffIcon,
  SickLeaveIcon,
  ThreeDotsIcon,
  PopoverTipIcon,
} from "@/icons";
import { type Employee, TimeOffStatus, type TimeOff } from "@/types";

const variantMap = {
  Annual: {
    label: "Annual Leave",
    iconColor: "primary.700",
    iconBgColor: "primary.50",
    icon: <AnnualLeaveIcon width={16} height={16} />,
  },
  Sick: {
    label: "Sick Leave",
    iconColor: "#C2410C",
    iconBgColor: "#FFF7ED",
    icon: <SickLeaveIcon width={16} height={16} />,
  },
  Casual: {
    label: "Casual Leave",
    iconColor: "grey.700",
    iconBgColor: "grey.50",
    icon: <CasualLeaveIcon width={16} height={16} />,
  },
} as const;

type Props = {
  type: "upcoming" | "history" | "inReview";
};

export const TimeOffList = (props: Props) => {
  const { data: employee } = useGetIdentity<Employee>();

  const {
    query: { isLoading, fetchNextPage },

    result: { data, hasNextPage },
  } = useInfiniteList<TimeOff>({
    resource: "time-offs",
    sorters: sorters[props.type],
    filters: [
      ...filters[props.type],
      {
        field: "employeeId",
        operator: "eq",
        value: employee?.id,
      },
    ],
    queryOptions: {
      enabled: !!employee?.id,
    },
  });

  const timeOffHistory = data?.pages.flatMap((page) => page.data) || [];
  const hasData = isLoading || timeOffHistory.length !== 0;

  if (props.type === "inReview" && !hasData) {
    return null;
  }

  return (
    <Frame
      sx={(theme) => ({
        maxHeight: "362px",
        paddingBottom: 0,
        position: "relative",
        "&::after": {
          pointerEvents: "none",
          content: '""',
          position: "absolute",
          bottom: 0,
          left: "24px",
          right: "24px",
          width: "80%",
          height: "32px",
          background:
            "linear-gradient(180deg, rgba(255, 255, 255, 0), #FFFFFF)",
        },
        display: "flex",
        flexDirection: "column",
      })}
      sxChildren={{
        paddingRight: 0,
        paddingLeft: 0,
        flex: 1,
        overflow: "hidden",
      }}
      title={title[props.type]}
    >
      <LoadingOverlay loading={isLoading} sx={{ height: "100%" }}>
        {!hasData ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "24px",
              height: "180px",
            }}
          >
            <NoTimeOffIcon />
            <Typography variant="body2" color="text.secondary">
              {props.type === "history"
                ? "No time off used yet."
                : "No upcoming time offs scheduled."}
            </Typography>
          </Box>
        ) : (
          <Box
            id="scrollableDiv-timeOffHistory"
            sx={(theme) => ({
              maxHeight: "312px",
              height: "auto",
              [theme.breakpoints.up("lg")]: {
                height: "312px",
              },
              overflow: "auto",
              paddingLeft: "12px",
              paddingRight: "12px",
            })}
          >
            <InfiniteScroll
              dataLength={timeOffHistory.length}
              next={() => fetchNextPage()}
              hasMore={hasNextPage || false}
              endMessage={
                !isLoading &&
                hasData && (
                  <Box
                    sx={{
                      pt: timeOffHistory.length > 3 ? "40px" : "16px",
                    }}
                  />
                )
              }
              scrollableTarget="scrollableDiv-timeOffHistory"
              loader={
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    height: "100px",
                  }}
                >
                  <CircularProgress size={24} />
                </Box>
              }
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                {timeOffHistory.map((timeOff) => {
                  return (
                    <ListItem
                      timeOff={timeOff}
                      key={timeOff.id}
                      type={props.type}
                    />
                  );
                })}
              </Box>
            </InfiniteScroll>
          </Box>
        )}
      </LoadingOverlay>
    </Frame>
  );
};

const ListItem = ({
  timeOff,
  type,
}: { timeOff: TimeOff; type: Props["type"] }) => {
  const { mutateAsync: timeOffCancel } = useDelete<TimeOff>();

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [hovered, setHovered] = useState(false);

  const diffrenceOfDays =
    dayjs(timeOff.endsAt).diff(dayjs(timeOff.startsAt), "day") + 1;

  const isSameDay = dayjs(timeOff.startsAt).isSame(
    dayjs(timeOff.endsAt),
    "day",
  );

  return (
    <Box
      key={timeOff.id}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "16px",
        height: "64px",
        paddingLeft: "12px",
        paddingRight: "12px",
        borderRadius: "64px",
        backgroundColor: hovered ? "grey.50" : "transparent",
        transition: "background-color 0.2s",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: variantMap[timeOff.timeOffType].iconColor,
          backgroundColor: variantMap[timeOff.timeOffType].iconBgColor,
          width: "40px",
          height: "40px",
          borderRadius: "100%",
        }}
      >
        {variantMap[timeOff.timeOffType].icon}
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "4px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
          }}
        >
          {isSameDay ? (
            <DateField
              value={timeOff.startsAt}
              color="text.secondary"
              variant="caption"
              format="MMMM DD"
            />
          ) : (
            <>
              <DateField
                value={timeOff.startsAt}
                color="text.secondary"
                variant="caption"
                format="MMMM DD"
              />
              <Typography variant="caption" color="text.secondary">
                -
              </Typography>
              <DateField
                value={timeOff.endsAt}
                color="text.secondary"
                variant="caption"
                format="MMMM DD"
              />
            </>
          )}
        </Box>
        <Typography variant="body2">
          <span
            style={{
              fontWeight: 500,
            }}
          >
            {diffrenceOfDays} {diffrenceOfDays > 1 ? "days" : "day"} of{" "}
          </span>
          {variantMap[timeOff.timeOffType].label}
        </Typography>
      </Box>

      {hovered && (type === "inReview" || type === "upcoming") && (
        <IconButton
          onClick={(e) => setAnchorEl(e.currentTarget)}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "40px",
            height: "40px",
            marginLeft: "auto",
            backgroundColor: "white",
            borderRadius: "100%",
            color: "grey.400",
            border: (theme) => `1px solid ${theme.palette.grey[400]}`,
            flexShrink: 0,
          }}
        >
          <ThreeDotsIcon />
        </IconButton>
      )}

      <Popover
        id={timeOff.id.toString()}
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => {
          setAnchorEl(null);
          setHovered(false);
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        sx={{
          "& .MuiPaper-root": {
            overflow: "visible",
            borderRadius: "12px",
            border: (theme) => `1px solid ${theme.palette.grey[400]}`,
            boxShadow: "0px 0px 0px 4px rgba(222, 229, 237, 0.25)",
          },
        }}
      >
        <Button
          variant="text"
          onClick={async () => {
            await timeOffCancel({
              resource: "time-offs",
              id: timeOff.id,
              invalidates: ["all"],
              successNotification: () => {
                return {
                  type: "success",
                  message: "Time off request cancelled successfully.",
                };
              },
            });
          }}
          sx={{
            position: "relative",
            width: "200px",
            height: "56px",
            paddingLeft: "16px",
            color: red[900],
            display: "flex",
            gap: "12px",
            justifyContent: "flex-start",
            "&:hover": {
              backgroundColor: "transparent",
            },
          }}
        >
          <DeleteIcon />
          <Typography variant="body2">Cancel Request</Typography>

          <Box
            sx={{
              width: "40px",
              height: "16px",
              position: "absolute",
              top: "-2px",
              left: "calc(50% - 1px)",
              transform: "translate(-50%, -50%)",
            }}
          >
            <PopoverTipIcon />
          </Box>
        </Button>
      </Popover>
    </Box>
  );
};

const today = dayjs().toISOString();

const title: Record<Props["type"], string> = {
  history: "Time Off History",
  upcoming: "Upcoming Time Off",
  inReview: "In Review",
};

const filters: Record<Props["type"], CrudFilters> = {
  history: [
    {
      field: "status",
      operator: "eq",
      value: TimeOffStatus.APPROVED,
    },
    {
      field: "endsAt",
      operator: "lt",
      value: today,
    },
  ],
  upcoming: [
    {
      field: "status",
      operator: "eq",
      value: TimeOffStatus.APPROVED,
    },
    {
      field: "endsAt",
      operator: "gte",
      value: today,
    },
  ],
  inReview: [
    {
      field: "status",
      operator: "eq",
      value: TimeOffStatus.PENDING,
    },
  ],
};

const sorters: Record<Props["type"], CrudSort[]> = {
  history: [{ field: "startsAt", order: "desc" }],
  upcoming: [{ field: "endsAt", order: "asc" }],
  inReview: [{ field: "startsAt", order: "asc" }],
};
