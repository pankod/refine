import { useBreadcrumb } from "@refinedev/core";
import { Link } from "react-router";

export const Breadcrumb = () => {
  const { breadcrumbs } = useBreadcrumb();

  return (
    <ul className="breadcrumb text-sm text-gray-600">
      {breadcrumbs.map((breadcrumb) => {
        return (
          <li key={`breadcrumb-${breadcrumb.label}`}>
            {breadcrumb.href ? (
              <Link to={breadcrumb.href}>
                {breadcrumb.label.toLocaleLowerCase()}
              </Link>
            ) : (
              <span>{breadcrumb.label.toLocaleLowerCase()}</span>
            )}
          </li>
        );
      })}
    </ul>
  );
};
