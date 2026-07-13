"use client";

import { Suspense } from "react";

import { NavigateToResource } from "@refinedev/nextjs-router";
import { Authenticated } from "@refinedev/core";

export default function IndexPage() {
  return (
    <Suspense>
      <Authenticated key="home-page">
        <NavigateToResource />
      </Authenticated>
    </Suspense>
  );
}
