import { CanAccess, useCan } from "@refinedev/core";
import { CreateButton } from "@refinedev/mui";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { PageHeader } from "@/components/layout/page-header";
import { TimeOffList } from "@/components/time-offs/list";
import { TimeOffLeaveCards } from "@/components/time-offs/leave-cards";
import { TimeOffIcon } from "@/icons";
import { ThemeProvider } from "@/providers/theme-provider";
import { Role } from "@/types";

export const PageEmployeeTimeOffsList = () => {
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

  return (
    <ThemeProvider role={isManager ? Role.MANAGER : Role.EMPLOYEE}>
      <Box>
        <PageHeader
          title="Time Off"
          rightSlot={
            <CreateButton
              size="large"
              variant="contained"
              startIcon={<TimeOffIcon />}
            >
              <CanAccess action="manager" fallback="Request Time Off">
                Assign Time Off
              </CanAccess>
            </CreateButton>
          }
        />

        <TimeOffLeaveCards />

        <Grid
          container
          spacing="24px"
          sx={{
            marginTop: "24px",
          }}
        >
          <Grid
            size={{
              xs: 12,
              md: 6,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "24px",
              }}
            >
              <TimeOffList type="inReview" />
              <TimeOffList type="upcoming" />
            </Box>
          </Grid>
          <Grid
            size={{
              xs: 12,
              md: 6,
            }}
          >
            <TimeOffList type="history" />
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
};
