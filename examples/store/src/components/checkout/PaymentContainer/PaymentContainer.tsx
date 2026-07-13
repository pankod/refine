import React from "react";
import clsx from "clsx";
import type { PaymentSession } from "@medusajs/medusa";

import { PaymentStripe, Radio } from "@components";

interface PaymentContainerProps {
  paymentSession: PaymentSession;
  selected: boolean;
  setSelected: () => void;
  disabled?: boolean;
}

const PaymentInfoMap: Record<string, { title: string; description: string }> = {
  stripe: {
    title: "Credit card",
    description: "Secure payment with credit card",
  },
};

export const PaymentContainer: React.FC<PaymentContainerProps> = ({
  paymentSession,
  selected,
  setSelected,
  disabled = false,
}) => {
  return (
    <div className={clsx("flex", "flex-col", "gap-4")}>
      <button
        className="flex flex-col"
        onClick={setSelected}
        disabled={disabled}
      >
        {/* <Radio checked={selected} /> */}
        <h3
          className={clsx(
            "text-base",
            "font-semibold",
            "text-gray-darkest",
            "capitalize",
            "m-0",
            "p-0",
          )}
        >
          {PaymentInfoMap[paymentSession.provider_id].title}
        </h3>
        <span
          className={clsx(
            "text-base",
            "font-normal",
            "text-gray-darker",
            "m-0",
            "p-0",
          )}
        >
          {PaymentInfoMap[paymentSession.provider_id].description}
        </span>
      </button>
      {selected && (
        <div className="w-full py-4">
          <PaymentElement paymentSession={paymentSession} />
        </div>
      )}
    </div>
  );
};

const PaymentElement = ({
  paymentSession,
}: {
  paymentSession: PaymentSession;
}) => {
  switch (paymentSession.provider_id) {
    case "stripe":
      return <PaymentStripe />;
    default:
      return null;
  }
};
