import React, { useMemo } from "react";
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
} from "@stripe/react-stripe-js";
import type {
  StripeCardCvcElementOptions,
  StripeCardExpiryElementOptions,
  StripeCardNumberElementOptions,
} from "@stripe/stripe-js";

import s from "./PaymentStripe.module.css";
import clsx from "clsx";

export const PaymentStripe: React.FC = () => {
  const useOptions:
    | StripeCardNumberElementOptions
    | StripeCardExpiryElementOptions
    | StripeCardCvcElementOptions = useMemo(() => {
    return {
      classes: {
        base: clsx(
          "text-gray-darkest",
          "py-3",
          "px-3",
          "rounded-lg",
          "border border-gray-dark",
        ),
      },
      style: {
        base: {
          fontFamily: "Inter, sans-serif",
          color: "#424270",
          padding: "10px 12px",
          "::placeholder": {
            color: "#CFD7E0",
          },
        },
      },
    };
  }, []);

  return (
    <div>
      <div className="relative flex w-full flex-col gap-8">
        <CardNumber options={useOptions as StripeCardNumberElementOptions} />
        <div className="relative flex items-center gap-8">
          <CardExpiry options={useOptions as StripeCardExpiryElementOptions} />
          <CardCVC options={useOptions as StripeCardCvcElementOptions} />
        </div>
      </div>
    </div>
  );
};

const CardNumber = ({
  options,
}: {
  options: StripeCardNumberElementOptions;
}) => {
  return (
    <div className={clsx("flex", "flex-col", "gap-2")}>
      <span className={clsx("text-gray-darkest")}>Card number</span>
      <CardNumberElement
        options={{
          ...options,
        }}
      />
    </div>
  );
};

const CardExpiry = ({
  options,
}: {
  options: StripeCardExpiryElementOptions;
}) => {
  return (
    <div className={clsx("flex", "flex-col", "gap-2", "w-40")}>
      <span className={clsx("text-gray-darkest")}>Expiration date</span>
      <CardExpiryElement options={options} />
    </div>
  );
};

const CardCVC = ({ options }: { options: StripeCardCvcElementOptions }) => {
  return (
    <div className={clsx("flex", "flex-col", "gap-2", "w-40")}>
      <span className={clsx("text-gray-darkest")}>CVC</span>
      <CardCvcElement options={{ ...options, placeholder: "123" }} />
    </div>
  );
};
