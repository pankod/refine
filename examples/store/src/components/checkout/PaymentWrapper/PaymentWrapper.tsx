import React, { type PropsWithChildren } from "react";
import type { PaymentSession } from "@medusajs/medusa";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe, type StripeElementsOptions } from "@stripe/stripe-js";

interface WrapperProps {
  paymentSession?: PaymentSession | null;
}

export const Wrapper: React.FC<PropsWithChildren<WrapperProps>> = ({
  paymentSession,
  children,
}) => {
  if (!paymentSession) {
    return <div>{children}</div>;
  }

  switch (paymentSession.provider_id) {
    case "stripe":
      return (
        <StripeWrapper paymentSession={paymentSession}>
          {children}
        </StripeWrapper>
      );

    default:
      return <div>{children}</div>;
  }
};

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY || "");

const StripeWrapper: React.FC<PropsWithChildren<WrapperProps>> = ({
  paymentSession,
  children,
}) => {
  const options: StripeElementsOptions = {
    // eslint-disable-next-line
    clientSecret: paymentSession!.data.client_secret as string | undefined,
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      {children}
    </Elements>
  );
};
