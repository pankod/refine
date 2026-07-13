import { Avatar, Flex, Table, Typography } from "antd";
import type { IOrder } from "../../../interfaces";
import { getUniqueListWithCount } from "../../../utils";
import { NumberField } from "@refinedev/antd";

type Props = {
  order?: IOrder;
};

export const OrderProducts = ({ order }: Props) => {
  const products = order?.products || [];
  const uniqueProducts = getUniqueListWithCount({
    list: products,
    field: "id",
  });

  return (
    <Table
      dataSource={uniqueProducts}
      loading={!order}
      pagination={false}
      scroll={{
        x: true,
      }}
      footer={(products) => {
        return (
          <Flex justify="flex-end" gap={16}>
            <Typography.Text>Total</Typography.Text>
            <NumberField
              value={products.reduce(
                (acc, product) => acc + product.count * product.price,
                0,
              )}
              options={{ style: "currency", currency: "USD" }}
            />
          </Flex>
        );
      }}
    >
      <Table.Column<(typeof uniqueProducts)[number]>
        title="Product"
        dataIndex="name"
        key="name"
        render={(_, record) => {
          const image = record.images?.[0];

          return (
            <Flex
              gap={16}
              align="center"
              style={{
                whiteSpace: "nowrap",
              }}
            >
              <Avatar
                shape="square"
                src={image?.thumbnailUrl || image?.url}
                alt={image?.name}
              />
              <Typography.Text>{record.name}</Typography.Text>
            </Flex>
          );
        }}
      />
      <Table.Column
        align="end"
        title="Quantity"
        dataIndex="count"
        key="count"
      />
      <Table.Column
        title="Price"
        dataIndex="price"
        align="end"
        key="price"
        render={(value) => {
          return (
            <NumberField
              value={value}
              style={{
                whiteSpace: "nowrap",
              }}
              options={{ style: "currency", currency: "USD" }}
            />
          );
        }}
      />
      <Table.Column<(typeof uniqueProducts)[number]>
        title="Total"
        dataIndex="id"
        align="end"
        key="total"
        render={(_, record) => {
          return (
            <NumberField
              value={record.count * record.price}
              options={{ style: "currency", currency: "USD" }}
              style={{
                whiteSpace: "nowrap",
              }}
            />
          );
        }}
      />
    </Table>
  );
};
