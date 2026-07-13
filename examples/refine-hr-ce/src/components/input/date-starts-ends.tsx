import { forwardRef } from "react";
import { Box, Divider, Typography } from "@mui/material";
import { DateField } from "@refinedev/mui";
import {
  DateRangeCalendar,
  type DateRangeCalendarProps,
} from "@mui/x-date-pickers-pro/DateRangeCalendar";
import { LocalizationProvider } from "@mui/x-date-pickers-pro/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import type { PickerValidDate } from "@mui/x-date-pickers/models";

type Props = {
  error?: string;
  availableAnnualDays: number;
  requestedDays: number;
} & DateRangeCalendarProps<PickerValidDate>;

export const InputDateStartsEnds = forwardRef<HTMLDivElement, Props>(
  ({ error, availableAnnualDays, requestedDays, ...props }, ref) => {
    const startsAt = props.value?.[0];
    const endsAt = props.value?.[1];

    const hasStartsAt = Boolean(startsAt);
    const hasEndsAt = Boolean(endsAt);

    return (
      <Box
        sx={{
          paddingTop: "12px",
          maxWidth: "628px",
          overflow: "hidden",
          border: (theme) => `1px solid ${theme.palette.divider}`,
          borderRadius: "12px",

          "& .MuiIconButton-root": {
            border: "none",
            backgroundColor: (theme) => theme.palette.grey[100],
          },

          "& .MuiPickersSlideTransition-root": {
            minHeight: "232px",

            "& .MuiPickersDay-root.Mui-selected": {
              backgroundColor: (theme) => theme.palette.grey[900],
              borderRadius: "6px",
            },

            "& .MuiDateRangePickerDay-rangeIntervalDayHighlight ": {
              backgroundColor: (theme) => theme.palette.grey[200],
            },

            "& .MuiDateRangePickerDay-hiddenDayFiller": {
              backgroundColor: "transparent",
            },
          },
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              overflow: "auto",
            }}
          >
            <DateRangeCalendar disableHighlightToday {...props} ref={ref} />
          </Box>
        </LocalizationProvider>

        <Divider
          sx={{
            marginLeft: {
              sm: 0,
              md: "24px",
            },
            width: {
              sm: "100%",
              md: "calc(100% - 48px)",
            },
          }}
        />

        <Box
          sx={{
            display: {
              sm: "flex",
              md: "grid",
            },
            flexDirection: "column",
            gridTemplateColumns: "1fr 1fr",
            padding: "16px 24px",
          }}
        >
          {error ? (
            <Box>
              <Typography variant="caption" color="error">
                {error}
              </Typography>
            </Box>
          ) : (
            <>
              <Box>
                <>
                  <Typography variant="caption" color="grey.400">
                    {hasStartsAt && "Start Date: "}
                    {!hasStartsAt && "Please select Start Date"}
                  </Typography>
                  {hasStartsAt && (
                    <DateField
                      variant="caption"
                      color="text.primary"
                      value={startsAt}
                      format="MMMM DD, YYYY"
                    />
                  )}
                </>
              </Box>

              <Box
                sx={{
                  paddingLeft: {
                    sm: 0,
                    md: "24px",
                  },
                }}
              >
                <Typography variant="caption" color="grey.400">
                  {hasEndsAt && "End Date: "}
                  {!hasEndsAt && "Please select End Date"}
                </Typography>
                {hasEndsAt && (
                  <DateField
                    variant="caption"
                    color="text.primary"
                    value={endsAt}
                    format="MMMM DD, YYYY"
                  />
                )}
              </Box>
            </>
          )}
        </Box>
      </Box>
    );
  },
);
