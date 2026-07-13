"use client";

import { useContext } from "react";

import { OrdersModalContext } from "@/context";

export const useOrdesModalContext = () => {
  const { ordersModalVisible, setOrdersModalVisible } =
    useContext(OrdersModalContext);
  return { ordersModalVisible, setOrdersModalVisible };
};
