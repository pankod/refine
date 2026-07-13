import React from "react";
import clsx from "clsx";
import { RadioGroup } from "@headlessui/react";
import { Controller, useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import type { Cart } from "@medusajs/medusa";

import { StepContainer, Radio, LoadingDots } from "@components";
import { Spinner } from "@components/icons";
import { useCheckout } from "@lib/context";

import s from "./Shipping.module.css";

interface ShippingProps {
  cart: Omit<Cart, "refundable_amount" | "refunded_total">;
}

interface ShippingFormProps {
  soId: string;
}

export const Shipping: React.FC<ShippingProps> = ({ cart }) => {
  const { shippingMethods, setShippingOption } = useCheckout();

  const {
    control,
    setError,
    formState: { errors },
  } = useForm<ShippingFormProps>({
    defaultValues: {
      soId: cart.shipping_methods?.[0]?.shipping_option_id,
    },
  });

  const submitShippingOption = (soId: string) => {
    try {
      setShippingOption(soId);
    } catch (error) {
      setError(
        "soId",
        {
          type: "validate",
          message: "An error occurred while adding shipping. Please try again.",
        },
        { shouldFocus: true },
      );
    }
  };

  const handleChange = (value: string, fn: (value: string) => void) => {
    submitShippingOption(value);
    fn(value);
  };

  const {
    sameAsBilling: { state: sameBilling },
  } = useCheckout();

  return (
    <StepContainer index={sameBilling ? 2 : 3} title="Delivery">
      <div className="bg-gray-normal h-px w-full" />
      <Controller
        name="soId"
        control={control}
        render={({ field: { value, onChange } }) => {
          return (
            <div className="py-4 relative w-full">
              <RadioGroup
                value={value}
                onChange={(value: string) => handleChange(value, onChange)}
              >
                {shippingMethods?.length ? (
                  shippingMethods.map((option) => {
                    return (
                      <RadioGroup.Option
                        key={option.value}
                        value={option.value}
                      >
                        <div
                          className={clsx(
                            "flex",
                            "items-center",
                            "justify-between",
                          )}
                        >
                          {/* <Radio checked={value === option.value} /> */}
                          <span
                            className={clsx(
                              "flex-1",
                              "text-base",
                              "font-semibold",
                              "text-gray-darkest",
                            )}
                          >
                            {option.label}
                          </span>
                          <span
                            className={clsx(
                              "flex-shrink-0",
                              "text-base",
                              "text-gray-darker",
                            )}
                          >
                            {option.price}
                          </span>
                        </div>
                      </RadioGroup.Option>
                    );
                  })
                ) : (
                  <div
                    className={clsx(
                      "py-4",
                      "mx-auto",
                      "flex",
                      "justify-center",
                    )}
                  >
                    <LoadingDots />
                  </div>
                )}
              </RadioGroup>
              <ErrorMessage
                errors={errors}
                name="soId"
                render={({ message }) => {
                  return (
                    <div className="text-small-regular text-magenta pt-2">
                      <span>{message}</span>
                    </div>
                  );
                }}
              />
            </div>
          );
        }}
      />
    </StepContainer>
  );
};
