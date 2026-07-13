import React, { useEffect, useState } from "react";
import type { PaymentSession } from "@medusajs/medusa";
import { useElements, useStripe } from "@stripe/react-stripe-js";

import { Cross, Spinner } from "@components/icons";
import { Button } from "@components";
import { useCartContext, useCheckout } from "@lib/context";
import clsx from "clsx";
import { formatAmount } from "medusa-react";

interface PaymentButtonProps {
  paymentSession?: PaymentSession | null;
}

export const PaymentButton: React.FC<PaymentButtonProps> = ({
  paymentSession,
}) => {
  const [notReady, setNotReady] = useState(true);
  const { cart } = useCartContext();
  const { onPaymentCompleted } = useCheckout();

  useEffect(() => {
    setNotReady(true);

    if (!cart) {
      return;
    }

    if (!cart.shipping_address) {
      return;
    }

    if (!cart.billing_address) {
      return;
    }

    if (!cart.email) {
      return;
    }

    if (cart.shipping_methods.length < 1) {
      return;
    }

    setNotReady(false);
  }, [cart]);

  const handlePayment = () => {
    onPaymentCompleted();
  };

  const getAmount = (amount: number | undefined | null) => {
    if (!cart) return "";

    return formatAmount({
      amount: amount || 0,
      region: cart.region,
    });
  };

  if (!paymentSession && cart?.total === 0) {
    return (
      <Button
        onClick={handlePayment}
        className={clsx(
          "w-full",
          "rounded-lg",
          "text-base",
          "font-normal",
          "uppercase",
          "py-5",
          "px-5",
          "text-gray-lightest",
          "bg-gray-darkest",
        )}
      >{`Checkout (${getAmount(cart?.total)})`}</Button>
    );
  }

  switch (paymentSession?.provider_id) {
    case "stripe":
      return (
        <StripePaymentButton session={paymentSession} notReady={notReady} />
      );
    default:
      return null;
  }
};

const StripePaymentButton = ({
  session,
  notReady,
}: {
  session: PaymentSession;
  notReady: boolean;
}) => {
  const [disabled, setDisabled] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined,
  );

  const { cart } = useCartContext();
  const { onPaymentCompleted } = useCheckout();

  const stripe = useStripe();
  const elements = useElements();
  const card = elements?.getElement("cardNumber");

  useEffect(() => {
    if (!stripe || !elements) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [stripe, elements]);

  const handlePayment = async () => {
    setSubmitting(true);

    if (!stripe || !elements || !card || !cart) {
      setSubmitting(false);
      return;
    }

    await stripe
      .confirmCardPayment(session.data.client_secret as string, {
        payment_method: {
          card: card,
          billing_details: {
            name: `${cart.billing_address.first_name} ${cart.billing_address.last_name}`,
            address: {
              city: cart.billing_address.city ?? undefined,
              country: cart.billing_address.country_code ?? undefined,
              line1: cart.billing_address.address_1 ?? undefined,
              line2: cart.billing_address.address_2 ?? undefined,
              postal_code: cart.billing_address.postal_code ?? undefined,
              state: cart.billing_address.province ?? undefined,
            },
            email: cart.email,
            phone: cart.billing_address.phone ?? undefined,
          },
        },
      })
      .then(({ error, paymentIntent }) => {
        if (error) {
          const pi = error.payment_intent;

          if (
            (pi && pi.status === "requires_capture") ||
            (pi && pi.status === "succeeded")
          ) {
            onPaymentCompleted();
          }

          setErrorMessage(error.message);
          return;
        }

        if (
          (paymentIntent && paymentIntent.status === "requires_capture") ||
          paymentIntent.status === "succeeded"
        ) {
          return onPaymentCompleted();
        }

        return;
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  const getAmount = (amount: number | undefined | null) => {
    if (!cart) return "";

    return formatAmount({
      amount: amount || 0,
      region: cart.region,
    });
  };

  return (
    <>
      {errorMessage && (
        <div
          className={clsx(
            "text-sm",
            "mb-2",
            "text-red",
            "font-medium",
            "flex",
            "items-center",
            "justify-start",
            "gap-2",
          )}
        >
          <Cross className="w-5 h-5 flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}
      <Button
        disabled={submitting || disabled || notReady}
        onClick={handlePayment}
        className={clsx(
          "w-full",
          "rounded-lg",
          "text-base",
          "font-normal",
          "uppercase",
          "py-5",
          "px-5",
          "text-gray-lightest",
          "bg-gray-darkest",
        )}
      >
        {submitting ? <Spinner /> : `Checkout (${getAmount(cart?.total)})`}
      </Button>
    </>
  );
};
