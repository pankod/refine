import type { SVGProps } from "react";
import { Box, type SxProps } from "@mui/material";
import { AnnualLeaveIcon } from "./annual-leave";
import { SickLeaveIcon } from "./sick-leave";
import { CasualLeaveIcon } from "./casual-leave";
import { TimeOffType } from "@/types";
import { TimeOffIcon } from "./time-off";

type Props = {
  type?: TimeOffType | "default";
  sx?: SxProps;
};

const variantMap = {
  [TimeOffType.ANNUAL]: {
    iconColor: "primary.700",
    iconBgColor: "primary.50",
    icon: <AnnualLeaveIcon width={16} height={16} />,
  },
  [TimeOffType.SICK]: {
    iconColor: "#C2410C",
    iconBgColor: "#FFF7ED",
    icon: <SickLeaveIcon width={16} height={16} />,
  },
  [TimeOffType.CASUAL]: {
    iconColor: "grey.700",
    iconBgColor: "grey.50",
    icon: <CasualLeaveIcon width={16} height={16} />,
  },
  default: {
    iconColor: "grey.700",
    iconBgColor: "grey.50",
    icon: <TimeOffIcon width={16} height={16} />,
  },
};

export const RequestTypeIcon = ({ type = "default", sx }: Props) => {
  return (
    <Box
      component="span"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: variantMap[type].iconColor,
        backgroundColor: variantMap[type].iconBgColor,
        width: "24px",
        height: "24px",
        borderRadius: "100%",
        ...sx,
      }}
    >
      {variantMap[type].icon}
    </Box>
  );
};
