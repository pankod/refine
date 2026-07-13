import { useCan, useGetIdentity, type HttpError } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";
import type { DateRange } from "@mui/x-date-pickers-pro/models";
import { Box, Button, MenuItem, Select, Typography } from "@mui/material";
import dayjs from "dayjs";
import { PageHeader } from "@/components/layout/page-header";
import { InputText } from "@/components/input/text";
import { LoadingOverlay } from "@/components/loading-overlay";
import { InputDateStartsEnds } from "@/components/input/date-starts-ends";
import { TimeOffFormSummary } from "@/components/time-offs/form-summary";
import { ThemeProvider } from "@/providers/theme-provider";
import {
  type Employee,
  type TimeOff,
  TimeOffType,
  TimeOffStatus,
  Role,
} from "@/types";
import { CheckRectangleIcon } from "@/icons";

type FormValues = Omit<TimeOff, "id" | "notes"> & {
  notes: string;
  dates: DateRange<dayjs.Dayjs>;
};

export const PageEmployeeTimeOffsCreate = () => {
  const { data: useCanData } = useCan({
    action: "manager",
    params: {
      resource: {
        name: "time-offs",
        meta: {
          scope: "manager",
        },
      },
    },
  });
  const isManager = useCanData?.can;

  const { data: employee } = useGetIdentity<Employee>();

  const {
    refineCore: { formLoading, onFinish },
    ...formMethods
  } = useForm<TimeOff, HttpError, FormValues>({
    defaultValues: {
      timeOffType: TimeOffType.ANNUAL,
      notes: "",
      dates: [null, null],
    },
    refineCoreProps: {
      successNotification: () => {
        return {
          message: isManager
            ? "Time off assigned"
            : "Your time off request is submitted for review.",
          type: "success",
        };
      },
    },
  });
  const { control, handleSubmit, formState, watch } = formMethods;

  const onFinishHandler = async (values: FormValues) => {
    const payload: FormValues = {
      ...values,
      startsAt: dayjs(values.dates[0]).format("YYYY-MM-DD"),
      endsAt: dayjs(values.dates[1]).format("YYYY-MM-DD"),
      ...(isManager && {
        status: TimeOffStatus.APPROVED,
      }),
    };
    await onFinish(payload);
  };

  const timeOffType = watch("timeOffType");
  const selectedDays = watch("dates");
  const startsAt = selectedDays[0];
  const endsAt = selectedDays[1];
  const availableAnnualDays = employee?.availableAnnualLeaveDays ?? 0;
  const requestedDays =
    startsAt && endsAt ? endsAt.diff(startsAt, "day") + 1 : 0;

  return (
    <ThemeProvider role={isManager ? Role.MANAGER : Role.EMPLOYEE}>
      <LoadingOverlay loading={formLoading}>
        <Box>
          <PageHeader
            title={isManager ? "Assign Time Off" : "Request Time Off"}
            showListButton
            showDivider
          />

          <Box
            component="form"
            onSubmit={handleSubmit(onFinishHandler)}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "24px",
              marginTop: "24px",
            }}
          >
            <Box>
              <Typography
                variant="body2"
                sx={{
                  mb: "8px",
                }}
              >
                Time Off Type
              </Typography>
              <Controller
                name="timeOffType"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    size="small"
                    sx={{
                      minWidth: "240px",
                      height: "40px",
                      "& .MuiSelect-select": {
                        paddingBlock: "10px",
                      },
                    }}
                  >
                    <MenuItem value={TimeOffType.ANNUAL}>Annual Leave</MenuItem>
                    <MenuItem value={TimeOffType.CASUAL}>Casual Leave</MenuItem>
                    <MenuItem value={TimeOffType.SICK}>Sick Leave</MenuItem>
                  </Select>
                )}
              />
            </Box>

            <Box>
              <Typography
                variant="body2"
                sx={{
                  mb: "16px",
                }}
              >
                Requested Dates
              </Typography>
              <Controller
                name="dates"
                control={control}
                rules={{
                  validate: (value) => {
                    if (!value[0] || !value[1]) {
                      return "Please select both start and end dates";
                    }

                    return true;
                  },
                }}
                render={({ field }) => {
                  return (
                    <Box
                      sx={{
                        display: "grid",
                        gridTemplateColumns: () => {
                          return {
                            sm: "1fr",
                            lg: "628px 1fr",
                          };
                        },
                        gap: "40px",
                      }}
                    >
                      <InputDateStartsEnds
                        {...field}
                        error={formState.errors.dates?.message}
                        availableAnnualDays={availableAnnualDays}
                        requestedDays={requestedDays}
                      />
                      {timeOffType === TimeOffType.ANNUAL && (
                        <Box
                          sx={{
                            display: "flex",
                            maxWidth: "628px",
                            alignItems: () => {
                              return {
                                lg: "flex-end",
                              };
                            },
                            justifyContent: () => {
                              return {
                                xs: "flex-end",
                                lg: "flex-start",
                              };
                            },
                          }}
                        >
                          <TimeOffFormSummary
                            availableAnnualDays={availableAnnualDays}
                            requestedDays={requestedDays}
                          />
                        </Box>
                      )}
                    </Box>
                  );
                }}
              />
            </Box>

            <Box
              sx={{
                maxWidth: "628px",
              }}
            >
              <Controller
                name="notes"
                control={control}
                render={({ field, fieldState }) => {
                  return (
                    <InputText
                      {...field}
                      label="Notes"
                      error={fieldState.error?.message}
                      placeholder="Place enter your notes"
                      multiline
                      rows={3}
                    />
                  );
                }}
              />
            </Box>

            <Button
              variant="contained"
              size="large"
              type="submit"
              startIcon={isManager ? <CheckRectangleIcon /> : undefined}
            >
              {isManager ? "Assign" : "Send Request"}
            </Button>
          </Box>
        </Box>
      </LoadingOverlay>
    </ThemeProvider>
  );
};
