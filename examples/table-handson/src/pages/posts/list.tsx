import React from "react";
import { useTable, useUpdate, useSelect } from "@refinedev/core";
import { isEqual } from "lodash";
import { HotTable } from "@handsontable/react";
import { registerAllModules } from "handsontable/registry";
import "handsontable/dist/handsontable.full.min.css";

import type { ICategory, IPost } from "../../interfaces";

type Config = {
  column: number;
  sortOrder: "asc" | "desc";
};

type localCompareResult = -1 | 0 | 1;

export const PostList = () => {
  registerAllModules();

  const hotTableRef = React.useRef<any>(null);

  const [initialConfig, setInitialConfig] = React.useState<Config | Config[]>({
    column: 0,
    sortOrder: "asc",
  });

  const {
    tableQuery: {
      data: { data } = { data: [] },
    },
  } = useTable<IPost>({
    resource: "posts",

    pagination: {
      mode: "off",
    },
  });

  const categoryIds = new Set(data?.map((post) => post.category.id) ?? []);
  const { mutate } = useUpdate();

  const { options } = useSelect<ICategory>({
    resource: "categories",
    defaultValue: [...categoryIds],

    pagination: {
      mode: "server",
    },
  });

  const updateRow = (row: number, field: string, value: string) => {
    if (data) {
      const [id] = hotTableRef.current?.hotInstance?.getDataAtRow(row) ?? [];

      const original = data.find((post) => post.id === id);

      let values: Partial<IPost> = {
        ...original,
        [field]: value,
      };

      if (field === "category.id") {
        values = {
          ...values,
          category: {
            id: Number(value),
          },
        };
      }

      mutate({
        resource: "posts",
        id,
        values,
      });
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <HotTable
        licenseKey="non-commercial-and-evaluation"
        ref={hotTableRef}
        data={data}
        columnSorting={{
          sortEmptyCells: true,
          initialConfig,
        }}
        columns={[
          {
            data: "id",
            title: "ID",
            readOnly: true,
            width: 50,
            className: "htCenter",
          },
          {
            data: "title",
            title: "Title",
            type: "text",
            width: 300,
          },
          {
            data: "category.id",
            title: "Category",
            editor: "select",
            width: 200,

            renderer: (
              _instance: any,
              td: any,
              _row: any,
              _col: any,
              _prop: any,
              value: any,
            ) => {
              const category = options.find((option) => option.value === value);

              td.innerText = category?.label ?? "";
              return td;
            },
            selectOptions: Object.fromEntries(
              options.map((option) => [option.value, option.label]),
            ),
            columnSorting: {
              compareFunctionFactory(sortOrder: any) {
                return (a: any, b: any) => {
                  const optionA =
                    options.find((option) => option.value === a)?.label ?? "";
                  const optionB =
                    options.find((option) => option.value === b)?.label ?? "";
                  return sortOrder === "asc"
                    ? (optionA.localeCompare(optionB) as localCompareResult)
                    : (optionB.localeCompare(optionA) as localCompareResult);
                };
              },
            },
          },
          {
            data: "status",
            title: "Status",
            editor: "select",
            selectOptions: ["draft", "published", "rejected"],
            width: 200,
          },
        ]}
        afterChange={(changes: any, source: any) => {
          if (changes && source !== "loadData") {
            changes.forEach(([row, field, prev, next]: any) => {
              if (prev.toString() !== next.toString()) {
                updateRow(row, field as string, next);
              }
            });
          }
        }}
        fillHandle="vertical"
        afterColumnSort={(
          _currentSortConfig: any,
          destinationSortConfigs: any,
        ) => {
          if (!isEqual(destinationSortConfigs, initialConfig))
            setInitialConfig(destinationSortConfigs);
        }}
      />
    </div>
  );
};
