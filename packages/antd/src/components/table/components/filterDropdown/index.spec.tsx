import React from "react";
import { Input, DatePicker, Select } from "antd";
import dayjs from "dayjs";
import { render, fireEvent } from "@test";
import { vi } from "vitest";
import { FilterDropdown, type FilterDropdownProps } from "./";

describe("FilterDropdown", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const confirm = vi.fn();
  const clearFilters = vi.fn();
  const setSelectedKeys = vi.fn();
  const mapValueFn = vi.fn();
  const close = vi.fn();

  const props: FilterDropdownProps = {
    confirm,
    close,
    selectedKeys: [],
    setSelectedKeys,
    visible: false,
    prefixCls: "",
    filters: [],
    clearFilters,
    children: <></>,
  };

  it("should render successfully", () => {
    const { getByText } = render(
      <FilterDropdown {...props}>
        <Input />
      </FilterDropdown>,
    );
    getByText("Filter");
    getByText("Clear");
  });

  it("should render called confirm function successfully if click the filter button", async () => {
    const { getByText } = render(
      <FilterDropdown {...props}>
        <Input />
      </FilterDropdown>,
    );

    fireEvent.click(getByText("Filter"));

    expect(confirm).toHaveBeenCalled();
    expect(setSelectedKeys).toHaveBeenCalled();
  });

  it("should render called clearFilter function successfully if click the clear button", async () => {
    const { getByText } = render(
      <FilterDropdown {...props}>
        <Input />
      </FilterDropdown>,
    );

    fireEvent.click(getByText("Clear"));

    expect(clearFilters).toHaveBeenCalled();
  });

  it("should call mapValue", async () => {
    const { getByTestId } = render(
      <FilterDropdown {...props} mapValue={mapValueFn}>
        <Input data-testid="input" />
      </FilterDropdown>,
    );

    fireEvent.change(getByTestId("input"), {
      target: {
        value: "test",
      },
    });

    expect(mapValueFn).toHaveBeenCalled();
  });

  it("should render Date Picker successfully", () => {
    const { getByText } = render(
      <FilterDropdown
        {...props}
        mapValue={(selectedKeys) =>
          !selectedKeys
            ? ""
            : Array.isArray(selectedKeys)
              ? dayjs(selectedKeys[0] as string)
              : dayjs(selectedKeys)
        }
      >
        <DatePicker />
      </FilterDropdown>,
    );
    getByText("Filter");
    getByText("Clear");
  });

  it("should render with Date Picker called confirm function successfully if click the filter button", async () => {
    const { getByText } = render(
      <FilterDropdown
        {...props}
        mapValue={(selectedKeys) =>
          !selectedKeys
            ? ""
            : Array.isArray(selectedKeys)
              ? dayjs(selectedKeys[0] as string)
              : dayjs(selectedKeys)
        }
      >
        <DatePicker />
      </FilterDropdown>,
    );

    fireEvent.click(getByText("Filter"));

    expect(confirm).toHaveBeenCalled();
    expect(setSelectedKeys).toHaveBeenCalled();
  });

  it("should render with Date Picker called clearFilter function successfully if click the clear button", async () => {
    const { getByText } = render(
      <FilterDropdown
        {...props}
        mapValue={(selectedKeys) =>
          !selectedKeys
            ? ""
            : Array.isArray(selectedKeys)
              ? dayjs(selectedKeys[0] as string)
              : dayjs(selectedKeys)
        }
      >
        <DatePicker />
      </FilterDropdown>,
    );

    fireEvent.click(getByText("Clear"));

    expect(clearFilters).toHaveBeenCalled();
  });

  it("should call mapValue with Date Picker", async () => {
    const { getByTestId } = render(
      <FilterDropdown {...props} mapValue={mapValueFn}>
        <DatePicker data-testid="date-picker" />
      </FilterDropdown>,
    );

    fireEvent.change(getByTestId("date-picker"), dayjs());

    expect(mapValueFn).toHaveBeenCalled();
  });

  it("should mapValue works as expected", async () => {
    const Container = () => {
      const [keys, setKeys] = React.useState<any>("");

      return (
        <>
          <FilterDropdown
            {...props}
            visible={true}
            selectedKeys={keys}
            setSelectedKeys={(selectedKeys) => {
              setKeys(selectedKeys);
            }}
            mapValue={(selectedKeys, event) => {
              if (event === "onChange") {
                return "manipulated-with-onChange";
              }

              if (event === "value") {
                return "manipulated-with-value";
              }

              return selectedKeys;
            }}
          >
            <Input data-testid="input" />
          </FilterDropdown>
          <div data-testid="value">{keys}</div>
        </>
      );
    };

    const { getByTestId } = render(<Container />);

    fireEvent.change(getByTestId("input"), {
      target: {
        value: "123",
      },
    });

    expect(getByTestId("value").textContent).toBe("manipulated-with-onChange");
    expect(getByTestId("input")).toHaveValue("manipulated-with-value");
  });

  it("should render Select successfully", () => {
    const { getByText } = render(
      <FilterDropdown
        {...props}
        mapValue={(val) =>
          Array.isArray(val) ? val.map((i) => Number(i)) : Number(val)
        }
      >
        <Select />
      </FilterDropdown>,
    );
    getByText("Filter");
    getByText("Clear");
  });
});
