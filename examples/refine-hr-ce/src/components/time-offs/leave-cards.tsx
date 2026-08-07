import { useGetIdentity, useList } from "@refinedev/core";
import { Box, Skeleton, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { AnnualLeaveIcon, CasualLeaveIcon, SickLeaveIcon } from "@/icons";
import {
  type Employee,
  TimeOffStatus,
  TimeOffType,
  type TimeOff,
} from "@/types";

export const TimeOffLeaveCards = () => {
  const { data: employee, isLoading: isLoadingEmployee } =
    useGetIdentity<Employee>();

  const {
    result: timeOffsSick,
    query: { isLoading: isLoadingTimeOffsSick },
  } = useList<TimeOff>({
    resource: "time-offs",
    // we only need total number of sick leaves, so we can set pageSize to 1 to reduce the load
    pagination: { pageSize: 1 },
    filters: [
      {
        field: "status",
        operator: "eq",
        value: TimeOffStatus.APPROVED,
      },
      {
        field: "timeOffType",
        operator: "eq",
        value: TimeOffType.SICK,
      },
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

  const {
    result: timeOffsCasual,
    query: { isLoading: isLoadingTimeOffsCasual },
  } = useList<TimeOff>({
    resource: "time-offs",
    // we only need total number of sick leaves, so we can set pageSize to 1 to reduce the load
    pagination: { pageSize: 1 },
    filters: [
      {
        field: "status",
        operator: "eq",
        value: TimeOffStatus.APPROVED,
      },
      {
        field: "timeOffType",
        operator: "eq",
        value: TimeOffType.CASUAL,
      },
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

  const loading =
    isLoadingEmployee || isLoadingTimeOffsSick || isLoadingTimeOffsCasual;

  return (
    <Grid container spacing="24px">
      <Grid
        size={{
          xs: 12,
          sm: 4,
        }}
      >
        <Card
          loading={loading}
          type="annual"
          value={employee?.availableAnnualLeaveDays || 0}
        />
      </Grid>
      <Grid
        size={{
          xs: 12,
          sm: 4,
        }}
      >
        <Card loading={loading} type="sick" value={timeOffsSick?.total || 0} />
      </Grid>
      <Grid
        size={{
          xs: 12,
          sm: 4,
        }}
      >
        <Card
          loading={loading}
          type="casual"
          value={timeOffsCasual?.total || 0}
        />
      </Grid>
    </Grid>
  );
};

const variantMap = {
  annual: {
    label: "Annual Leave",
    description: "Days available",
    bgColor: "primary.50",
    titleColor: "primary.900",
    descriptionColor: "primary.700",
    iconColor: "primary.700",
    icon: <AnnualLeaveIcon />,
  },
  sick: {
    label: "Sick Leave",
    description: "Days used",
    bgColor: "#FFF7ED",
    titleColor: "#7C2D12",
    descriptionColor: "#C2410C",
    iconColor: "#C2410C",
    icon: <SickLeaveIcon />,
  },
  casual: {
    label: "Casual Leave",
    description: "Days used",
    bgColor: "grey.50",
    titleColor: "grey.900",
    descriptionColor: "grey.700",
    iconColor: "grey.700",
    icon: <CasualLeaveIcon />,
  },
};

const Card = (props: {
  type: "annual" | "sick" | "casual";
  value: number;
  loading?: boolean;
}) => {
  return (
    <Box
      sx={{
        backgroundColor: variantMap[props.type].bgColor,
        padding: "24px",
        borderRadius: "12px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: variantMap[props.type].titleColor,
            fontSize: "16px",
            fontWeight: 500,
            lineHeight: "24px",
          }}
        >
          {variantMap[props.type].label}
        </Typography>
        <Box
          sx={{
            color: variantMap[props.type].iconColor,
          }}
        >
          {variantMap[props.type].icon}
        </Box>
      </Box>

      <Box sx={{ marginTop: "8px", display: "flex", flexDirection: "column" }}>
        {props.loading ? (
          <Box
            sx={{
              width: "40%",
              height: "32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Skeleton
              variant="rounded"
              sx={{
                width: "100%",
                height: "20px",
              }}
            />
          </Box>
        ) : (
          <Typography
            variant="caption"
            sx={{
              color: variantMap[props.type].descriptionColor,
              fontSize: "24px",
              lineHeight: "32px",
              fontWeight: 600,
            }}
          >
            {props.value}
          </Typography>
        )}
        <Typography
          variant="body1"
          sx={{
            color: variantMap[props.type].descriptionColor,
            fontSize: "12px",
            lineHeight: "16px",
          }}
        >
          {variantMap[props.type].description}
        </Typography>
      </Box>
    </Box>
  );
};
