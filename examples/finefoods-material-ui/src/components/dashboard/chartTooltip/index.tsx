import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material";
import type { TooltipProps } from "recharts";

type ChartTooltipProps = TooltipProps<number, string> & {
  labelFormatter?: (label: string | number) => string;
  valueFormatter?: (value: string | number) => string;
};

export const ChartTooltip: React.FC<ChartTooltipProps> = ({
  active,
  payload,
  valueFormatter,
  labelFormatter,
}) => {
  if (active && payload?.length) {
    const value =
      valueFormatter?.(payload[0]?.value || "") || payload[0]?.value;

    const label =
      labelFormatter?.(payload[0]?.payload?.date || "") ||
      payload[0]?.payload?.date;
    return (
      <Box
        display="flex"
        flexDirection="column"
        gap="4px"
        sx={{
          color: "#fff",
          fontWeight: 600,
          padding: "4px 8px",
          borderRadius: "4px",
          backgroundColor: ({ palette }) =>
            palette.mode === "dark" ? palette.grey[800] : palette.grey[600],
        }}
      >
        <Typography>{value}</Typography>
        <Typography>{label}</Typography>
      </Box>
    );
  }

  return null;
};
