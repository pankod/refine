import { useTranslate, useNavigation, useTable } from "@refinedev/core";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";
import dayjs from "dayjs";
import type { IOrder } from "../../../interfaces";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import { OrderStatus } from "../../order";

export const OrderTimeline: React.FC = () => {
  const theme = useTheme();

  const { show } = useNavigation();

  const {
    tableQuery: tableQueryResult,
    currentPage: current,
    setCurrentPage: setCurrent,
    pageCount,
  } = useTable<IOrder>({
    resource: "orders",
    syncWithLocation: false,

    pagination: {
      pageSize: 7,
    },

    sorters: {
      initial: [
        {
          field: "createdAt",
          order: "desc",
        },
      ],
    },
  });

  const { data } = tableQueryResult;

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      height="100%"
      pb="24px"
    >
      <List
        sx={{
          padding: 0,
        }}
      >
        {data?.data?.map((order, i) => {
          const isLast = i === data.data.length - 1;
          return (
            <ListItem
              divider={!isLast}
              key={order.id}
              secondaryAction={dayjs(order.createdAt).fromNow()}
              onClick={() => show("orders", order.id)}
              sx={{
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: theme.palette.action.hover,
                },
              }}
            >
              <ListItemAvatar
                sx={{
                  width: "98px",
                  marginRight: "16px",
                }}
              >
                <OrderStatus status={order.status.text} />
              </ListItemAvatar>
              <ListItemText primary={`#${order.orderNumber}`} />
            </ListItem>
          );
        })}
      </List>
      <Box sx={{ display: "flex", justifyContent: "center", mt: "24px" }}>
        <Pagination
          count={pageCount}
          page={current}
          onChange={(e, page) => setCurrent(page)}
          siblingCount={1}
          boundaryCount={1}
          size="small"
          color="primary"
        />
      </Box>
    </Box>
  );
};
