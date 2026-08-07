import React, { type ReactNode } from "react";
import { Button, Space, type TableColumnProps } from "antd";
import dayjs from "dayjs";
import { FilterOutlined } from "@ant-design/icons";
import { useTranslate } from "@refinedev/core";

type AntdFilterDropdownProps = React.ComponentProps<
  Exclude<TableColumnProps<any>["filterDropdown"], ReactNode>
>;

export type MapValueEvent = "onChange" | "value";

export type FilterDropdownProps = AntdFilterDropdownProps & {
  mapValue?: (selectedKeys: React.Key[], event: MapValueEvent) => any;
  children: React.JSX.Element;
};

/**
 * `<FilterDropdown>` is a helper component for {@link https://ant.design/components/table/#components-table-demo-custom-filter-panel filter dropdowns in Ant Design `<Table>` components.}
 *
 * @see {@link https://refine.dev/docs/ui-frameworks/antd/components/filter-dropdown} for more details.
 */
export const FilterDropdown: React.FC<FilterDropdownProps> = (props) => {
  const {
    setSelectedKeys,
    confirm,
    clearFilters,
    mapValue = (value) => value,
    selectedKeys,
    children,
  } = props;

  const translate = useTranslate();

  const clearFilter = () => {
    if (clearFilters) {
      clearFilters();
    }
  };

  const onFilter = () => {
    let keys;
    if (typeof selectedKeys === "number") {
      keys = `${selectedKeys}`;
    } else if (dayjs.isDayjs(selectedKeys)) {
      keys = [selectedKeys.toISOString()];
    } else {
      keys = selectedKeys;
    }

    setSelectedKeys(keys as any);
    confirm?.();
  };

  const onChange = (e: any) => {
    if (typeof e === "object") {
      if (Array.isArray(e)) {
        const mappedValue = mapValue(e, "onChange");
        return setSelectedKeys(mappedValue);
      }

      const changeEvent =
        !e || !e.target || dayjs.isDayjs(e) ? { target: { value: e } } : e;

      const { target }: React.ChangeEvent<HTMLInputElement> = changeEvent;
      const mappedValue = mapValue(target.value as any, "onChange");
      setSelectedKeys(mappedValue);
      return;
    }

    const mappedValue = mapValue(e, "onChange");
    setSelectedKeys(mappedValue);
  };

  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child as React.ReactElement<any>, {
        onChange,
        value: mapValue(selectedKeys, "value"),
      });
    }
    return child;
  });

  return (
    <div
      style={{
        padding: 10,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
      }}
    >
      <div style={{ marginBottom: 15 }}>{childrenWithProps}</div>
      <Space>
        <Button type="primary" size="small" onClick={() => onFilter()}>
          <FilterOutlined /> {translate("buttons.filter", "Filter")}
        </Button>
        <Button danger size="small" onClick={() => clearFilter()}>
          {translate("buttons.clear", "Clear")}
        </Button>
      </Space>
    </div>
  );
};
