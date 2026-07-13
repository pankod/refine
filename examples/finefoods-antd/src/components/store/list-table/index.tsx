import { useTranslate, getDefaultFilter } from "@refinedev/core";
import {
  useTable,
  ShowButton,
  FilterDropdown,
  getDefaultSortOrder,
  EditButton,
} from "@refinedev/antd";
import { Input, InputNumber, Select, Table, Typography, theme } from "antd";
import type { IStore } from "../../../interfaces";
import { PaginationTotal } from "../../../components";
import { EyeOutlined, SearchOutlined } from "@ant-design/icons";
import { StoreStatus } from "../../../components/store";

export const StoreListTable = () => {
  const { token } = theme.useToken();
  const t = useTranslate();

  const { tableProps, sorters, filters } = useTable<IStore>({
    filters: {
      initial: [
        {
          field: "title",
          operator: "contains",
          value: "",
        },
        {
          field: "email",
          operator: "contains",
          value: "",
        },
      ],
    },
  });

  return (
    <Table
      {...tableProps}
      rowKey="id"
      scroll={{
        x: true,
      }}
      pagination={{
        ...tableProps.pagination,
        showTotal: (total) => (
          <PaginationTotal total={total} entityName="stores" />
        ),
      }}
    >
      <Table.Column
        dataIndex="id"
        width={80}
        title={
          <Typography.Text
            style={{
              whiteSpace: "nowrap",
            }}
          >
            ID #
          </Typography.Text>
        }
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
        defaultFilteredValue={getDefaultFilter("id", filters, "eq")}
        filterDropdown={(props) => (
          <FilterDropdown {...props}>
            <InputNumber
              addonBefore="#"
              style={{ width: "100%" }}
              placeholder={t("stores.filter.id.placeholder")}
            />
          </FilterDropdown>
        )}
      />
      <Table.Column
        dataIndex="title"
        title={t("stores.fields.title")}
        filterIcon={(filtered) => (
          <SearchOutlined
            style={{
              color: filtered ? token.colorPrimary : undefined,
            }}
          />
        )}
        defaultFilteredValue={getDefaultFilter("title", filters, "contains")}
        filterDropdown={(props) => (
          <FilterDropdown {...props}>
            <Input placeholder={t("stores.filter.title.placeholder")} />
          </FilterDropdown>
        )}
      />
      <Table.Column
        dataIndex="email"
        title={t("stores.fields.email")}
        filterIcon={(filtered) => (
          <SearchOutlined
            style={{
              color: filtered ? token.colorPrimary : undefined,
            }}
          />
        )}
        defaultFilteredValue={getDefaultFilter("email", filters, "contains")}
        filterDropdown={(props) => (
          <FilterDropdown {...props}>
            <Input placeholder={t("stores.filter.email.placeholder")} />
          </FilterDropdown>
        )}
      />
      <Table.Column
        dataIndex="gsm"
        title={t("stores.fields.gsm")}
        render={(value) => (
          <Typography.Text
            style={{
              whiteSpace: "nowrap",
            }}
          >
            {value}
          </Typography.Text>
        )}
      />
      <Table.Column
        dataIndex={["address", "text"]}
        title={t("stores.fields.address")}
      />
      <Table.Column
        dataIndex="isActive"
        title={t("stores.fields.isActive.label")}
        sorter
        defaultSortOrder={getDefaultSortOrder("isActive", sorters)}
        defaultFilteredValue={getDefaultFilter("isActive", filters, "in")}
        filterDropdown={(props) => (
          <FilterDropdown {...props}>
            <Select
              style={{ width: "200px" }}
              allowClear
              mode="multiple"
              placeholder={t("stores.filter.isActive.placeholder")}
            >
              <Select.Option value="true">
                {t("stores.fields.isActive.true")}
              </Select.Option>
              <Select.Option value="false">
                {t("stores.fields.isActive.false")}
              </Select.Option>
            </Select>
          </FilterDropdown>
        )}
        render={(value) => <StoreStatus value={value} />}
      />
      <Table.Column<IStore>
        fixed="right"
        title={t("table.actions")}
        dataIndex="actions"
        key="actions"
        align="center"
        render={(_, record) => (
          <EditButton
            icon={<EyeOutlined />}
            recordItemId={record.id}
            hideText
          />
        )}
      />
    </Table>
  );
};
