"use client";

import { ErrorComponent } from "@refinedev/core";
import { Suspense } from "react";

export default function NotFound() {
  return (
    <Suspense>
      <ErrorComponent />
    </Suspense>
  );
}
