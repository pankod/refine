import Chip, { type ChipProps } from "@mui/material/Chip";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import BlockOutlinedIcon from "@mui/icons-material/BlockOutlined";
import MopedOutlined from "@mui/icons-material/MopedOutlined";
import { useTheme } from "@mui/material/styles";
import { blue, green } from "@mui/material/colors";
import type { ICourierStatus } from "../../../interfaces";

type Props = {
  value: ICourierStatus;
};

export const CourierStatus = (props: Props) => {
  const { palette } = useTheme();
  const isDarkMode = palette.mode === "dark";

  const text = props?.value?.text || "Offline";

  let color = "";
  let icon: ChipProps["icon"];

  switch (text) {
    case "Available":
      color = isDarkMode ? green[200] : green[800];
      icon = (
        <CheckCircleIcon
          sx={{
            fill: isDarkMode ? green[200] : green[600],
          }}
        />
      );
      break;
    case "Offline":
      color = "default";
      icon = <BlockOutlinedIcon color="action" />;
      break;
    case "On delivery":
      color = isDarkMode ? blue[200] : blue[800];
      icon = (
        <MopedOutlined
          sx={{
            fill: isDarkMode ? blue[200] : blue[600],
          }}
        />
      );
      break;
    default:
      color = "default";
      icon = <BlockOutlinedIcon color="action" />;
      break;
  }

  return (
    <Chip
      label={text}
      variant="outlined"
      size="small"
      icon={icon}
      sx={{
        borderColor: color,
        color: color,
      }}
    />
  );
};
