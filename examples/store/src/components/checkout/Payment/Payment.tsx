import { useEffect } from "react";

import { Spinner } from "@components/icons";
import { useCheckout } from "@lib/context";
import {
  LoadingDots,
  PaymentButton,
  PaymentContainer,
  StepContainer,
} from "@components";
import clsx from "clsx";

export const Payment: React.FC = () => {
  const {
    cart,
    setPaymentSession,
    initPayment,
    sameAsBilling: { state: isSame },
  } = useCheckout();

  /**
   * Fallback if the payment session are not loaded properly we
   * retry to load them after a 5 second delay.
   */
  useEffect(() => {
    let timeout: NodeJS.Timeout | null = null;

    if (cart?.shipping_address && cart?.payment_sessions) {
      timeout = setTimeout(() => {
        initPayment();
      }, 5000);
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [cart]);

  return (
    <StepContainer title="Payment" index={isSame ? 3 : 4}>
      <div className="bg-gray-normal h-px w-full" />
      {cart?.total !== 0 && (
        <div className={clsx("pt-4", "flex", "flex-col", "w-full", "gap-4")}>
          {cart?.payment_sessions?.length ? (
            cart.payment_sessions
              .sort((a, b) => {
                return a.provider_id > b.provider_id ? 1 : -1;
              })
              .map((paymentSession) => {
                return (
                  <PaymentContainer
                    paymentSession={paymentSession}
                    key={paymentSession.id}
                    selected={
                      cart?.payment_session?.provider_id ===
                      paymentSession.provider_id
                    }
                    setSelected={() =>
                      setPaymentSession(paymentSession.provider_id)
                    }
                  />
                );
              })
          ) : (
            <div className="text-gray-darkest flex flex-col items-center justify-center px-4 py-16">
              <LoadingDots />
            </div>
          )}
        </div>
      )}
      <div className={clsx("pt-12", "pb-6")}>
        <PaymentButton paymentSession={cart?.payment_session} />
      </div>
    </StepContainer>
  );
};
