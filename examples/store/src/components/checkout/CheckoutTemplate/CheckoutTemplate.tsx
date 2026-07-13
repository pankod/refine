import { CheckoutForm, CheckoutLoader, CheckoutSummary } from "@components";
import { CheckoutProvider } from "@lib/context";
import clsx from "clsx";

export const CheckoutTemplate: React.FC = () => {
  return (
    <CheckoutProvider>
      <div className="small:min-h-screen bg-primary relative">
        <div className="relative">
          <CheckoutLoader />
          <div
            className={clsx(
              "w-full",
              "grid",
              "grid-cols-10",
              "gap-y-10",
              "gap-x-0",
              "lg:flex-row",
              "lg:gap-20",
            )}
          >
            <CheckoutForm className={clsx("col-span-10", "lg:col-span-6")} />
            <CheckoutSummary className={clsx("col-span-10", "lg:col-span-4")} />
          </div>
        </div>
      </div>
    </CheckoutProvider>
  );
};
