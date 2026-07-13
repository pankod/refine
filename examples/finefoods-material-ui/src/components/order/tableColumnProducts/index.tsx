import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { CustomTooltip } from "../../customTooltip";
import type { IOrder } from "../../../interfaces";
import { getUniqueListWithCount } from "../../../utils";

type Props = {
  order: IOrder;
};

export const OrderTableColumnProducts = ({ order }: Props) => {
  const uniqueProducts = getUniqueListWithCount({
    list: order?.products || [],
    field: "id",
  });
  const visibleProducts = uniqueProducts.slice(0, 3);
  const unvisibleProducts = uniqueProducts.slice(3);

  return (
    <Box display="flex" gap="12px">
      {visibleProducts.map((product) => {
        const image = product.images?.[0];
        return (
          <CustomTooltip key={product.id} title={product.name}>
            <Avatar
              variant="rounded"
              sx={{
                width: 32,
                height: 32,
              }}
              src={image?.thumbnailUrl || image?.url}
              alt={image?.name}
            />
          </CustomTooltip>
        );
      })}
      {!!unvisibleProducts.length && (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          width="32px"
          height="32px"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "dark" ? "#757575" : "#D9D9D9",
          }}
        >
          <Typography
            sx={{
              color: (theme) =>
                theme.palette.mode === "dark" ? "#121212" : "#FFFFFF",
            }}
          >
            +{unvisibleProducts.length}
          </Typography>
        </Box>
      )}
    </Box>
  );
};
