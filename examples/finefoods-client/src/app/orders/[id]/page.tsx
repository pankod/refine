import React from "react";
import type { GetOneResponse } from "@refinedev/core";
import { dataProvider } from "@/providers/data-provider/server";
import type { Order } from "@/types";
import { redirect } from "next/navigation";
import { OrderDetail } from "@/components/orders";

type OrderShowPagePageProps = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function OrderShowPage({
  params,
}: OrderShowPagePageProps) {
  const { order } = await getData({
    orderId: params.id,
  });

  if (!order) {
    return redirect("/");
  }

  return (
    <OrderDetail
      useShowProps={{
        id: params.id,
        queryOptions: {
          initialData: order,
        },
      }}
    />
  );
}

type GetDataProps = {
  orderId: string;
};

async function getData(props: GetDataProps) {
  try {
    const orderData: GetOneResponse<Order> = await dataProvider.getOne({
      resource: "orders",
      id: props.orderId,
    });

    return {
      order: orderData,
    };
  } catch (error) {
    return {
      order: null,
    };
  }
}
