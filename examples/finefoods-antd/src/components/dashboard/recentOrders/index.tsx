import { useNavigation } from "@refinedev/core";
import { NumberField, useTable } from "@refinedev/antd";
import { Typography, Table, theme, Space, Flex } from "antd";

import { OrderActions } from "../../../components";

import type { IOrder } from "../../../interfaces";
import { useStyles } from "./styled";
import { getUniqueListWithCount } from "../../../utils";

export const RecentOrders: React.FC = () => {
  const { token } = theme.useToken();
  const { styles } = useStyles();

  const { tableProps } = useTable<IOrder>({
    resource: "orders",
    syncWithLocation: false,

    pagination: {
      pageSize: 10,
    },

    filters: {
      permanent: [
        {
          field: "status.text",
          operator: "eq",
          value: "Pending",
        },
      ],
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

  const { show } = useNavigation();

  return (
    <Table
      {...tableProps}
      pagination={{
        ...tableProps.pagination,
        hideOnSinglePage: true,
        showSizeChanger: false,
        className: styles.pagination,
      }}
      showHeader={false}
      rowKey="id"
    >
      <Table.Column<IOrder>
        dataIndex="orderNumber"
        className={styles.column}
        render={(_, record) => (
          <Typography.Link
            strong
            onClick={() => show("orders", record.id)}
            style={{
              whiteSpace: "nowrap",
              color: token.colorTextHeading,
            }}
          >
            #{record.orderNumber}
          </Typography.Link>
        )}
      />
      <Table.Column<IOrder>
        dataIndex="id"
        className={styles.column}
        render={(_, record) => {
          return (
            <Space
              size={0}
              direction="vertical"
              style={{
                maxWidth: "220px",
              }}
            >
              <Typography.Text
                style={{
                  fontSize: 14,
                }}
              >
                {record?.user?.firstName} {record?.user?.lastName}
              </Typography.Text>
              <Typography.Text
                ellipsis
                style={{
                  fontSize: 12,
                }}
                type="secondary"
              >
                {record?.user?.addresses?.[0]?.text}
              </Typography.Text>
            </Space>
          );
        }}
      />
      <Table.Column<IOrder>
        dataIndex="products"
        className={styles.column}
        render={(products: IOrder["products"]) => {
          if (!products.length) {
            return <Typography.Text>-</Typography.Text>;
          }

          const uniqueProducts = getUniqueListWithCount<
            IOrder["products"][number]
          >({ list: products, field: "id" });

          return (
            <Space
              size={0}
              direction="vertical"
              style={{
                maxWidth: "220px",
              }}
            >
              {uniqueProducts.map((product) => (
                <Flex key={product.id} gap={4}>
                  <Typography.Text ellipsis>{product.name}</Typography.Text>
                  <span
                    style={{
                      color: token.colorTextSecondary,
                    }}
                  >
                    x{product.count}
                  </span>
                </Flex>
              ))}
            </Space>
          );
        }}
      />
      <Table.Column<IOrder>
        dataIndex="amount"
        className={styles.column}
        align="end"
        render={(amount) => {
          return (
            <NumberField
              value={amount}
              style={{
                whiteSpace: "nowrap",
              }}
              options={{
                style: "currency",
                currency: "USD",
              }}
            />
          );
        }}
      />
      <Table.Column<IOrder>
        fixed="right"
        key="actions"
        className={styles.column}
        align="end"
        render={(_, record) => <OrderActions record={record} />}
      />
    </Table>
  );
};
