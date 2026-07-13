import Chip, { type ChipProps } from "@mui/material/Chip";
import { useTranslate } from "@refinedev/core";
import type { IProduct } from "../../../interfaces";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { useTheme } from "@mui/material/styles";
import { green } from "@mui/material/colors";

type Props = {
  value: IProduct["isActive"];
  size?: ChipProps["size"];
};

export const CategoryStatus = (props: Props) => {
  const { palette } = useTheme();
  const isDarkMode = palette.mode === "dark";

  const t = useTranslate();

  const color = props.value
    ? isDarkMode
      ? green[200]
      : green[800]
    : "default";
  const icon: ChipProps["icon"] = props.value ? (
    <VisibilityOutlinedIcon
      sx={{
        fill: isDarkMode ? green[200] : green[600],
      }}
    />
  ) : (
    <VisibilityOffOutlinedIcon color="action" />
  );

  return (
    <Chip
      label={t(`categories.fields.isActive.${props.value}`)}
      icon={icon}
      sx={{
        borderColor: color,
        color: color,
      }}
      variant="outlined"
      size={props?.size || "small"}
    />
  );
};
