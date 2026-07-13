"use client";

import React from "react";
import Link from "next/link";
import { BasketIcon, FinefoodsIcon } from "@/components/icons";
import { useBasketContext } from "@/hooks/useBasketContext";
import { useOrdesModalContext } from "@/hooks/useOrdersModalContext";

export const Header: React.FC = () => {
  const { setOrdersModalVisible } = useOrdesModalContext();
  const { orders, totalPrice } = useBasketContext();
  const isBasketHaveOrders = orders.length > 0;

  return (
    <header className="bg-primary sticky top-0 z-50 shadow-lg">
      <div className="container flex h-full items-center justify-between px-2 md:px-0">
        <Link href="/" className="flex gap-4">
          <FinefoodsIcon className="text-white" />
        </Link>
        <div
          className="flex cursor-pointer items-center gap-2"
          onClick={() => setOrdersModalVisible((prev: boolean) => !prev)}
        >
          {isBasketHaveOrders && (
            <div className="text-lg font-semibold text-white">
              {isBasketHaveOrders && `${orders.length} items /`}{" "}
              <span className="text-xl font-extrabold">${totalPrice}</span>
            </div>
          )}
          <BasketIcon className="h-6 w-6" />
        </div>
      </div>
    </header>
  );
};
