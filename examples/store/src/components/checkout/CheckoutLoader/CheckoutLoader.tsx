import { Dialog, Transition } from "@headlessui/react";

import { useCheckout } from "@lib/context";
import { noop } from "@lib/noop";
import { LoadingDots } from "@components/ui";

export const CheckoutLoader: React.FC = () => {
  const { isLoading } = useCheckout();

  return (
    <Transition show={isLoading}>
      <Dialog onClose={noop} className="relative z-[100]">
        <Transition.Child
          enter="ease-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50 backdrop-blur-[2px]">
            <LoadingDots />
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};
