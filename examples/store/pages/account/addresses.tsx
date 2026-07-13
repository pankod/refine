import type { NextPage } from "next";

import { AccountLayout, AddressesTemplate } from "@components";

const Addresses: NextPage = () => {
  return (
    <AccountLayout>
      <AddressesTemplate />
    </AccountLayout>
  );
};

export default Addresses;
