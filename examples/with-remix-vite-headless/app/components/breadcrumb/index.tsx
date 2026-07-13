import { useBreadcrumb } from "@refinedev/core";
import { Link } from "@remix-run/react";

export const Breadcrumb = () => {
  const { breadcrumbs } = useBreadcrumb();

  return (
    <ul className="breadcrumb">
      {breadcrumbs.map((breadcrumb) => (
        <li key={`breadcrumb-${breadcrumb.label}`}>
          {breadcrumb.href ? (
            <Link to={breadcrumb.href}>{breadcrumb.label}</Link>
          ) : (
            <span>{breadcrumb.label}</span>
          )}
        </li>
      ))}
    </ul>
  );
};
