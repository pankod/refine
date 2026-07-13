import React from "react";
import type { Order } from "@medusajs/medusa";

import { OrderDetails } from "../OrderDetails";
import { Items } from "../Items";
import { PaymentDetails } from "../PaymentDetails";
import { ShippingDetails } from "../ShippingDetails";
import { Help } from "../Help";
import { OrderSummary } from "../OrderSummary";
import clsx from "clsx";

interface OrderCompletedTemplateProps {
  order: Order;
}

export const OrderCompletedTemplate: React.FC<OrderCompletedTemplateProps> = ({
  order,
}) => {
  return (
    <div className="min-h-[calc(100vh-64px)] py-6">
      <div className="flex w-full justify-start">
        <div className="h-full w-full">
          <div
            className={clsx(
              "grid",
              "grid-cols-10",
              "w-full",
              "gap-y-12",
              "lg:gap-12",
            )}
          >
            <div className={clsx("col-span-10", "lg:col-span-6")}>
              <OrderDetails order={order} />
              <div className="grid grid-cols-1 gap-4 border-b border-gray-200 py-4 lg:grid-cols-2">
                <PaymentDetails
                  payments={order.payments}
                  paymentStatus={order.payment_status}
                />
                <ShippingDetails
                  shippingMethods={order.shipping_methods}
                  address={order.shipping_address}
                />
              </div>
            </div>
            <div className={clsx("col-span-10", "lg:col-span-4")}>
              <Items
                items={order.items}
                region={order.region}
                cartId={order.cart_id}
              />
              <OrderSummary order={order} />
              <Help />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
