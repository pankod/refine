import React from "react";
import { TemplatesPage } from "@site/src/pages/core/templates";
import type { BreadcrumbItem } from "@site/src/components/breadcrumbs";
import { toSlug } from "../../../plugins/templates";

type FiltersPayload = {
  uiFramework?: string;
  backend?: string;
};

const buildBreadcrumbs = (filters: FiltersPayload): BreadcrumbItem[] => {
  const items: BreadcrumbItem[] = [
    { label: "Home", href: "/core/" },
    { label: "Templates", href: "/core/templates/" },
  ];

  if (filters.uiFramework) {
    const uiSlug = toSlug(filters.uiFramework);
    items.push({
      label: filters.uiFramework,
      href: filters.backend ? `/core/templates/${uiSlug}/` : undefined,
    });
  }

  if (filters.backend) {
    items.push({ label: filters.backend });
  }

  return items;
};

const TemplatesFilteredPage = (props: { filters: FiltersPayload }) => {
  const { filters } = props;

  return (
    <TemplatesPage
      initialFilters={{
        uiFramework: filters.uiFramework,
        backend: filters.backend,
      }}
      breadcrumbItems={buildBreadcrumbs(filters)}
      hideEditions={true}
      showFilters={false}
      showBreadcrumbs={true}
    />
  );
};

export default TemplatesFilteredPage;
