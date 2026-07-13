import Link from "next/link";
import { useRouter } from "next/router";
import cn from "clsx";

import { ChevronDown } from "@icons";

import s from "./AccountNav.module.css";

export const AccountNav: React.FC = () => {
  const { route } = useRouter();

  return (
    <div>
      <div className={s.account}>
        {route !== "/account" && (
          <Link href="/account" className={s.accountLink}>
            <>
              <ChevronDown className={s.icon} />
              <span>Account</span>
            </>
          </Link>
        )}
      </div>
      <div className={s.links}>
        <div>
          <h3 className="text-2xl font-bold">Account</h3>
          <div>
            <ul className={s.list}>
              <li>
                <AccountNavLink href="/account" route={route}>
                  Overview
                </AccountNavLink>
              </li>
              <li>
                <AccountNavLink href="/account/profile" route={route}>
                  Profile
                </AccountNavLink>
              </li>
              <li>
                <AccountNavLink href="/account/addresses" route={route}>
                  Addresses
                </AccountNavLink>
              </li>
              <li>
                <AccountNavLink href="/account/orders" route={route}>
                  Orders
                </AccountNavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

type AccountNavLinkProps = {
  href: string;
  route: string;
  children: React.ReactNode;
};

const AccountNavLink = ({ href, route, children }: AccountNavLinkProps) => {
  const active = route === href;
  return (
    <Link
      href={href}
      className={cn("text-accent-6", {
        "text-accent-9 font-semibold underline": active,
      })}
    >
      {children}
    </Link>
  );
};
