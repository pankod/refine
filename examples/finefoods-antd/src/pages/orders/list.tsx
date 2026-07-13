import {
  useTranslate,
  useExport,
  useNavigation,
  type HttpError,
  getDefaultFilter,
} from "@refinedev/core";

import {
  List,
  useTable,
  getDefaultSortOrder,
  DateField,
  NumberField,
  useSelect,
  ExportButton,
  FilterDropdown,
} from "@refinedev/antd";
import { SearchOutlined } from "@ant-design/icons";
import { Table, Input, Select, Typography, theme, InputNumber } from "antd";

import {
  OrderStatus,
  OrderActions,
  PaginationTotal,
  OrderTableColumnProducts,
} from "../../components";
import type {
  IOrder,
  IOrderFilterVariables,
  IOrderStatus,
} from "../../interfaces";

export const OrderList = () => {
  const { token } = theme.useToken();

  const { tableProps, sorters, filters } = useTable<
    IOrder,
    HttpError,
    IOrderFilterVariables
  >({
    filters: {
      initial: [
        {
          field: "user.fullName",
          operator: "contains",
          value: "",
        },
        {
          field: "store.title",
          operator: "contains",
          value: "",
        },
      ],
    },
  });

  const t = useTranslate();
  const { show } = useNavigation();

  const { isLoading, triggerExport } = useExport<IOrder>({
    sorters,
    filters,
    pageSize: 50,
    maxItemCount: 50,
    mapData: (item) => {
      return {
        id: item.id,
        amount: item.amount,
        orderNumber: item.orderNumber,
        status: item.status.text,
        store: item.store.title,
        user: item.user.firstName,
      };
    },
  });

  const { selectProps: orderSelectProps } = useSelect<IOrderStatus>({
    resource: "orderStatuses",
    optionLabel: "text",
    optionValue: "text",
    defaultValue: getDefaultFilter("status.text", filters, "in"),

    pagination: {
      mode: "server",
    },
  });

  return (
    <List
      headerProps={{
        extra: <ExportButton onClick={triggerExport} loading={isLoading} />,
      }}
    >
      <Table
        {...tableProps}
        rowKey="id"
        style={{
          cursor: "pointer",
        }}
        onRow={(record) => {
          return {
            onClick: () => {
              show("orders", record.id);
            },
          };
        }}
        pagination={{
          ...tableProps.pagination,
          showTotal: (total) => (
            <PaginationTotal total={total} entityName="orders" />
          ),
        }}
      >
        <Table.Column
          key="orderNumber"
          dataIndex="orderNumber"
          title={t("orders.fields.order")}
          render={(value) => (
            <Typography.Text
              style={{
                whiteSpace: "nowrap",
              }}
            >
              #{value}
            </Typography.Text>
          )}
          filterIcon={(filtered) => (
            <SearchOutlined
              style={{
                color: filtered ? token.colorPrimary : undefined,
              }}
            />
          )}
          defaultFilteredValue={getDefaultFilter("orderNumber", filters, "eq")}
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <InputNumber
                addonBefore="#"
                style={{ width: "100%" }}
                placeholder={t("orders.filter.orderNumber.placeholder")}
              />
            </FilterDropdown>
          )}
        />
        <Table.Column<IOrder>
          key="status.text"
          dataIndex="status"
          title={t("orders.fields.status")}
          render={(status) => {
            return <OrderStatus status={status.text} />;
          }}
          sorter
          defaultSortOrder={getDefaultSortOrder("status.text", sorters)}
          defaultFilteredValue={getDefaultFilter("status.text", filters, "in")}
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <Select
                {...orderSelectProps}
                style={{ width: "200px" }}
                allowClear
                mode="multiple"
                placeholder={t("orders.filter.status.placeholder")}
              />
            </FilterDropdown>
          )}
        />
        <Table.Column<IOrder>
          key="products"
          dataIndex="products"
          title={t("orders.fields.products")}
          render={(_, record) => {
            return <OrderTableColumnProducts order={record} />;
          }}
        />
        <Table.Column
          align="right"
          key="amount"
          dataIndex="amount"
          title={t("orders.fields.amount")}
          defaultSortOrder={getDefaultSortOrder("amount", sorters)}
          sorter
          render={(value) => {
            return (
              <NumberField
                options={{
                  currency: "USD",
                  style: "currency",
                }}
                value={value}
              />
            );
          }}
        />
        <Table.Column
          key="store.title"
          dataIndex={["store", "title"]}
          title={t("orders.fields.store")}
          filterIcon={(filtered) => (
            <SearchOutlined
              style={{
                color: filtered ? token.colorPrimary : undefined,
              }}
            />
          )}
          defaultFilteredValue={getDefaultFilter(
            "store.title",
            filters,
            "contains",
          )}
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <Input placeholder={t("orders.filter.store.placeholder")} />
            </FilterDropdown>
          )}
        />
        <Table.Column
          key="user.fullName"
          dataIndex={["user", "fullName"]}
          title={t("orders.fields.customer")}
          filterIcon={(filtered) => (
            <SearchOutlined
              style={{
                color: filtered ? token.colorPrimary : undefined,
              }}
            />
          )}
          defaultFilteredValue={getDefaultFilter(
            "user.fullName",
            filters,
            "contains",
          )}
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <Input placeholder={t("orders.filter.customer.placeholder")} />
            </FilterDropdown>
          )}
        />
        <Table.Column
          key="createdAt"
          dataIndex="createdAt"
          title={t("orders.fields.createdAt")}
          render={(value) => <DateField value={value} format="LLL" />}
          sorter
        />
        <Table.Column<IOrder>
          fixed="right"
          title={t("table.actions")}
          dataIndex="actions"
          key="actions"
          align="center"
          render={(_value, record) => <OrderActions record={record} />}
        />
      </Table>
    </List>
  );
};
