import type { ReactNode } from "react";
import dayjs from "dayjs";
import { DateField } from "@refinedev/mui";
import { useTranslate } from "@refinedev/core";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { useTheme } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import HistoryToggleOffOutlinedIcon from "@mui/icons-material/HistoryToggleOffOutlined";
import StoreOutlinedIcon from "@mui/icons-material/StoreOutlined";
import MopedOutlinedIcon from "@mui/icons-material/MopedOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import WatchLaterOutlinedIcon from "@mui/icons-material/WatchLaterOutlined";
import type { IEvent, IOrder } from "../../../interfaces";
import Skeleton from "@mui/material/Skeleton";

type Props = {
  order?: IOrder;
};

export const OrderDetails = ({ order }: Props) => {
  const { palette } = useTheme();
  const t = useTranslate();

  return (
    <Box>
      <Stepper
        sx={{
          minHeight: "360px",
          padding: "24px",
          ".MuiStepIcon-text": {
            fill: palette.mode === "dark" ? "black" : "white",
          },
        }}
        orientation="vertical"
        activeStep={order?.events.findIndex(
          (el) => el.status === order?.status?.text,
        )}
      >
        {order?.events.map((event: IEvent, index: number) => (
          <Step key={index}>
            <StepLabel
              optional={
                <Typography variant="caption">
                  {event.date && dayjs(event.date).format("L LT")}
                </Typography>
              }
              error={event.status === "Cancelled"}
            >
              {event.status}
            </StepLabel>
          </Step>
        ))}
      </Stepper>

      <Divider />
      <Info
        icon={<HistoryToggleOffOutlinedIcon />}
        label={t("orders.fields.deliveryTime")}
        value={
          order?.createdAt &&
          dayjs(order.createdAt).add(30, "minutes").format("HH:mm A")
        }
      />
      <Divider />
      <Info
        icon={<StoreOutlinedIcon />}
        label={t("orders.fields.store")}
        value={order?.store?.title}
      />
      <Divider />
      <Info
        icon={<MopedOutlinedIcon />}
        label={t("orders.fields.courier")}
        value={
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            gap="8px"
          >
            <Avatar
              src={order?.courier?.avatar?.[0]?.url}
              sx={{
                width: "32px",
                height: "32px",
              }}
            />
            <Typography>{order?.courier?.name}</Typography>
          </Box>
        }
      />
      <Divider />
      <Info
        icon={<LocalPhoneOutlinedIcon />}
        label={t("orders.fields.phone")}
        value={order?.courier?.gsm}
      />
      <Divider />
      <Info
        icon={<AccountCircleOutlinedIcon />}
        label={t("orders.fields.customer")}
        value={order?.user?.fullName}
      />
      <Divider />
      <Info
        icon={<WatchLaterOutlinedIcon />}
        label={t("orders.fields.createdAt")}
        value={
          order?.createdAt && (
            <DateField value={order.createdAt} format="LL / LT" />
          )
        }
      />
    </Box>
  );
};

type InfoProps = {
  icon: ReactNode;
  label: string;
  value?: ReactNode;
};

const Info = ({ icon, label, value }: InfoProps) => {
  const { palette } = useTheme();

  return (
    <Box display="flex" alignItems="center" p="16px 0px 16px 24px">
      <Box
        mr="8px"
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{
          color: palette.primary.main,
        }}
      >
        {icon}
      </Box>
      <Box mr="8px" display="flex" alignItems="center" width="112px">
        {label}
      </Box>

      {value ?? (
        <Skeleton variant="text" sx={{ fontSize: "1rem", width: "120px" }} />
      )}
    </Box>
  );
};
