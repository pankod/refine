import React from "react";
import { useSelect } from "@refinedev/core";

export const DummyList: React.FC = () => {
  const { options } = useSelect<ICategory>({
    resource: "categories",

    pagination: {
      mode: "server",
    },
  });

  return (
    <select>
      {options?.map((category) => (
        <option key={category.value} value={category.value}>
          {category.label}
        </option>
      ))}
    </select>
  );
};

interface ICategory {
  id: string;
  title: string;
}
