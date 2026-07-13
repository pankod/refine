import type { ReactNode } from "react";
import ArrowDropUp from "@mui/icons-material/ArrowDropUp";
import ArrowDropDown from "@mui/icons-material/ArrowDropDown";
import RemoveIcon from "@mui/icons-material/Remove";
import Box from "@mui/material/Box";

type Props = {
  text?: ReactNode;
  trend?: number;
};

export const TrendIcon = ({ text, trend }: Props) => {
  const Icon = () =>
    trend ? (
      trend > 0 ? (
        <ArrowDropUp color="success" />
      ) : (
        <ArrowDropDown color="error" />
      )
    ) : (
      <RemoveIcon color="disabled" />
    );

  return (
    <Box display="flex" gap="8px" alignItems="center">
      {text}
      <Icon />
    </Box>
  );
};
