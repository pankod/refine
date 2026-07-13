import { Box, Divider, Typography } from "@mui/material";

type Props = {
  availableAnnualDays: number;
  requestedDays: number;
};

export const TimeOffFormSummary = (props: Props) => {
  const remainingDays = props.availableAnnualDays - props.requestedDays;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: "16px",
        whiteSpace: "nowrap",
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: "16px",
        }}
      >
        <Typography variant="body2" color="text.secondary">
          Available Annual Leave Days:
        </Typography>
        <Typography variant="body2">{props.availableAnnualDays}</Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          gap: "16px",
        }}
      >
        <Typography variant="body2" color="text.secondary">
          Requested Days:
        </Typography>
        <Typography variant="body2">{props.requestedDays}</Typography>
      </Box>

      <Divider
        sx={{
          width: "100%",
        }}
      />
      <Box
        sx={{
          display: "flex",
          gap: "16px",
          height: "40px",
        }}
      >
        <Typography variant="body2" color="text.secondary">
          Remaining Days:
        </Typography>
        <Typography variant="body2" fontWeight={500}>
          {remainingDays}
        </Typography>
      </Box>
    </Box>
  );
};
