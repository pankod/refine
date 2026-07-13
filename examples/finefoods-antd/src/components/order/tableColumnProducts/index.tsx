import { Flex, Popover, Typography, Badge, Avatar, theme } from "antd";
import { getUniqueListWithCount } from "../../../utils";
import type { IOrder } from "../../../interfaces";
import { useTranslate } from "@refinedev/core";

const visibleProductCount = 4;

type Props = {
  order: IOrder;
};

export const OrderTableColumnProducts = ({ order }: Props) => {
  const t = useTranslate();
  const { token } = theme.useToken();

  const uniqueProducts = getUniqueListWithCount({
    list: order?.products || [],
    field: "id",
  });
  const visibleProducts = uniqueProducts.slice(0, visibleProductCount);
  const unvisibleProducts = uniqueProducts.slice(visibleProductCount);

  return (
    <Flex gap={12}>
      {visibleProducts.map((product) => {
        const image = product.images?.[0];
        return (
          <Popover
            key={product.id}
            content={<Typography.Text>{product.name}</Typography.Text>}
          >
            <Badge
              style={{
                color: "#fff",
              }}
              count={product.count === 1 ? 0 : product.count}
            >
              <Avatar
                shape="square"
                src={image?.thumbnailUrl || image?.url}
                alt={image?.name}
              />
            </Badge>
          </Popover>
        );
      })}
      {!!unvisibleProducts.length && (
        <Popover
          title={t("orders.fields.products")}
          content={
            <Flex gap={8}>
              {unvisibleProducts.map((product) => {
                const image = product.images?.[0];
                return (
                  <Popover
                    key={product.id}
                    content={<Typography.Text>{product.name}</Typography.Text>}
                  >
                    <Badge
                      style={{
                        color: "#fff",
                      }}
                      count={product.count === 1 ? 0 : product.count}
                    >
                      <Avatar
                        shape="square"
                        src={image?.thumbnailUrl || image?.url}
                        alt={image?.name}
                      />
                    </Badge>
                  </Popover>
                );
              })}
            </Flex>
          }
        >
          <Avatar
            shape="square"
            style={{
              backgroundColor: token.colorPrimaryBg,
            }}
          >
            <Typography.Text
              style={{
                color: token.colorPrimary,
              }}
            >
              +{unvisibleProducts.length}
            </Typography.Text>
          </Avatar>
        </Popover>
      )}
    </Flex>
  );
};
