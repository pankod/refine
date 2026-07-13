import React, { useMemo } from "react";
import type { Cart } from "@medusajs/medusa";
import { useForm } from "react-hook-form";
import { useInvalidate, useUpdate } from "@refinedev/core";

import { Input, Button } from "@components";
import { Cross } from "@components/icons";
import clsx from "clsx";
import { IconCoupon } from "@components/icons/icon-coupon";

interface GiftCardFormValues {
  gift_card_code: string;
}

interface GiftCardProps {
  cart: Omit<Cart, "refundable_amount" | "refunded_total">;
}

export const GiftCard: React.FC<GiftCardProps> = ({ cart }) => {
  const [view, setView] = React.useState<"pre" | "form" | "post">("pre");
  const invalidate = useInvalidate();
  const { mutate } = useUpdate({
    resource: "carts",
    id: cart.id,
    mutationOptions: {
      onSuccess: () => {
        invalidate({
          resource: "carts",
          invalidates: ["detail"],
          id: cart.id,
        });
      },
    },
  });

  const appliedGiftCard = useMemo(() => {
    if (!cart || !cart.gift_cards?.length) {
      return undefined;
    }

    return cart.gift_cards[0].code;
  }, [cart]);

  React.useEffect(() => {
    if (appliedGiftCard && view === "pre") {
      setView("post");
    }
  }, [appliedGiftCard]);

  const onRemove = () => {
    mutate({
      values: { gift_cards: [] },
    });
  };

  return (
    <div className="flex w-full flex-col">
      <PreGiftCardView
        active={view === "pre"}
        onClick={() => setView("form")}
      />
      <GiftCardForm
        active={view === "form"}
        cart={cart}
        onClose={() => setView("pre")}
        onSuccess={() => setView("post")}
      />
      <AppliedGiftCard
        active={view === "post"}
        onRemove={onRemove}
        appliedGiftCard={appliedGiftCard}
      />
    </div>
  );
};

const PreGiftCardView = ({
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
          Add gift code
        </span>
      </button>
    </div>
  );
};

const GiftCardForm = ({
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
  const invalidate = useInvalidate();
  const {
    mutate,
    mutation: { isLoading },
  } = useUpdate({
    resource: "carts",
    id: cart.id,

    mutationOptions: {
      onSuccess: () => {
        invalidate({
          resource: "carts",
          invalidates: ["detail"],
          id: cart.id,
        });
        onSuccess();
      },
      onError: () => {
        setError(
          "gift_card_code",
          {
            message: "Code is invalid",
          },
          {
            shouldFocus: true,
          },
        );
      },
    },
  });

  const {
    register,
    handleSubmit,
    formState: { touchedFields, errors },
    setError,
    reset,
  } = useForm<GiftCardFormValues>();

  const onSubmit = (data: GiftCardFormValues) => {
    mutate({
      values: { gift_cards: [{ code: data.gift_card_code }] },
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
        onSubmit={handleSubmit(onSubmit)}
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
            Gift Code
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
            {...register("gift_card_code", {
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

const AppliedGiftCard = ({
  active,
  onRemove,
  appliedGiftCard,
}: {
  active: boolean;
  appliedGiftCard?: string;
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
        <span>{"Gift code "}</span>
        <span className={clsx("font-semibold")}>{appliedGiftCard ?? ""}</span>
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
