"use client";
import { useRef } from "react";
import { useCreate, useGo } from "@refinedev/core";
import { CloseIcon, OrderIcon } from "@/components/icons";
import { useOrdesModalContext } from "@/hooks/useOrdersModalContext";
import { useBasketContext } from "@/hooks/useBasketContext";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import type { Order } from "@/types";

export const OrdersModal: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const go = useGo();
  const { setOrdersModalVisible } = useOrdesModalContext();
  const { orders, totalPrice, products, dispatch } = useBasketContext();
  const { mutate } = useCreate<Order>({
    resource: "orders",
    successNotification: false,
    mutationOptions: {
      onSuccess: (data) => {
        go({
          to: {
            resource: "orders",
            id: data.data.id,
            action: "show",
          },
          type: "replace",
        });
        setOrdersModalVisible(false);
        dispatch({
          type: "resetBasket",
        });
      },
    },
  });

  const handleClickOutside = () => {
    setOrdersModalVisible(false);
  };
  useOnClickOutside(ref, handleClickOutside);

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black opacity-40" />
      <div className="fixed inset-0 z-50 flex items-center">
        <div
          ref={ref}
          className="mx-auto max-h-[95%] w-[500px] overflow-auto rounded-lg bg-white shadow-lg"
        >
          <div className="bg-primary relative p-2">
            <button
              className="absolute right-2 top-2 p-1 transition-all hover:bg-orange-500 active:scale-90"
              onClick={() => setOrdersModalVisible(false)}
            >
              <CloseIcon className="h-6 w-6 text-white" />
            </button>
            <OrderIcon />
          </div>
          <div className="p-4">
            <div className="flex flex-col gap-2">
              {orders.length ? (
                orders.map((order) => {
                  const { amount, productId } = order;
                  const product = products.find((p) => p.id === productId);
                  return (
                    <div
                      key={order.productId}
                      className="flex items-center justify-between border-b p-1"
                    >
                      <div className="flex items-center gap-2">
                        <img
                          className="h-12 w-12 rounded-full object-cover object-center"
                          src={product?.images[0].url}
                          alt={product?.name}
                        />
                        <p>{product?.name}</p>
                      </div>
                      <div className="flex-none">
                        <span className="font-semibold">
                          ${product?.price ?? 0}
                        </span>{" "}
                        x {amount}
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="flex h-48 items-center justify-center text-xl font-bold text-gray-500">
                  No have any items.
                </p>
              )}
            </div>
            <div className="mt-2 flex flex-col items-end gap-2">
              <div className="flex items-center justify-center gap-2">
                Total:
                <span className="text-lg font-bold text-gray-800">
                  {orders.length} items / ${totalPrice}
                </span>
              </div>
              <button
                onClick={() =>
                  mutate({
                    values: {
                      products,
                      amount: totalPrice,
                    },
                  })
                }
                className="bg-primary border-primary rounded-md border px-4 text-lg font-bold text-white transition-all hover:bg-orange-500 active:scale-95"
              >
                Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
