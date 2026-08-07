import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import {
  findFirstCategoryLink,
  useDocById,
} from "@docusaurus/theme-common/internal";
import isInternalUrl from "@docusaurus/isInternalUrl";

function CardContainer({ href, children }) {
  return (
    <Link
      href={href}
      className={clsx(
        "no-underline",
        "rounded-xl",
        "bg-zinc-100 dark:bg-zinc-800",
        "hover:bg-zinc-100 hover:dark:bg-zinc-700",
        "p-4",
        "flex flex-col",
        "gap-2 sm:gap-4 2xl:gap-6",
        "hover:no-underline",
      )}
    >
      {children}
    </Link>
  );
}

function CardLayout({ href, icon, title, description }) {
  return (
    <CardContainer href={href}>
      <h2
        className={clsx(
          "line-clamp-1",
          "text-xs sm:text-base 2xl:text-xl",
          "dark:text-zinc-200 text-zinc-900",
          "font-semibold",
          "m-0",
        )}
        title={title}
      >
        <span className="mr-2">{icon}</span>
        <span>{title}</span>
      </h2>
      {description && (
        <p
          className={clsx(
            "line-clamp-3",
            "m-0",
            "text-xs sm:text-sm 2xl:text-lg",
            "dark:text-zinc-400 text-zinc-700",
            "font-normal",
            "refine-prose",
          )}
          title={description}
        >
          {description}
        </p>
      )}
    </CardContainer>
  );
}

function CardCategory({ item }) {
  const href = findFirstCategoryLink(item);
  // Unexpected: categories that don't have a link have been filtered upfront
  if (!href) {
    return null;
  }
  return (
    <CardLayout
      href={href}
      icon="🗃️"
      title={item.label}
      description={item.description ?? `${item.items.length} items`}
    />
  );
}

function CardLink({ item }) {
  const icon = isInternalUrl(item.href) ? "📄️" : "🔗";
  const doc = useDocById(item.docId ?? undefined);

  return (
    <CardLayout
      href={item.href}
      icon={icon}
      title={item.label}
      description={item.description ?? doc?.description}
    />
  );
}

export const DocCard = ({ item }) => {
  switch (item.type) {
    case "link":
      return <CardLink item={item} />;
    case "category":
      return <CardCategory item={item} />;
    default:
      throw new Error(`unknown item type ${JSON.stringify(item)}`);
  }
};
