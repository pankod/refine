import { useBreadcrumb } from "@refinedev/core";
import { Link } from "react-router";

import { BreadCrumb } from "primereact/breadcrumb";
import type { MenuItem } from "primereact/menuitem";
import { classNames } from "primereact/utils";

export const Breadcrumb = () => {
  const { breadcrumbs } = useBreadcrumb();

  if (breadcrumbs.length === 1) {
    return null;
  }

  const items: MenuItem[] = breadcrumbs.map((breadcrumb) => ({
    label: breadcrumb.label,
    icon: breadcrumb.icon,
    template: (item, options) => {
      return breadcrumb.href ? (
        <Link
          to={breadcrumb.href}
          className={classNames("text-color", options.className)}
        >
          {item.icon}
          <span className={classNames("ml-2 ", options.labelClassName)}>
            {item.label}
          </span>
        </Link>
      ) : (
        <span className={options.className}>
          <span className={options.labelClassName}>{item.label}</span>
        </span>
      );
    },
  }));

  return (
    <BreadCrumb className="surface-ground pl-0 border-none" model={items} />
  );
};
