import { useState, useEffect, useContext, type ReactNode } from "react";
import {
  useList,
  useTranslate,
  useGetIdentity,
  useGetLocale,
  useSetLocale,
} from "@refinedev/core";
import {
  type RefineThemedLayoutHeaderProps,
  HamburgerMenu,
} from "@refinedev/mui";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Autocomplete from "@mui/material/Autocomplete";
import Stack from "@mui/material/Stack";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import SearchOutlined from "@mui/icons-material/SearchOutlined";
import BrightnessHighIcon from "@mui/icons-material/BrightnessHigh";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import i18n from "../../i18n";
import type { IOrder, IStore, ICourier, IIdentity } from "../../interfaces";
import { ColorModeContext } from "../../contexts";

interface IOptions {
  label: string;
  avatar?: ReactNode;
  link: string;
  category: string;
}

export const Header: React.FC<RefineThemedLayoutHeaderProps> = () => {
  const [value, setValue] = useState("");
  const [options, setOptions] = useState<IOptions[]>([]);

  const { mode, setMode } = useContext(ColorModeContext);

  const changeLanguage = useSetLocale();
  const locale = useGetLocale();
  const currentLocale = locale();
  const { data: user } = useGetIdentity<IIdentity | null>();

  const t = useTranslate();

  const {
    result: ordersData,

    query: { refetch: refetchOrders, isSuccess: ordersIsSuccess },
  } = useList<IOrder>({
    resource: "orders",

    queryOptions: {
      enabled: false,
    },

    filters: [{ field: "q", operator: "contains", value }],
  });

  useEffect(() => {
    if (!ordersIsSuccess || !ordersData) return;

    const orderOptionGroup: IOptions[] = ordersData.data.map((item) => {
      return {
        label: `${item.store.title} / #${item.orderNumber}`,
        link: `/orders/show/${item.id}`,
        category: t("orders.orders"),
        avatar: (
          <Avatar
            variant="rounded"
            sx={{
              width: "32px",
              height: "32px",
            }}
            src={item.products?.[0]?.images?.[0]?.url}
          />
        ),
      };
    });

    if (orderOptionGroup.length > 0) {
      setOptions((prevOptions) => [...prevOptions, ...orderOptionGroup]);
    }
  }, [ordersData, ordersIsSuccess, t]);

  const {
    result: storesData,

    query: { refetch: refetchStores, isSuccess: storesIsSuccess },
  } = useList<IStore>({
    resource: "stores",

    queryOptions: {
      enabled: false,
    },

    filters: [{ field: "q", operator: "contains", value }],
  });

  useEffect(() => {
    if (!storesIsSuccess || !storesData) return;

    const storeOptionGroup = storesData.data.map((item) => {
      return {
        label: `${item.title} - ${item.address.text}`,
        link: `/stores/edit/${item.id}`,
        category: t("stores.stores"),
      };
    });

    setOptions((prevOptions) => [...prevOptions, ...storeOptionGroup]);
  }, [storesData, storesIsSuccess, t]);

  const {
    result: couriersData,

    query: { refetch: refetchCouriers, isSuccess: couriersIsSuccess },
  } = useList<ICourier>({
    resource: "couriers",

    queryOptions: {
      enabled: false,
    },

    filters: [{ field: "q", operator: "contains", value }],
  });

  useEffect(() => {
    if (!couriersIsSuccess || !couriersData) return;

    const courierOptionGroup = couriersData.data.map((item) => {
      return {
        label: `${item.name}`,
        avatar: (
          <Avatar
            sx={{
              width: "32px",
              height: "32px",
            }}
            src={item.avatar?.[0]?.url}
          />
        ),
        link: `/couriers/edit/${item.id}`,
        category: t("couriers.couriers"),
      };
    });

    setOptions((prevOptions) => [...prevOptions, ...courierOptionGroup]);
  }, [couriersData, couriersIsSuccess, t]);

  useEffect(() => {
    if (value?.trim() === "") return;

    setOptions([]);
    refetchOrders();
    refetchCouriers();
    refetchStores();
  }, [value, refetchOrders, refetchCouriers, refetchStores]);

  return (
    <AppBar
      color="default"
      position="sticky"
      elevation={0}
      sx={{
        "& .MuiToolbar-root": {
          minHeight: "64px",
        },
        height: "64px",
        borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        backgroundColor: (theme) => theme.palette.background.paper,
      }}
    >
      <Toolbar
        sx={{
          paddingLeft: {
            xs: "0",
            sm: "16px",
            md: "24px",
          },
        }}
      >
        <Box
          minWidth="40px"
          minHeight="40px"
          marginRight={{
            xs: "0",
            sm: "16px",
          }}
          sx={{
            "& .MuiButtonBase-root": {
              marginLeft: 0,
              marginRight: 0,
            },
          }}
        >
          <HamburgerMenu />
        </Box>

        <Stack
          direction="row"
          width="100%"
          justifyContent="space-between"
          alignItems="center"
          gap={{
            xs: "8px",
            sm: "24px",
          }}
        >
          <Stack direction="row" flex={1}>
            <Autocomplete
              sx={{
                maxWidth: 550,
              }}
              id="search-autocomplete"
              options={options}
              filterOptions={(x) => x}
              disableClearable
              freeSolo
              fullWidth
              size="small"
              onInputChange={(event, value) => {
                if (event?.type === "change") {
                  setValue(value);
                }
              }}
              groupBy={(option) => option.category}
              renderOption={(props, option: IOptions) => {
                return (
                  <Link href={option.link} underline="none">
                    <Box
                      {...props}
                      component="li"
                      sx={{
                        display: "flex",
                        padding: "10px",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      {option?.avatar && option.avatar}
                      <Typography
                        sx={{
                          fontSize: {
                            md: "14px",
                            lg: "16px",
                          },
                        }}
                      >
                        {option.label}
                      </Typography>
                    </Box>
                  </Link>
                );
              }}
              renderInput={(params) => {
                return (
                  <Box
                    position="relative"
                    sx={{
                      "& .MuiFormLabel-root": {
                        paddingRight: "24px",
                      },
                      display: {
                        xs: "none",
                        sm: "block",
                      },
                    }}
                  >
                    <TextField
                      {...params}
                      label={t("search.placeholder")}
                      slotProps={{
                        input: {
                          ...params.InputProps,
                        },
                      }}
                    />
                    <IconButton
                      sx={{
                        position: "absolute",
                        right: 0,
                        top: 0,
                        "&:hover": {
                          backgroundColor: "transparent",
                        },
                      }}
                    >
                      <SearchOutlined />
                    </IconButton>
                  </Box>
                );
              }}
            />
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            spacing={{
              xs: "8px",
              sm: "24px",
            }}
          >
            <Select
              size="small"
              disableUnderline
              defaultValue={currentLocale}
              slotProps={{
                input: {
                  "aria-label": "Without label",
                },
              }}
              variant="outlined"
              sx={{
                width: {
                  xs: "120px",
                  sm: "160px",
                },
              }}
            >
              {[...(i18n.languages ?? [])].sort().map((lang: string) => (
                <MenuItem
                  selected={currentLocale === lang}
                  key={lang}
                  defaultValue={lang}
                  onClick={() => {
                    changeLanguage(lang);
                  }}
                  value={lang}
                >
                  <Typography color="text.secondary">
                    {lang === "en" ? "English" : "German"}
                  </Typography>
                </MenuItem>
              ))}
            </Select>

            <IconButton
              onClick={() => {
                setMode();
              }}
              sx={{
                backgroundColor: (theme) =>
                  theme.palette.mode === "dark" ? "transparent" : "#00000014",
              }}
            >
              {mode === "dark" ? (
                <BrightnessHighIcon />
              ) : (
                <Brightness4Icon
                  sx={{
                    fill: "#000000DE",
                  }}
                />
              )}
            </IconButton>

            <Stack
              direction="row"
              gap={{
                xs: "8px",
                sm: "16px",
              }}
              alignItems="center"
              justifyContent="center"
            >
              <Typography
                fontSize={{
                  xs: "12px",
                  sm: "14px",
                }}
                variant="subtitle2"
              >
                {user?.name}
              </Typography>
              <Avatar src={user?.avatar} alt={user?.name} />
            </Stack>
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
