import { CheckoutTemplate } from "@components/checkout";
import { SEO } from "@components/common";
import { useCartContext } from "@lib/context";
import { useRouter } from "next/router";
import React from "react";

const CheckoutPage: React.FC = () => {
  const { cart, cartIsFetching } = useCartContext();
  const { replace } = useRouter();
  const navigated = React.useRef(false);

  React.useEffect(() => {
    if (cart && !cartIsFetching && cart.items.length === 0) {
      if (!navigated.current) {
        replace("/");
        navigated.current = true;
      }
    }
  }, [cart, cartIsFetching, replace]);

  return (
    <>
      <SEO title="Checkout" />
      <CheckoutTemplate />
    </>
  );
};

export default CheckoutPage;
