import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";

import { AccountLayout } from "@components/account";
import { OrdersTemplate } from "@components/orders/OrdersTemplate";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout: (page: ReactElement) => ReactNode;
};

const Orders: NextPage = () => {
  return (
    <AccountLayout>
      <OrdersTemplate />
    </AccountLayout>
  );
};

export default Orders;
