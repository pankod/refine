import React, { type PropsWithChildren } from "react";
import { useGetIdentity } from "@refinedev/core";
import type { Customer } from "@medusajs/medusa";

import { AccountNav, LoadingDots, UnderlineLink } from "@components";

import s from "./AccountLayout.module.css";

export const AccountLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const { data } = useGetIdentity<Omit<Customer, "password_hash">>();

  if (!data) {
    return (
      <div className={s.loading}>
        <LoadingDots />
      </div>
    );
  }

  return (
    <div className={s.root}>
      <div className={s.wrapper}>
        <div className={s.header}>
          <div>
            <AccountNav />
          </div>
          <div className={s.children}>{children}</div>
        </div>
        <div className={s.info}>
          <div>
            <h3 className={s.infoHeader}>Got questions?</h3>
            <span className={s.infoText}>
              You can find frequently asked questions and answers on our
              customer service page.
            </span>
          </div>
          <div>
            <UnderlineLink href="mailto:info@refine.dev">
              Customer Service
            </UnderlineLink>
          </div>
        </div>
      </div>
    </div>
  );
};
