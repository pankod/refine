import React from "react";
import { Sandpack } from "@site/src/components/sandpack";

export function NextJSPagesHeadless() {
  return (
    <Sandpack
      template="nextjs"
      showNavigator
      showFiles
      files={{
        "pages/_app.tsx": {
          code: AppTsxCode.trim(),
          active: true,
        },
        "pages/refine.tsx": {
          code: RefinePageTsxCode.trim(),
        },
        "pages/index.tsx": {
          code: IndexTsxCode.trim(),
        },
        "pages/other.tsx": {
          code: OtherPageTsxCode.trim(),
        },
      }}
    />
  );
}

const IndexTsxCode = /* tsx */ `
import Link from "next/link";

export default function Home({ data }) {
  return (
    <div>
      <h1>Hello From Home</h1>
      <Link href="/other">Go to Other Page</Link>
      <br />
      <Link href="/refine">Go to Refine Page</Link>
    </div>
  );
}
`;

const AppTsxCode = /* tsx */ `
import { Refine } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";

const API_URL = "https://api.fake-rest.refine.dev";

export default function MyApp({ Component, pageProps }) {
  return (
    <Refine dataProvider={dataProvider(API_URL)}>
      <Component {...pageProps} />
    </Refine>
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
export default function OtherPage() {
  return (
    <div>
      <h1>Hello From Other Page</h1>
      <Link href="/">Go to Home Page</Link>
    </div>
  );
}
`;
