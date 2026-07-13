import React from "react";
import { useIsAuthenticated } from "@refinedev/core";
import cn from "clsx";
import type { LineItem } from "@medusajs/medusa";

import { useUI } from "@lib/context";
import { Bag, User } from "@components/icons";
import { CustomerMenuContent } from "./CustomerMenuContent";
import {
  Dropdown,
  DropdownTrigger as DropdownTriggerInst,
} from "@components/ui";
import { useCartContext } from "@lib/context";

import s from "./UserNav.module.css";
import { ButtonCircle } from "@components/ui/button-circle";

export const UserNav: React.FC<{
  className?: string;
}> = ({ className }) => {
  const { cart } = useCartContext();

  const countItem = (count: number, item: LineItem) => count + item.quantity;

  const itemsCount = cart?.items.reduce(countItem, 0) ?? 0;
  const { isSuccess } = useIsAuthenticated();

  const { closeSidebarIfPresent, openModal, setSidebarView, openSidebar } =
    useUI();

  const DropdownTrigger = isSuccess ? DropdownTriggerInst : React.Fragment;

  return (
    <nav className={cn(s.root, className)}>
      <ul className={s.list}>
        <li className={s.item}>
          <ButtonCircle
            className={s.item}
            badge={itemsCount}
            onClick={() => {
              setSidebarView("CART_VIEW");
              openSidebar();
            }}
          >
            <Bag />
          </ButtonCircle>
        </li>
        <li className={s.item}>
          <Dropdown>
            <DropdownTrigger>
              <ButtonCircle onClick={() => (isSuccess ? null : openModal())}>
                <User size={24} />
              </ButtonCircle>
            </DropdownTrigger>
            <CustomerMenuContent />
          </Dropdown>
        </li>
      </ul>
    </nav>
  );
};
