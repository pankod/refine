import type { Customer, Order } from "@medusajs/medusa";
import Link from "next/link";

import { ChevronDown, User, Package, MapPin } from "@icons";

import s from "./OverviewTemplate.module.css";

interface OverviewProps {
  orders?: Order[];
  customer?: Omit<Customer, "password_hash">;
}

export const Overview: React.FC<OverviewProps> = ({ orders, customer }) => {
  return (
    <div>
      <div className={s.mobileHidden}>
        <div className={s.head}>Hello {customer?.first_name}</div>
        <div className={s.regularText}>
          <ul>
            <li>
              <Link href="/account/profile" className={s.link}>
                <div className={s.linkContent}>
                  <User size={16} />
                  <span>Profile</span>
                </div>
                <ChevronDown className={s.icon} />
              </Link>
            </li>
            <li>
              <Link href="/account/addresses" className={s.link}>
                <div className={s.linkContent}>
                  <MapPin size={16} />
                  <span>Addresses</span>
                </div>
                <ChevronDown className={s.icon} />
              </Link>
            </li>
            <li>
              <Link href="/account/orders" className={s.link}>
                <div className={s.linkContents}>
                  <Package size={16} />
                  <span>Orders</span>
                </div>
                <ChevronDown className={s.icon} />
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className={s.mobileBlock}>
        <div className={s.mobileHead}>
          <span>Hello {customer?.first_name}</span>
          <span className={s.signIn}>
            Signed in as: <span className={s.semibold}>{customer?.email}</span>
          </span>
        </div>
        <div className={s.overviewContainer}>
          <div className={s.overviewWrapper}>
            <div className={s.overviewInfo}>
              <div className={s.flexCol}>
                <h3 className={s.semibold}>Profile</h3>
                <div className={s.flexEnd}>
                  <span className={s.remarkableText}>
                    {getProfileCompletion(customer)}%
                  </span>
                  <span className={s.ragularText}>Completed</span>
                </div>
              </div>

              <div className={s.flexCol}>
                <h3 className={s.semibold}>Addresses</h3>
                <div className={s.flexEnd}>
                  <span className={s.remarkableText}>
                    {customer?.shipping_addresses?.length || 0}
                  </span>
                  <span className={s.ragularText}>Saved</span>
                </div>
              </div>
            </div>

            <div className={s.flexCol}>
              <div className={s.linkContent}>
                <h3 className={s.semibold}>Recent orders</h3>
              </div>
              <ul className={s.flexCol}>
                {orders ? (
                  orders.slice(0, 5).map((order) => {
                    return (
                      <li key={order.id}>
                        <Link
                          href={{
                            pathname: "/order/details/[id]",
                            query: { id: order.id },
                          }}
                        >
                          <div className={s.ordersWrapper}>
                            <div className={s.orders}>
                              <span className={s.semibold}>Date placed</span>
                              <span className={s.semibold}>Order number</span>
                              <span className={s.semibold}>Total amount</span>
                              <span>
                                {new Date(order.created_at).toDateString()}
                              </span>
                              <span>#{order.display_id}</span>
                              {/* <span>
                                                                    {formatAmount(
                                                                        {
                                                                            amount: order.total,
                                                                            region: order.region,
                                                                            includeTaxes:
                                                                                false,
                                                                        },
                                                                    )}
                                                                </span> */}
                            </div>
                            <button className={s.center} onClick={close}>
                              <span className="sr-only">
                                Go to order #{order.display_id}
                              </span>
                              <ChevronDown className={s.icon} />
                            </button>
                          </div>
                        </Link>
                      </li>
                    );
                  })
                ) : (
                  <span>No recent orders</span>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const getProfileCompletion = (customer?: Omit<Customer, "password_hash">) => {
  let count = 0;

  if (!customer) {
    return 0;
  }

  if (customer.email) {
    count++;
  }

  if (customer.first_name && customer.last_name) {
    count++;
  }

  if (customer.phone) {
    count++;
  }

  if (customer.billing_address) {
    count++;
  }

  return (count / 4) * 100;
};
