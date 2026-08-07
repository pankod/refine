import { getDefaultFilter, useGo } from "@refinedev/core";
import {
  CreateButton,
  DateField,
  DeleteButton,
  FilterDropdown,
  List,
  NumberField,
  ShowButton,
  getDefaultSortOrder,
  useSelect,
  useTable,
} from "@refinedev/antd";
import { Avatar, Flex, Input, Select, Table, Typography } from "antd";
import { EyeOutlined, SearchOutlined } from "@ant-design/icons";
import { API_URL } from "@/utils/constants";
import { getRandomColorFromString } from "@/utils/get-random-color";
import type { Invoice } from "@/types";

export const InvoicePageList = () => {
  const go = useGo();

  const { tableProps, filters, sorters } = useTable<Invoice>({
    meta: {
      populate: ["client", "account.logo"],
    },

    sorters: {
      initial: [{ field: "updatedAt", order: "desc" }],
    },
  });

  const { selectProps: selectPropsAccounts } = useSelect({
    resource: "accounts",
    optionLabel: "company_name",
    optionValue: "company_name",

    pagination: {
      mode: "server",
    },
  });

  const { selectProps: selectPropsClients } = useSelect({
    resource: "clients",
    optionLabel: "name",
    optionValue: "name",

    pagination: {
      mode: "server",
    },
  });

  return (
    <List
      title="Invoices"
      headerButtons={() => {
        return (
          <CreateButton
            size="large"
            onClick={() =>
              go({
                to: { resource: "invoices", action: "create" },
                options: { keepQuery: true },
              })
            }
          >
            Add new invoice
          </CreateButton>
        );
      }}
    >
      <Table
        {...tableProps}
        rowKey={"id"}
        pagination={{
          ...tableProps.pagination,
          showSizeChanger: true,
        }}
        scroll={{ x: 960 }}
      >
        <Table.Column
          title="ID"
          dataIndex="id"
          key="id"
          width={80}
          defaultFilteredValue={getDefaultFilter("id", filters)}
          filterIcon={<SearchOutlined />}
          filterDropdown={(props) => {
            return (
              <FilterDropdown {...props}>
                <Input placeholder="Search ID" />
              </FilterDropdown>
            );
          }}
        />
        <Table.Column
          title="Account"
          dataIndex="account.company_name"
          key="account.company_name"
          defaultFilteredValue={getDefaultFilter(
            "account.company_name",
            filters,
            "in",
          )}
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <Select
                mode="multiple"
                placeholder="Search Account"
                style={{ width: 220 }}
                {...selectPropsAccounts}
              />
            </FilterDropdown>
          )}
          render={(_, record: Invoice) => {
            const logoUrl = record?.account?.logo?.url;
            const src = logoUrl ? `${API_URL}${logoUrl}` : undefined;
            const name = record?.account?.company_name;

            return (
              <Flex align="center" gap={8}>
                <Avatar
                  alt={name}
                  src={src}
                  shape="square"
                  style={{
                    backgroundColor: src
                      ? "none"
                      : getRandomColorFromString(name || ""),
                  }}
                >
                  <Typography.Text>{name?.[0]?.toUpperCase()}</Typography.Text>
                </Avatar>
                <Typography.Text>{name}</Typography.Text>
              </Flex>
            );
          }}
        />
        <Table.Column
          title="Client"
          dataIndex="client.name"
          key="client.name"
          render={(_, record: Invoice) => {
            return <Typography.Text>{record.client?.name}</Typography.Text>;
          }}
          defaultFilteredValue={getDefaultFilter("company_name", filters, "in")}
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <Select
                mode="multiple"
                placeholder="Search Company Name"
                style={{ width: 220 }}
                {...selectPropsClients}
              />
            </FilterDropdown>
          )}
        />
        <Table.Column
          title="Date"
          dataIndex="date"
          key="date"
          width={120}
          sorter
          defaultSortOrder={getDefaultSortOrder("date", sorters)}
          render={(date) => {
            return <DateField value={date} format="D MMM YYYY" />;
          }}
        />
        <Table.Column
          title="Total"
          dataIndex="total"
          key="total"
          width={132}
          align="end"
          sorter
          defaultSortOrder={getDefaultSortOrder("total", sorters)}
          render={(total) => {
            return (
              <NumberField
                value={total}
                options={{ style: "currency", currency: "USD" }}
              />
            );
          }}
        />
        <Table.Column
          title="Actions"
          key="actions"
          fixed="right"
          align="end"
          width={102}
          render={(_, record: Invoice) => {
            return (
              <Flex align="center" gap={8}>
                <ShowButton
                  hideText
                  recordItemId={record.id}
                  icon={<EyeOutlined />}
                />
                <DeleteButton hideText recordItemId={record.id} />
              </Flex>
            );
          }}
        />
      </Table>
    </List>
  );
};
