import { useMenu } from "@refinedev/core";
import { Link } from "react-router";

import { TabMenu } from "primereact/tabmenu";
import type { MenuItem } from "primereact/menuitem";
import { classNames } from "primereact/utils";

export const Menu = () => {
  const { menuItems } = useMenu();

  const items: MenuItem[] = menuItems.map((menuItem) => ({
    label: menuItem.label,
    icon: menuItem.icon,
    template: (item, options) => {
      return (
        <div onClick={options.onClick}>
          <Link to={menuItem.route ?? "/"} className={options.className}>
            {item.icon}
            <span className={classNames("ml-2", options.labelClassName)}>
              {item.label}
            </span>
          </Link>
        </div>
      );
    },
  }));

  return (
    <div className="sticky top-0 z-5">
      <TabMenu model={items} />
    </div>
  );
};
