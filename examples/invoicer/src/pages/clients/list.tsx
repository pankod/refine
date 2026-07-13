import type { PropsWithChildren } from "react";
import { getDefaultFilter, useGo } from "@refinedev/core";
import {
  CreateButton,
  DeleteButton,
  EditButton,
  FilterDropdown,
  List,
  NumberField,
  getDefaultSortOrder,
  useSelect,
  useTable,
} from "@refinedev/antd";
import { Avatar, Flex, Input, Select, Table, Typography } from "antd";
import { EyeOutlined, SearchOutlined } from "@ant-design/icons";
import { API_URL } from "@/utils/constants";
import { getRandomColorFromString } from "@/utils/get-random-color";
import type { Client } from "@/types";

export const ClientsPageList = ({ children }: PropsWithChildren) => {
  const go = useGo();

  const { tableProps, filters, sorters } = useTable<Client>({
    sorters: {
      initial: [{ field: "updatedAt", order: "desc" }],
    },

    filters: {
      initial: [
        {
          field: "owner_email",
          operator: "contains",
          value: "",
        },
      ],
    },

    meta: {
      populate: ["account.logo", "invoices"],
    },
  });

  const { selectProps: selectPropsName } = useSelect({
    resource: "clients",
    optionLabel: "name",
    optionValue: "name",

    pagination: {
      mode: "server",
    },
  });

  const { selectProps: selectPropsOwnerName } = useSelect({
    resource: "clients",
    optionLabel: "owner_name",
    optionValue: "owner_name",

    pagination: {
      mode: "server",
    },
  });

  const { selectProps: selectPropsAccountName } = useSelect({
    resource: "accounts",
    optionLabel: "company_name",
    optionValue: "company_name",

    pagination: {
      mode: "server",
    },
  });

  return (
    <>
      <List
        title="Clients"
        headerButtons={() => {
          return (
            <CreateButton
              size="large"
              onClick={() =>
                go({
                  to: { resource: "clients", action: "create" },
                  options: { keepQuery: true },
                })
              }
            >
              Add new client
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
            title="Title"
            dataIndex="name"
            key="name"
            sorter
            defaultSortOrder={getDefaultSortOrder("name", sorters)}
            defaultFilteredValue={getDefaultFilter("name", filters, "in")}
            filterDropdown={(props) => (
              <FilterDropdown {...props}>
                <Select
                  mode="multiple"
                  placeholder="Search Name"
                  style={{ width: 220 }}
                  {...selectPropsName}
                />
              </FilterDropdown>
            )}
          />
          <Table.Column
            title="Owner"
            dataIndex="owner_name"
            key="owner_name"
            sorter
            defaultSortOrder={getDefaultSortOrder("owner_name", sorters)}
            defaultFilteredValue={getDefaultFilter("owner_name", filters, "in")}
            filterDropdown={(props) => (
              <FilterDropdown {...props}>
                <Select
                  mode="multiple"
                  placeholder="Search Owner"
                  style={{ width: 220 }}
                  {...selectPropsOwnerName}
                />
              </FilterDropdown>
            )}
          />
          <Table.Column
            title="Email"
            dataIndex="owner_email"
            key="owner_email"
            defaultFilteredValue={getDefaultFilter(
              "owner_email",
              filters,
              "contains",
            )}
            filterIcon={<SearchOutlined />}
            filterDropdown={(props) => {
              return (
                <FilterDropdown {...props}>
                  <Input placeholder="Search Email" />
                </FilterDropdown>
              );
            }}
          />
          <Table.Column
            title="Total"
            dataIndex="total"
            key="total"
            width={120}
            align="end"
            render={(_, record: Client) => {
              let total = 0;
              record.invoices?.forEach((invoice) => {
                total += invoice.total;
              });
              return (
                <NumberField
                  value={total}
                  options={{ style: "currency", currency: "USD" }}
                />
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
                  {...selectPropsAccountName}
                />
              </FilterDropdown>
            )}
            render={(_, record: Client) => {
              const logoUrl = record?.account?.logo?.url;
              const src = logoUrl ? `${API_URL}${logoUrl}` : null;
              const name = record?.account?.company_name || "";

              return (
                <Flex align="center" gap={8}>
                  <Avatar
                    alt={name}
                    src={src}
                    shape="square"
                    style={{
                      backgroundColor: src
                        ? "none"
                        : getRandomColorFromString(name),
                    }}
                  >
                    <Typography.Text>
                      {name?.[0]?.toUpperCase()}
                    </Typography.Text>
                  </Avatar>
                  <Typography.Text>{name}</Typography.Text>
                </Flex>
              );
            }}
          />
          <Table.Column
            title="Actions"
            key="actions"
            fixed="right"
            align="end"
            width={106}
            render={(_, record: Client) => {
              return (
                <Flex align="center" gap={8}>
                  <EditButton
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
      {children}
    </>
  );
};
