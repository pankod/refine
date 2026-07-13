import React from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";

import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import LinearProgress, {
  type LinearProgressProps,
} from "@mui/material/LinearProgress";

import type { KpiCardProps, DeltaType } from "../../interfaces";

const getColor = (num: number): DeltaType => {
  switch (true) {
    case num < 20:
      return "error";
    case num < 50:
      return "warning";
    case num === 50:
      return "info";
    case num < 75:
      return "primary";
    case num < 90:
      return "secondary";
    default:
      return "success";
  }
};

function LinearProgressWithLabel(
  props: LinearProgressProps & { value: number },
) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

export default function KpiCard({
  title,
  total,
  trend,
  target,
  formatTotal = (value) => value,
  formatTarget = (value) => value,
}: KpiCardProps) {
  const percent = Math.round((trend / total) * 100);
  const color = getColor(percent);
  const arbitraryTarget = Math.round((total / target) * 100);

  return (
    <Card elevation={3}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          listStyle: "none",
          p: 0.5,
          m: 0,
        }}
      >
        <CardContent>
          <Typography variant="h5" sx={{ fontSize: 17, mb: 0 }}>
            {title}
          </Typography>
          <Typography
            variant="h5"
            sx={{ fontSize: 40, fontWeight: 700, mb: 0 }}
            color={color === "success" ? "green" : color}
          >
            {formatTotal(total)}
          </Typography>
        </CardContent>
        <CardContent>
          <Chip
            icon={percent < 0 ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
            color={color}
            label={`${percent}%`}
          />
        </CardContent>
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <CardContent>
          <span>{`(Target: ${formatTarget(target)})`}</span>
          <LinearProgressWithLabel
            value={arbitraryTarget}
            variant="determinate"
            color={color}
            sx={{
              borderRadius: 5,
              height: 10,
              backgroundColor: (theme) =>
                theme.palette.mode === "light" ? color : color,
            }}
          />
        </CardContent>
      </Box>
    </Card>
  );
}
