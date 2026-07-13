"use client";

import { type UseShowProps, useShow } from "@refinedev/core";
import { useLayoutEffect } from "react";
import JSConfetti from "js-confetti";
import { FastMotocycleIcon, OrderIcon } from "@/components/icons";
import { TRANSLATIONS_BON_APPETIT } from "@/constants";
import type { Order } from "@/types";
import dayjs from "dayjs";

type OrderPageProps = {
  useShowProps?: UseShowProps<Order>;
};

export const OrderDetail: React.FC<OrderPageProps> = ({ useShowProps }) => {
  const { query: queryResult } = useShow<Order>({
    resource: "orders",
    ...useShowProps,
  });
  const order = queryResult.data?.data;

  useLayoutEffect(() => {
    const jsConfetti = new JSConfetti();
    setTimeout(() => {
      jsConfetti.addConfetti();
    }, 500);
  }, []);

  if (!order) {
    return null;
  }

  return (
    <div className="container mt-8 overflow-hidden rounded-xl bg-white">
      <div className="flex flex-wrap items-center justify-center  gap-4 bg-green-600 px-8 py-4 text-white sm:justify-start">
        <OrderIcon />
        <h1 className="main-title text-center text-3xl font-bold uppercase md:text-5xl">
          Order received
        </h1>
        <a
          className=" border-white text-white rounded-full border-2 px-4 py-2 font-semibold transition-all hover:border-orange-600 hover:text-orange-600 active:scale-95 block ml-auto mr-auto sm:mr-0"
          href={`https://example.admin.refine.dev/orders/${order.id}`}
          target="_blank"
          rel="noreferrer"
        >
          Manage the order
        </a>
      </div>
      <div className="p-4">
        <h1 className="text-3xl font-bold text-gray-800">Order Summary</h1>
        <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:gap-16">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <h4 className="text-lg font-bold text-gray-700">Order Number:</h4>
              <p>#{order.orderNumber}</p>
            </div>
            <div className="flex items-center gap-2">
              <h4 className="text-lg font-bold text-gray-700">Order Date:</h4>
              <p>{dayjs(order.createdAt).format("DD.MM.YYYY HH:mm")}</p>
            </div>
            <div className="flex items-center gap-2">
              <h4 className="text-lg font-bold text-gray-700">Total:</h4>
              <p>{order.products.reduce((a, b) => a + b.price, 0) / 100}</p>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-bold text-gray-700">Order Details</h4>
            {order.products.map((product, index) => (
              <p key={product.id}>
                <strong>{index + 1}. </strong>
                {product.name}
              </p>
            ))}
          </div>
        </div>
      </div>
      <hr />
      <div className="p-4">
        <h1 className="text-3xl font-bold text-gray-800">Delivery Details</h1>
        <div className="mt-2 flex flex-col gap-2 lg:flex-row lg:gap-16 justify-between">
          <div className="flex flex-col gap-2">
            <h4 className="text-lg font-bold text-gray-700">Address</h4>
            <p>{order.adress.text}</p>
            <h4 className="text-lg font-bold text-gray-700">
              Estimated Delivery Time
            </h4>
            <p>12:55</p>
          </div>
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <div className="relative flex gap-4 md:mt-0 items-center">
              <FastMotocycleIcon />
              <p>
                <strong>{order.courier.name}</strong> will deliver your order in
                30 minutes.
              </p>
            </div>
            <img
              className="h-32 w-32 rounded-full"
              src={order.courier.avatar[0].url}
              alt={order.courier.name}
            />
          </div>
        </div>
      </div>
      <hr />
      <div className="flex flex-wrap items-center justify-start gap-1 p-8 opacity-50 md:justify-center">
        {TRANSLATIONS_BON_APPETIT.map((p, index) => (
          <p
            key={p}
            className="text-2xl"
            style={{
              fontWeight: index % 2 === 0 ? 800 : 500,
            }}
          >
            {p}
          </p>
        ))}
      </div>
    </div>
  );
};
