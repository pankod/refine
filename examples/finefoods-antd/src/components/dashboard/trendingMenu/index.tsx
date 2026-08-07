import { NumberField, useSimpleList } from "@refinedev/antd";
import { Typography, Avatar, List as AntdList, Flex } from "antd";
import type { ITrendingProducts } from "../../../interfaces";
import {
  Rank1Icon,
  Rank2Icon,
  Rank3Icon,
  Rank4Icon,
  Rank5Icon,
} from "../../icons";
import type { ReactNode } from "react";

export const TrendingMenu: React.FC = () => {
  const //`useSimpleList` does not accept all of Ant Design's `List` component props anymore. You can directly use `List` component instead.,
    { listProps } = useSimpleList<ITrendingProducts>({
      resource: "trendingProducts",
      pagination: { pageSize: 5, currentPage: 1 },
      syncWithLocation: false,
    });

  return (
    <AntdList
      {...listProps}
      pagination={false}
      size="large"
      bordered={false}
      renderItem={(item, index) => {
        return (
          <AntdList.Item
            key={index}
            style={{
              borderBlockEnd: "none",
            }}
          >
            <Flex
              gap={24}
              style={{
                width: "100%",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "relative",
                }}
              >
                <Avatar
                  shape="square"
                  style={{
                    borderRadius: 24,
                  }}
                  size={{
                    xs: 64,
                    sm: 64,
                    md: 64,
                    lg: 108,
                    xl: 120,
                    xxl: 120,
                  }}
                  src={item.product?.images[0]?.url}
                />
                <div
                  style={{
                    position: "absolute",
                    top: 12,
                    right: -8,
                  }}
                >
                  {RankIcons[index + 1]}
                </div>
              </div>
              <Flex
                vertical
                gap="10px"
                justify="center"
                style={{
                  width: "100%",
                  overflow: "hidden",
                }}
              >
                <Flex vertical justify="center">
                  <div>
                    <Typography.Paragraph
                      ellipsis={{
                        rows: 1,
                        tooltip: {
                          placement: "top",
                          title: item.product?.name,
                        },
                      }}
                      style={{
                        margin: 0,
                        fontSize: 24,
                      }}
                      strong={index <= 2}
                    >
                      {item.product?.name}
                    </Typography.Paragraph>
                  </div>
                  <NumberField
                    type="secondary"
                    options={{
                      currency: "USD",
                      style: "currency",
                      notation: "standard",
                    }}
                    value={item.orderCount * item.product.price}
                  />
                </Flex>
                <Typography.Text
                  style={{
                    fontSize: 16,
                  }}
                  type="secondary"
                >
                  Ordered{" "}
                  <Typography.Text strong>{item.orderCount} </Typography.Text>
                  times
                </Typography.Text>
              </Flex>
            </Flex>
          </AntdList.Item>
        );
      }}
    />
  );
};

const RankIcons: Record<number, ReactNode> = {
  1: <Rank1Icon />,
  2: <Rank2Icon />,
  3: <Rank3Icon />,
  4: <Rank4Icon />,
  5: <Rank5Icon />,
};
