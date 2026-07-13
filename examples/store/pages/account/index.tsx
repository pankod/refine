import { useGetIdentity, useOne } from "@refinedev/core";
import type { Customer, StoreCustomersListOrdersRes } from "@medusajs/medusa";

import { AccountLayout, Overview } from "@components/account";

const ProfilePage: React.FC = () => {
  const { data } = useGetIdentity<Omit<Customer, "password_hash">>();

  const ordersData = useOne<StoreCustomersListOrdersRes>({
    resource: "customers",
    id: "/me/orders",
  });

  return (
    <AccountLayout>
      <Overview orders={ordersData.data?.data.orders || []} customer={data} />
    </AccountLayout>
  );
};

export default ProfilePage;
