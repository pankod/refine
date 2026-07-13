import React from "react";
import { Sandpack } from "@site/src/components/sandpack";

export function NextJSAppHeadless() {
  return (
    <Sandpack
      template="nextjs"
      showNavigator
      showFiles
      files={{
        "app/layout.tsx": {
          code: LayoutTsxCode.trim(),
          active: true,
        },
        "app/refine/page.tsx": {
          code: RefinePageTsxCode.trim(),
        },
        "app/page.tsx": {
          code: PageTsxCode.trim(),
        },
        "app/other/page.tsx": {
          code: OtherPageTsxCode.trim(),
        },
      }}
    />
  );
}

const PageTsxCode = /* tsx */ `
import Link from "next/link";

export default function Home({ data }) {
  return (
    <div>
      <h1>Home Page</h1>
      <Link href="/other">Go to other page</Link>
      <br />
      <Link href="/refine">Go to Refine page</Link>
    </div>
  );
}
`;

const LayoutTsxCode = /* tsx */ `
import { Refine } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";

const API_URL = "https://api.fake-rest.refine.dev";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Refine dataProvider={dataProvider(API_URL)}>{children}</Refine>
      </body>
    </html>
  );
}
`;

const RefinePageTsxCode = /* tsx */ `
import Link from "next/link";
import { useShow } from "@refinedev/core";

export default function RefinePage() {
  const { queryResult } = useShow({ resource: "products", id: 1 });

  return (
    <div>
      Hello From My Refine Component!
      <hr />
      <p>useShow hook queryResult:</p>
      <code>{JSON.stringify(queryResult.data, null, 2)}</code>
      <hr />
      <Link href="/">Go to Home Page</Link>
    </div>
  );
}
`;

const OtherPageTsxCode = /* tsx */ `
import Link from "next/link";

export default function OtherPage() {
  return (
    <div>
      <h1>Hello From Other Page</h1>
      <Link href="/">Go to Home Page</Link>
    </div>
  );
}
`;
