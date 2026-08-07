import React, { useMemo, useState } from "react";
import { useApiUrl, useCustom, useTranslate } from "@refinedev/core";
import dayjs from "dayjs";
import Grid from "@mui/material/Grid2";
import { NumberField } from "@refinedev/mui";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import WatchLaterOutlinedIcon from "@mui/icons-material/WatchLaterOutlined";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import {
  DailyOrders,
  DailyRevenue,
  DeliveryMap,
  NewCustomers,
  OrderTimeline,
  RecentOrders,
  TrendingMenu,
} from "../../components/dashboard";
import { TrendIcon } from "../../components/icons";
import { Card, RefineListView } from "../../components";
import type { IOrderChart, ISalesChart } from "../../interfaces";

type DateFilter = "lastWeek" | "lastMonth";

const DATE_FILTERS: Record<
  DateFilter,
  {
    text: string;
    value: DateFilter;
  }
> = {
  lastWeek: {
    text: "lastWeek",
    value: "lastWeek",
  },
  lastMonth: {
    text: "lastMonth",
    value: "lastMonth",
  },
};

export const DashboardPage: React.FC = () => {
  const t = useTranslate();
  const API_URL = useApiUrl();

  const [selecetedDateFilter, setSelectedDateFilter] = useState<DateFilter>(
    DATE_FILTERS.lastWeek.value,
  );

  const dateFilterQuery = useMemo(() => {
    const now = dayjs();
    switch (selecetedDateFilter) {
      case "lastWeek":
        return {
          start: now.subtract(6, "days").startOf("day").format(),
          end: now.endOf("day").format(),
        };
      case "lastMonth":
        return {
          start: now.subtract(1, "month").startOf("day").format(),
          end: now.endOf("day").format(),
        };
      default:
        return {
          start: now.subtract(7, "days").startOf("day").format(),
          end: now.endOf("day").format(),
        };
    }
  }, [selecetedDateFilter]);

  const { result: dailyRevenueData } = useCustom<{
    data: ISalesChart[];
    total: number;
    trend: number;
  }>({
    url: `${API_URL}/dailyRevenue`,
    method: "get",
    config: {
      query: dateFilterQuery,
    },
  });
  const dailyRevenue = dailyRevenueData?.data;

  const { result: dailyOrdersData } = useCustom<{
    data: IOrderChart[];
    total: number;
    trend: number;
  }>({
    url: `${API_URL}/dailyOrders`,
    method: "get",
    config: {
      query: dateFilterQuery,
    },
  });
  const dailyOrders = dailyOrdersData?.data;

  const { result: newCustomersData } = useCustom<{
    data: ISalesChart[];
    total: number;
    trend: number;
  }>({
    url: `${API_URL}/newCustomers`,
    method: "get",
    config: {
      query: dateFilterQuery,
    },
  });
  const newCustomers = newCustomersData?.data;

  return (
    <RefineListView
      headerButtons={() => (
        <Select
          size="small"
          value={selecetedDateFilter}
          onChange={(e) => setSelectedDateFilter(e.target.value as DateFilter)}
          sx={{
            width: "160px",
            backgroundColor: (theme) => theme.palette.background.paper,
          }}
        >
          {Object.values(DATE_FILTERS).map((filter) => {
            return (
              <MenuItem key={filter.value} value={filter.value}>
                <Typography color="text.secondary" lineHeight="24px">
                  {t(`dashboard.filter.date.${filter.text}`)}
                </Typography>
              </MenuItem>
            );
          })}
        </Select>
      )}
    >
      <Grid container columns={24} spacing={3}>
        <Grid
          size={{
            xs: 24,
            sm: 24,
            md: 24,
            lg: 24,
            xl: 10,
          }}
          sx={{
            height: "264px",
          }}
        >
          <Card
            title={t("dashboard.dailyRevenue.title")}
            icon={<MonetizationOnOutlinedIcon />}
            sx={{
              ".MuiCardContent-root:last-child": {
                paddingBottom: "24px",
              },
            }}
            cardContentProps={{
              sx: {
                height: "208px",
              },
            }}
            cardHeaderProps={{
              action: (
                <TrendIcon
                  trend={dailyRevenue?.trend}
                  text={
                    <NumberField
                      value={dailyRevenue?.trend || 0}
                      options={{
                        style: "currency",
                        currency: "USD",
                      }}
                    />
                  }
                />
              ),
            }}
          >
            <DailyRevenue data={dailyRevenueData?.data.data || []} />
          </Card>
        </Grid>
        <Grid
          size={{
            xs: 24,
            sm: 24,
            md: 24,
            lg: 12,
            xl: 7,
          }}
          sx={{
            height: "264px",
          }}
        >
          <Card
            title={t("dashboard.dailyOrders.title")}
            icon={<ShoppingBagOutlinedIcon />}
            sx={{
              ".MuiCardContent-root:last-child": {
                paddingBottom: "24px",
              },
            }}
            cardContentProps={{
              sx: {
                height: "208px",
              },
            }}
            cardHeaderProps={{
              action: (
                <TrendIcon
                  trend={dailyOrders?.trend}
                  text={<NumberField value={dailyOrders?.trend || 0} />}
                />
              ),
            }}
          >
            <DailyOrders data={dailyOrders?.data || []} />
          </Card>
        </Grid>
        <Grid
          size={{
            xs: 24,
            sm: 24,
            md: 24,
            lg: 12,
            xl: 7,
          }}
          sx={{
            height: "264px",
          }}
        >
          <Card
            title={t("dashboard.newCustomers.title")}
            icon={<AccountCircleOutlinedIcon />}
            sx={{
              ".MuiCardContent-root:last-child": {
                paddingBottom: "24px",
              },
            }}
            cardContentProps={{
              sx: {
                height: "208px",
              },
            }}
            cardHeaderProps={{
              action: (
                <TrendIcon
                  trend={newCustomers?.trend}
                  text={<NumberField value={newCustomers?.trend || 0} />}
                />
              ),
            }}
          >
            <NewCustomers data={newCustomers?.data || []} />
          </Card>
        </Grid>
        <Grid
          size={{
            xs: 24,
            sm: 24,
            md: 24,
            lg: 15,
            xl: 15,
          }}
          sx={{
            height: "504px",
          }}
        >
          <Card
            icon={<PlaceOutlinedIcon />}
            title={t("dashboard.deliveryMap.title")}
            cardContentProps={{
              sx: {
                height: "424px",
              },
            }}
          >
            <DeliveryMap />
          </Card>
        </Grid>
        <Grid
          size={{
            xs: 24,
            sm: 24,
            md: 24,
            lg: 9,
            xl: 9,
          }}
          sx={{
            height: "504px",
          }}
        >
          <Card
            icon={<WatchLaterOutlinedIcon />}
            title={t("dashboard.timeline.title")}
          >
            <OrderTimeline />
          </Card>
        </Grid>
        <Grid
          size={{
            xs: 24,
            sm: 24,
            md: 24,
            lg: 15,
            xl: 15,
          }}
          sx={{
            height: "800px",
          }}
        >
          <Card
            icon={<ShoppingBagOutlinedIcon />}
            title={t("dashboard.recentOrders.title")}
            cardContentProps={{
              sx: {
                height: "688px",
              },
            }}
          >
            <RecentOrders />
          </Card>
        </Grid>
        <Grid
          size={{
            xs: 24,
            sm: 24,
            md: 24,
            lg: 9,
            xl: 9,
          }}
          sx={{
            height: "max-content",
          }}
        >
          <Card
            icon={<TrendingUpIcon />}
            title={t("dashboard.trendingProducts.title")}
          >
            <TrendingMenu />
          </Card>
        </Grid>
      </Grid>
    </RefineListView>
  );
};
