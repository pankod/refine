import type { ReactNode } from "react";
import { useInvalidate, useList, useUpdate } from "@refinedev/core";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Tooltip,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { Modal } from "@/components/modal";
import {
  TimeOffStatus,
  TimeOffType,
  type Employee,
  type TimeOff,
} from "@/types";
import { RequestTypeIcon, ThumbsDownIcon, ThumbsUpIcon } from "@/icons";
import { useGetEmployeeTimeOffUsage } from "@/hooks/use-get-employee-time-off-usage";

type Props = {
  open: boolean;
  onClose: () => void;
  loading: boolean;
  onSuccess?: () => void;
  timeOff:
    | (TimeOff & {
        employee: Employee;
      })
    | null
    | undefined;
};

export const TimeOffRequestModal = ({
  open,
  timeOff,
  loading: loadingFromProps,
  onClose,
  onSuccess,
}: Props) => {
  const employeeUsedTimeOffs = useGetEmployeeTimeOffUsage({
    employeeId: timeOff?.employee.id,
  });

  const invalidate = useInvalidate();

  const { mutateAsync } = useUpdate<TimeOff>();

  const employee = timeOff?.employee;
  const duration =
    dayjs(timeOff?.endsAt).diff(dayjs(timeOff?.startsAt), "days") + 1;
  const remainingAnnualLeaveDays =
    (employee?.availableAnnualLeaveDays ?? 0) - duration;

  const {
    result: timeOffsData,
    query: { isLoading: timeOffsLoading },
  } = useList<TimeOff & { employee: Employee }>({
    resource: "time-offs",
    pagination: {
      pageSize: 999,
    },
    filters: [
      {
        field: "status",
        operator: "eq",
        value: TimeOffStatus.APPROVED,
      },
      {
        operator: "and",
        value: [
          {
            field: "startsAt",
            operator: "lte",
            value: timeOff?.endsAt,
          },
          {
            field: "endsAt",
            operator: "gte",
            value: timeOff?.startsAt,
          },
        ],
      },
    ],
    queryOptions: {
      enabled: !!timeOff,
    },
    meta: {
      join: ["employee"],
    },
  });
  const whoIsOutList = timeOffsData?.data || [];

  const handleSubmit = async (status: TimeOffStatus) => {
    await mutateAsync({
      resource: "time-offs",
      id: timeOff?.id,
      invalidates: ["resourceAll"],
      values: {
        status,
      },
    });

    onSuccess?.();
    invalidate({
      resource: "employees",
      invalidates: ["all"],
    });
  };

  const loading = timeOffsLoading || loadingFromProps;

  return (
    <Modal
      open={open}
      title="Time Off Request"
      loading={loading}
      sx={{
        maxWidth: "520px",
      }}
      onClose={onClose}
      footer={
        <>
          <Divider />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "8px",
              padding: "24px",
            }}
          >
            <Button
              sx={{
                backgroundColor: (theme) => theme.palette.error.light,
              }}
              startIcon={<ThumbsDownIcon />}
              onClick={() => handleSubmit(TimeOffStatus.REJECTED)}
            >
              Decline
            </Button>
            <Button
              sx={{
                backgroundColor: (theme) => theme.palette.success.light,
              }}
              onClick={() => handleSubmit(TimeOffStatus.APPROVED)}
              startIcon={<ThumbsUpIcon />}
            >
              Accept
            </Button>
          </Box>
        </>
      }
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          padding: "24px",
          backgroundColor: (theme) => theme.palette.grey[50],
          borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        }}
      >
        <Avatar
          src={employee?.avatarUrl}
          alt={employee?.firstName}
          sx={{
            width: "80px",
            height: "80px",
            marginRight: "24px",
          }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            variant="h2"
            fontSize="18px"
            lineHeight="28px"
            fontWeight="500"
          >
            {employee?.firstName} {employee?.lastName}
          </Typography>
          <Typography variant="caption">{employee?.jobTitle}</Typography>
          <Typography variant="caption">{employee?.role}</Typography>
        </Box>
      </Box>

      <Box
        sx={{
          padding: "24px",
        }}
      >
        <InfoRow
          loading={loading}
          label="Request Type"
          value={
            <Box
              component="span"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <RequestTypeIcon type={timeOff?.timeOffType} />
              <Typography variant="body2" component="span">
                {timeOff?.timeOffType} Leave
              </Typography>
            </Box>
          }
        />
        <Divider />
        <InfoRow
          loading={loading}
          label="Duration"
          value={`${duration > 1 ? `${duration} days` : `${duration} day`}`}
        />
        <Divider />
        <InfoRow
          loading={loading}
          label={
            {
              [TimeOffType.ANNUAL]: "Remaining Annual Leave Days",
              [TimeOffType.SICK]: "Previously Used Sick Leave Days",
              [TimeOffType.CASUAL]: "Previously Used Casual Leave Days",
            }[timeOff?.timeOffType ?? TimeOffType.ANNUAL]
          }
          value={
            {
              [TimeOffType.ANNUAL]: remainingAnnualLeaveDays,
              [TimeOffType.SICK]: employeeUsedTimeOffs.sickCount,
              [TimeOffType.CASUAL]: employeeUsedTimeOffs.casualCount,
            }[timeOff?.timeOffType ?? TimeOffType.ANNUAL]
          }
        />
        <Divider />
        <InfoRow
          loading={loading}
          label="Start Date"
          value={dayjs(timeOff?.startsAt).format("MMMM DD")}
        />
        <Divider />
        <InfoRow
          loading={loading}
          label="End Date"
          value={dayjs(timeOff?.endsAt).format("MMMM DD")}
        />

        <Divider />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            paddingY: "24px",
          }}
        >
          <Typography variant="body2" fontWeight={600}>
            Notes
          </Typography>
          <Typography
            variant="body2"
            sx={{
              height: "20px",
              fontStyle: timeOff?.notes ? "normal" : "italic",
            }}
          >
            {!loading && (timeOff?.notes || "No notes provided.")}
          </Typography>
        </Box>

        <Divider />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            paddingY: "24px",
          }}
        >
          <Typography variant="body2" fontWeight={600}>
            Who's out between these days?
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "8px",
            }}
          >
            {whoIsOutList.length ? (
              whoIsOutList.map((whoIsOut) => (
                <Tooltip
                  key={whoIsOut.id}
                  sx={{
                    "& .MuiTooltip-tooltip": {
                      background: "red",
                    },
                  }}
                  title={
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "2px",
                      }}
                    >
                      <Typography variant="body2">
                        {whoIsOut.employee.firstName}{" "}
                        {whoIsOut.employee.lastName}
                      </Typography>
                      <Typography variant="caption">
                        {whoIsOut.timeOffType} Leave
                      </Typography>
                      <Typography variant="caption">
                        {dayjs(whoIsOut.startsAt).format("MMMM DD")} -{" "}
                        {dayjs(whoIsOut.endsAt).format("MMMM DD")}
                      </Typography>
                    </Box>
                  }
                  placement="top"
                >
                  <Avatar
                    src={whoIsOut.employee.avatarUrl}
                    alt={whoIsOut.employee.firstName}
                    sx={{
                      width: "32px",
                      height: "32px",
                    }}
                  />
                </Tooltip>
              ))
            ) : (
              <Typography
                variant="body2"
                sx={{
                  height: "32px",
                  fontStyle: "italic",
                }}
              >
                {loading ? "" : "No one is out between these days."}
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

const InfoRow = ({
  label,
  value,
  loading,
}: { label: ReactNode; value: ReactNode; loading: boolean }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        paddingY: "24px",
        height: "72px",
      }}
    >
      <Typography variant="body2">{label}</Typography>
      <Typography variant="body2">{loading ? "" : value}</Typography>
    </Box>
  );
};
