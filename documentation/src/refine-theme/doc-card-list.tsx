import React from "react";
import {
  useCurrentSidebarCategory,
  filterDocCardListItems,
} from "@docusaurus/theme-common";

import DocCard from "@theme/DocCard";

function DocCardListForCurrentSidebarCategory({ className }) {
  const category = useCurrentSidebarCategory();
  return <DocCardList items={category.items} className={className} />;
}

export const DocCardList = (props) => {
  const { items } = props;

  if (!items) {
    return <DocCardListForCurrentSidebarCategory {...props} />;
  }

  const filteredItems = filterDocCardListItems(
    items.filter((item) => item.type !== "html"),
  );

  return (
    <>
      {filteredItems.map((item, index) => (
        <DocCard key={index} item={item} />
      ))}
    </>
  );
};
