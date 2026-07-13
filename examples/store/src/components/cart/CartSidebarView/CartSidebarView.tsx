import React from "react";
import { useRouter } from "next/router";
import { formatAmount } from "medusa-react";

import { useUI } from "@lib/context";
import {
  CartItem,
  Button,
  SidebarLayout,
  SkeletonCartSidebar,
} from "@components";
import { useCartContext } from "@lib/context/";

import s from "./CartSidebarView.module.css";
import clsx from "clsx";

export const CartSidebarView: React.FC = () => {
  const { closeSidebar } = useUI();
  const router = useRouter();

  const { cart, cartIsFetching } = useCartContext();

  const isEmpty = cart?.items.length === 0;

  const goToCheckout = () => {
    closeSidebar();
    router.push("/checkout");
  };
  const handleClose = () => closeSidebar();

  if (!cart) {
    return null;
  }

  const getAmount = (amount: number | undefined | null) => {
    return formatAmount({
      amount: amount || 0,
      region: cart.region,
    });
  };

  return (
    <SidebarLayout title="My Cart" handleClose={handleClose}>
      {isEmpty && cartIsFetching ? (
        <SkeletonCartSidebar />
      ) : isEmpty ? (
        <div className="flex flex-1 flex-col items-center justify-center px-4">
          <EmptyIcon className="mb-10" />
          <p className={clsx("text-base", "text-gray-darker", "pb-2")}>
            Your cart is empty.
          </p>
          <p className={clsx("text-base", "text-gray-darker")}>
            Add items to continue
          </p>
        </div>
      ) : (
        <>
          <div className="flex-1">
            <ul className={s.lineItemsList}>
              {cart.items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </ul>
          </div>

          <div
            className={clsx(
              "bg-accent-0 sticky bottom-0 left-0 right-0 z-20 w-full flex-shrink-0 border-t px-6 py-6 text-sm sm:px-6",
              "border-t border-t-gray-light",
            )}
          >
            <Button
              Component="a"
              width="100%"
              onClick={goToCheckout}
              className={clsx("rounded-lg", "font-normal", "p-5")}
            >
              Proceed to Checkout ({getAmount(cart.subtotal)})
            </Button>
          </div>
        </>
      )}
    </SidebarLayout>
  );
};

const EmptyIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={152}
    height={128}
    fill="none"
    {...props}
  >
    <ellipse cx={76} cy={104.002} fill="url(#a)" rx={76} ry={24} />
    <path
      fill="#CFD7E2"
      d="M34.673 6.366a8 8 0 0 1 7.832-6.368h66.99a8 8 0 0 1 7.832 6.368l16.666 80c1.035 4.968-2.757 9.632-7.831 9.632H25.838c-5.074 0-8.866-4.664-7.831-9.632l16.666-80Z"
    />
    <path
      fill="url(#b)"
      d="M34.673 6.366a8 8 0 0 1 7.832-6.368h66.99a8 8 0 0 1 7.832 6.368l16.666 80c1.035 4.968-2.757 9.632-7.831 9.632H25.838c-5.074 0-8.866-4.664-7.831-9.632l16.666-80Z"
    />
    <circle cx={52} cy={16.002} r={7.5} fill="#fff" stroke="#A3ADC2" />
    <circle cx={100} cy={16.002} r={7.5} fill="#fff" stroke="#A3ADC2" />
    <path
      stroke="#A3ADC2"
      strokeWidth={2}
      d="M100 16.002c0 13.255-10.745 24-24 24s-24-10.745-24-24"
    />
    <circle cx={52} cy={16.002} r={4} fill="#6C7793" />
    <circle cx={100} cy={16.002} r={4} fill="#6C7793" />
    <defs>
      <radialGradient
        id="a"
        cx={0}
        cy={0}
        r={1}
        gradientTransform="matrix(76 0 0 24 76 104.002)"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset={0.504} stopColor="#CFD7E2" stopOpacity={0.5} />
        <stop offset={1} stopColor="#CFD7E2" stopOpacity={0} />
      </radialGradient>
      <linearGradient
        id="b"
        x1={76}
        x2={76}
        y1={-0.002}
        y2={111.998}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#DEE5ED" />
        <stop offset={1} stopColor="#A3ADC2" stopOpacity={0.5} />
      </linearGradient>
    </defs>
  </svg>
);
