import React from "react";
import { Sandpack } from "@site/src/components/sandpack";

export function NextJSAppRouter() {
  return (
    <Sandpack
      template="nextjs"
      showFiles
      files={{
        "/app/refine/layout.tsx": {
          code: RefineLayoutTsxCode.trim(),
          active: true,
        },
        "/app/refine/products/page.tsx": {
          code: RefineProductsPageTsxCode.trim(),
        },
        "/app/layout.tsx": {
          code: LayoutTsxCode.trim(),
          hidden: true,
        },
        "/app/page.tsx": {
          code: IndexPageTsxCode.trim(),
        },
        "/app/about/page.tsx": {
          code: AboutPageTsxCode.trim(),
        },
      }}
    />
  );
}

const LayoutTsxCode = /* tsx */ `
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
`;

const IndexPageTsxCode = /* tsx */ `
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>Home Page</h1>
      <Link href="/about">Go to About page</Link>
      <br />
      <Link href="/refine/products">Go to Refine page</Link>
    </main>
  );
}
`;

const AboutPageTsxCode = /* tsx */ `
import Link from "next/link";

export default function AboutPage() {
  return (
    <div>
      <h1>About Page</h1>
      <Link href="/">Go to Home page</Link>
    </div>
  );
}
`;

const RefineLayoutTsxCode = /* tsx */ `
"use client";
import { Refine } from "@refinedev/core";
import routerProvider from "@refinedev/nextjs-router";
import dataProvider from "@refinedev/simple-rest";
export default function RefineLayout({ children }: { children: React.ReactNode }) {
  return (
    <Refine
      routerProvider={routerProvider}
      dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
      resources={[
        {
          name: "products",
          list: "/refine/products",
        },
      ]}
      options={{ syncWithLocation: true }}
    >
      {children}
    </Refine>
  );
}
`;

const RefineProductsPageTsxCode = /* tsx */ `
"use client";
import { useList } from "@refinedev/core";

export default function Products() {
  const { data: products } = useList();

  return (
    <div>
      <h1>Refine Products Page</h1>
      <ul>
        {products?.data?.map((record) => (
          <li key={record.id}>{record.name}</li>
        ))}
      </ul>
    </div>
  );
}
`;
