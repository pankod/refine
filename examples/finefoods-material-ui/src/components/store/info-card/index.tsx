import type { ReactNode } from "react";
import { useTranslate } from "@refinedev/core";
import {
  Box,
  Divider,
  Paper,
  Skeleton,
  type SxProps,
  useTheme,
} from "@mui/material";
import ArrowDropDownCircleOutlinedIcon from "@mui/icons-material/ArrowDropDownCircleOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import type { IStore } from "../../../interfaces";
import { StoreStatus } from "../status";

type Props = {
  store?: IStore;
};

export const StoreInfoCard = (props: Props) => {
  const t = useTranslate();
  const { address, email, isActive, gsm } = props?.store || {};

  return (
    <Paper>
      <Info
        icon={
          <ArrowDropDownCircleOutlinedIcon
            sx={{
              transform: "rotate(-90deg)",
            }}
          />
        }
        label={t("products.fields.isActive.label")}
        value={<StoreStatus value={isActive || false} size="small" />}
      />
      <Divider />
      <Info
        icon={<PlaceOutlinedIcon />}
        label={t("stores.fields.address")}
        value={address?.text}
        sx={{
          height: "80px",
        }}
      />
      <Divider />
      <Info
        icon={<AccountCircleOutlinedIcon />}
        label={t("stores.fields.email")}
        value={email}
      />
      <Divider />
      <Info
        icon={<PhoneOutlinedIcon />}
        label={t("stores.fields.gsm")}
        value={gsm}
      />
    </Paper>
  );
};

type InfoProps = {
  icon: ReactNode;
  label: string;
  value?: ReactNode;
  sx?: SxProps;
};

const Info = ({ icon, label, value, sx }: InfoProps) => {
  const { palette } = useTheme();

  return (
    <Box
      sx={[
        {
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          p: "16px 0px 16px 24px",
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Box
        sx={{
          mr: "8px",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          color: palette.primary.main,
        }}
      >
        {icon}
      </Box>
      <Box
        sx={{
          mr: "8px",
          display: "flex",
          alignItems: "center",
          width: "112px",
        }}
      >
        {label}
      </Box>
      {value ?? (
        <Skeleton variant="text" sx={{ fontSize: "1rem", width: "200px" }} />
      )}
    </Box>
  );
};
