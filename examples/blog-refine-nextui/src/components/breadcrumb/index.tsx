import { useBreadcrumb } from "@refinedev/core";
import { Link } from "react-router";
import { ChevronRightIcon } from "@heroicons/react/20/solid";

export const Breadcrumb = () => {
  const { breadcrumbs } = useBreadcrumb();
  if (breadcrumbs.length === 1) return null;

  return (
    <nav>
      <ul className="breadcrumb flex gap-4 my-5">
        {breadcrumbs.map((breadcrumb) => {
          return (
            <li key={`breadcrumb-${breadcrumb.label}`}>
              {breadcrumb.href ? (
                <span className="flex text-blue-500 hover:text-blue-400">
                  {" "}
                  <ChevronRightIcon aria-hidden width={16} />{" "}
                  <Link to={breadcrumb.href}>{breadcrumb.label}</Link>
                </span>
              ) : (
                <span className="flex">
                  <ChevronRightIcon aria-hidden width={16} /> {breadcrumb.label}
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
