import Link from "@docusaurus/Link";
import clsx from "clsx";
import React, { type FC, type SVGProps } from "react";
import type { TemplateEdition } from "../types/integrations";
import { getImgixSrc } from "../components/image";
import {
  BreadcrumbJsonLd,
  type BreadcrumbItem,
} from "@site/src/components/json-ld";

type Props = {
  className?: string;
  breadcrumbItems?: BreadcrumbItem[];
  data: {
    title: string;
    description: string;
    image: string;
    to: string;
    edition: TemplateEdition;
    integrations: {
      label: string;
      icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
    }[];
  }[];
};

export const TemplatesList: FC<Props> = ({
  className,
  data,
  breadcrumbItems,
}) => {
  const defaultBreadcrumbItems: BreadcrumbItem[] = [
    { label: "Home", href: "/core/" },
    { label: "Templates", href: "/core/templates/" },
  ];

  return (
    <div className={clsx("not-prose", className)}>
      <BreadcrumbJsonLd items={breadcrumbItems ?? defaultBreadcrumbItems} />
      <div
        className={clsx(
          "grid",
          "grid-cols-1 landing-sm:grid-cols-2 landing-lg:grid-cols-3",
          "gap-1",
          "not-prose",
          className,
        )}
      >
        {data.map((item) => {
          return (
            <Link
              to={item.to}
              key={item.title}
              className={clsx(
                "h-full",
                "relative",
                "flex",
                "flex-col",
                "bg-zinc-800",
                "rounded-xl",
                "hover:no-underline",
                "p-2",
                "not-prose",
              )}
            >
              <img
                className={clsx(
                  "w-full h-auto",
                  "object-contain",
                  "object-center",
                  "aspect-[590/405]",
                  "rounded-t-md",
                )}
                src={getImgixSrc(item.image)}
              />
              <div
                className={clsx(
                  "h-full",
                  "flex",
                  "flex-col",
                  "p-6",
                  "not-prose",
                )}
              >
                <div
                  className={clsx("text-base", "font-semibold", "text-white")}
                >
                  {item.title}
                </div>
                <div
                  className={clsx("text-sm", "text-zinc-300", "mt-4", "mb-6")}
                >
                  {item.description}
                </div>
                <div
                  className={clsx(
                    "mt-auto",
                    "flex items-center flex-wrap",
                    "gap-2",
                  )}
                >
                  {item.integrations.map((integration) => {
                    const Icon = integration.icon;

                    return (
                      <div
                        key={integration.label}
                        className={clsx(
                          "flex",
                          "items-center",
                          "gap-2",
                          "py-1.5 pl-1.5 pr-2.5",
                          "rounded-md",
                          "bg-zinc-900",
                        )}
                      >
                        <Icon
                          id={"template-list"}
                          height={20}
                          width={20}
                          className="!text-white"
                        />
                        <div
                          className={clsx(
                            "text-sm",
                            "font-medium",
                            "text-white",
                          )}
                        >
                          {integration.label}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              {item.edition === "Enterprise" && (
                <div className={clsx("absolute", "top-1", "right-1")}>
                  <img
                    src="/assets/badge-enterprise.png"
                    alt="enterprise badge"
                    className="w-[120px] h-[120px]"
                  />
                </div>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
};
