"use client";

import { useContext } from "react";

import { BasketContext } from "@/context";

export const useBasketContext = () => {
  const basket = useContext(BasketContext);
  return basket;
};
