import React from "react";
import { useShow, useTranslate, useUpdate } from "@refinedev/core";
import { ListButton } from "@refinedev/mui";
import { useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import ArrowBack from "@mui/icons-material/ArrowBack";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import {
  OrderDeliveryMap,
  OrderDetails,
  OrderProducts,
  Card,
} from "../../components";
import { RefineListView } from "../../components";
import type { IOrder } from "../../interfaces";

export const OrderShow = () => {
  const t = useTranslate();

  const { query: queryResult } = useShow<IOrder>();
  const record = queryResult.data?.data;
  const canAcceptOrder = record?.status.text === "Pending";
  const canRejectOrder =
    record?.status.text === "Pending" ||
    record?.status.text === "Ready" ||
    record?.status.text === "On The Way";

  const { mutate } = useUpdate({
    resource: "orders",
    id: record?.id.toString(),
  });

  const theme = useTheme();

  const handleMutate = (status: { id: number; text: string }) => {
    if (record) {
      mutate({
        values: {
          status,
        },
      });
    }
  };

  return (
    <>
      <ListButton
        variant="outlined"
        sx={{
          borderColor: "GrayText",
          color: "GrayText",
          backgroundColor: "transparent",
        }}
        startIcon={<ArrowBack />}
      />
      <Divider
        sx={{
          marginBottom: "24px",
          marginTop: "24px",
        }}
      />
      <RefineListView
        title={
          <Typography variant="h5">
            {t("orders.order")} #{record?.orderNumber}
          </Typography>
        }
        headerButtons={[
          <Stack key="actions" direction="row" spacing="8px">
            <Button
              disabled={!canAcceptOrder}
              variant="outlined"
              size="small"
              color="success"
              startIcon={<CheckOutlinedIcon />}
              onClick={() =>
                handleMutate({
                  id: 2,
                  text: "Ready",
                })
              }
            >
              {t("buttons.accept")}
            </Button>
            <Button
              disabled={!canRejectOrder}
              variant="outlined"
              size="small"
              color="error"
              startIcon={<CloseOutlinedIcon />}
              onClick={() =>
                handleMutate({
                  id: 5,
                  text: "Cancelled",
                })
              }
            >
              {t("buttons.reject")}
            </Button>
          </Stack>,
        ]}
      >
        <Grid container spacing={3}>
          <Grid
            size={{
              xs: 12,
              md: 6,
              lg: 8,
            }}
            height="max-content"
          >
            <Card
              title={t("orders.titles.deliveryMap")}
              cardContentProps={{
                sx: {
                  height: "448px",
                  padding: 0,
                },
              }}
            >
              <OrderDeliveryMap order={record} />
            </Card>
            <Paper
              sx={{
                marginTop: theme.spacing(3),
              }}
            >
              <OrderProducts order={record} />
            </Paper>
          </Grid>
          <Grid
            size={{
              xs: 12,
              md: 6,
              lg: 4,
            }}
            height="max-content"
          >
            <Card title={t("orders.titles.deliveryDetails")}>
              <OrderDetails order={record} />
            </Card>
          </Grid>
        </Grid>
      </RefineListView>
    </>
  );
};
