import React, { useMemo } from "react";
import { formatAmount } from "medusa-react";
import type { Cart } from "@medusajs/medusa";
import { useForm } from "react-hook-form";
import { useDelete, useInvalidate, useUpdate } from "@refinedev/core";

import { Cross } from "@components/icons";
import { Input, Button } from "@components";
import { IconCoupon } from "@components/icons/icon-coupon";
import clsx from "clsx";

interface DiscountFormValues {
  discount_code: string;
}

interface DiscountCodeProps {
  cart: Omit<Cart, "refundable_amount" | "refunded_total">;
}

export const DiscountCode: React.FC<DiscountCodeProps> = ({ cart }) => {
  const [view, setView] = React.useState<"pre" | "form" | "post">("pre");
  const { id, discounts, region } = cart;
  const invalidate = useInvalidate();
  const { mutate: removeDiscount } = useDelete();

  const appliedDiscount = useMemo(() => {
    if (!discounts || !discounts.length) {
      return undefined;
    }

    switch (discounts[0].rule.type) {
      case "percentage":
        return `${discounts[0].rule.value}%`;
      case "fixed":
        return `- ${formatAmount({
          amount: discounts[0].rule.value,
          region: region,
        })}`;

      default:
        return "Free shipping";
    }
  }, [discounts, region]);

  React.useEffect(() => {
    if (appliedDiscount && view === "pre") {
      setView("post");
    }
  }, [appliedDiscount]);

  const onRemove = () => {
    removeDiscount(
      {
        resource: `carts/${id}/discounts/${discounts[0].code}`,
        id: "",
      },
      {
        onSuccess: () => {
          invalidate({
            resource: "carts",
            invalidates: ["detail"],
            id,
          });
          setView("pre");
        },
      },
    );
  };

  return (
    <div className="flex w-full flex-col">
      <PrediscountView
        active={view === "pre"}
        onClick={() => setView("form")}
      />
      <DiscountForm
        active={view === "form"}
        onClose={() => setView("pre")}
        onSuccess={() => setView("post")}
        cart={cart}
      />
      <AppliedDiscount
        active={view === "post"}
        onRemove={onRemove}
        appliedDiscount={appliedDiscount}
      />
    </div>
  );
};

const PrediscountView = ({
  active,
  onClick,
}: {
  active: boolean;
  onClick: () => void;
}) => {
  if (!active) return null;

  return (
    <div className={clsx("py-4", "flex", "items-center", "justify-start")}>
      <button
        type="button"
        className={clsx(
          "rounded-lg",
          "bg-gray-lighter",
          "hover:bg-gray-light",
          "active:bg-gray-lighter",
          "flex",
          "items-center",
          "justify-start",
          "gap-3",
          "py-3",
          "pl-3",
          "pr-5",
          "text-gray-darker",
        )}
        onClick={onClick}
      >
        <IconCoupon />
        <span className={clsx("text-base", "font-normal", "text-gray-darker")}>
          Add discount code
        </span>
      </button>
    </div>
  );
};

const DiscountForm = ({
  active,
  cart,
  onClose,
  onSuccess,
}: {
  active: boolean;
  cart: Omit<Cart, "refundable_amount" | "refunded_total">;
  onClose: () => void;
  onSuccess: () => void;
}) => {
  const { id } = cart;
  const {
    mutate,
    mutation: { isLoading },
  } = useUpdate({
    resource: "carts",
    id,
    mutationOptions: {
      onSuccess: async () => {
        await invalidate({
          resource: "carts",
          invalidates: ["detail"],
          id,
        });
        onSuccess();
      },
      onError: (err) => {
        setError(
          "discount_code",
          {
            message: err.message,
          },
          {
            shouldFocus: true,
          },
        );
      },
    },
  });
  const invalidate = useInvalidate();

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, touchedFields },
  } = useForm<DiscountFormValues>();

  const onApply = (data: DiscountFormValues) => {
    mutate({
      values: {
        discounts: [{ code: data.discount_code }],
      },
    });
  };

  React.useEffect(() => {
    if (!active) {
      reset();
    }
  }, [active]);

  if (!active) return null;

  return (
    <div className={clsx("p-6", "bg-gray-lighter", "flex", "flex-col")}>
      <form
        onSubmit={handleSubmit(onApply)}
        className={clsx("w-full", "flex", "flex-col", "gap-4")}
      >
        <div className={clsx("flex", "items-center", "justify-between")}>
          <div
            className={clsx(
              "text-base",
              "text-gray-darkest",
              "text-base",
              "leading-6",
            )}
          >
            Discount Code
          </div>
          <button
            type="button"
            className={clsx(
              "appearance-none",
              "border-none",
              "focus:outline-none",
            )}
            onClick={onClose}
          >
            <Cross className={clsx("h-6 w-6", "text-gray-dark")} />
          </button>
        </div>
        <div className="grid grid-cols-[1fr_80px] gap-x-2">
          <Input
            {...register("discount_code", {
              required: "code is required",
            })}
            errors={errors}
            touched={touchedFields}
            containerClassName={clsx("mt-0", "relative")}
            errorClassName={clsx("absolute", "-bottom-4")}
          />
          <Button
            variant="slim"
            className={clsx(
              "py-[7px]",
              "px-5",
              "rounded-lg",
              "bg-gray-darkest",
              "text-base",
              "text-gray-lightest",
              "font-normal",
              "border-none",
            )}
            disabled={isLoading}
            loading={isLoading}
          >
            {!isLoading && "Apply"}
          </Button>
        </div>
      </form>
    </div>
  );
};

const AppliedDiscount = ({
  active,
  onRemove,
  appliedDiscount,
}: {
  active: boolean;
  appliedDiscount?: string;
  onRemove: () => void;
}) => {
  if (!active) return null;

  return (
    <div
      className={clsx(
        "p-6",
        "bg-gray-lighter",
        "flex",
        "items-center",
        "justify-between",
        "gap-4",
      )}
    >
      <div className={clsx("font-normal", "text-base", "text-gray-darkest")}>
        <span>{"Discount code "}</span>
        <span className={clsx("font-semibold")}>{appliedDiscount ?? ""}</span>
        <span>{" applied."}</span>
      </div>
      <button
        type="button"
        onClick={onRemove}
        className={clsx("appearance-none", "border-none", "focus:outline-none")}
      >
        <Cross className={clsx("h-6 w-6", "text-gray-dark")} />
      </button>
    </div>
  );
};
