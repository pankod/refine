import { useTranslate, useNavigation, useInfiniteList } from "@refinedev/core";
import { useSimpleList } from "@refinedev/antd";
import {
  Typography,
  List as AntdList,
  Tooltip,
  ConfigProvider,
  theme,
  Card,
  Col,
  Divider,
  Input,
  List,
  Row,
  Skeleton,
  Space,
  Spin,
} from "antd";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import InfiniteScroll from "react-infinite-scroll-component";
import type { IOrder } from "../../../interfaces";
import { OrderStatus } from "../../order/status";

dayjs.extend(relativeTime);

type Props = {
  height?: string;
};

export const OrderTimeline = ({ height = "432px" }: Props) => {
  const { token } = theme.useToken();
  const { show } = useNavigation();

  const {
    query: { isLoading, fetchNextPage },

    result: { data, hasNextPage },
  } = useInfiniteList<IOrder>({
    resource: "orders",
    sorters: [
      {
        field: "createdAt",
        order: "desc",
      },
    ],
    pagination: {
      currentPage: 1,
      pageSize: 8,
    },
  });

  const orders = data?.pages.flatMap((page) => page.data) || [];

  return (
    <div
      id="scrollableDiv"
      style={{
        display: "block",
        height: height,
        overflow: "auto",
      }}
    >
      <InfiniteScroll
        dataLength={orders.length}
        next={() => fetchNextPage()}
        hasMore={hasNextPage || false}
        loader={
          <Spin
            spinning
            style={{
              height: "56px",
              display: "flex",
              justifyContent: "center",
              marginTop: "16px",
            }}
          />
        }
        endMessage={<Divider plain>That&apos;s all, nothing more.</Divider>}
        scrollableTarget="scrollableDiv"
      >
        <List
          itemLayout="horizontal"
          dataSource={orders}
          renderItem={(item) => {
            return (
              <List.Item
                onClick={() => show("orders", item.id)}
                style={{
                  cursor: "pointer",
                  height: "54px",
                  padding: "16px",
                }}
                actions={[
                  <Typography.Text
                    style={{
                      color: token.colorTextDescription,
                    }}
                    key={"createdAt"}
                  >
                    {dayjs(item.createdAt).fromNow()}
                  </Typography.Text>,
                ]}
              >
                <Skeleton
                  style={{ display: "flex", width: "100%" }}
                  avatar={false}
                  title={false}
                  paragraph={{ rows: 1, width: "100%" }}
                  loading={isLoading}
                  active
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <div style={{ width: "128px" }}>
                      <OrderStatus status={item.status.text} />
                    </div>
                    <Typography.Text strong>
                      #{item.orderNumber}
                    </Typography.Text>
                  </div>
                </Skeleton>
              </List.Item>
            );
          }}
        />
      </InfiniteScroll>
    </div>
  );
};
