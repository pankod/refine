import React from "react";
import Column from "../components/columns";
import Cards from "../components/cards";
import { useState, useEffect } from "react";
import { ColumnTypes } from "components/constants/enums";
import { Space } from "antd";
import useData from "components/constants/useData";

function DashboardPage() {
  const [newArr, products] = useData();
  const [orders, setOrders] = useState<any[] | undefined>([]);

  //creating side effects based on the data's response.
  useEffect(() => {
    setOrders(newArr);
  }, [products]);

  const columnItem = (columnName: string) => {
    return orders
      ?.filter((order) => order.column === columnName)
      .map((order, index) => (
        <Cards
          key={order.id}
          name={order.name}
          material={order.material}
          setOrders={setOrders}
          index={index}
        />
      ));
  };

  const { ORDERS, IN_PROGRESS, DELIVERED, RETURNED } = ColumnTypes;

  return (
    <div className="App">
      <Space
        direction="horizontal"
        align="baseline"
        size={109}
        style={{
          display: "flex",
          marginLeft: "20px",
          marginTop: "20px",
          gap: "7rem",
        }}
      >
        <Column name={ORDERS}>{columnItem(ORDERS)}</Column>
        <Column name={IN_PROGRESS}>{columnItem(IN_PROGRESS)}</Column>
        <Column name={DELIVERED}>{columnItem(DELIVERED)}</Column>
        <Column name={RETURNED}>{columnItem(RETURNED)}</Column>
      </Space>
    </div>
  );
}

export default DashboardPage;
