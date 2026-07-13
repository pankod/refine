import React from "react";
import { ConfigSuccessPage } from "../config-success";
import { useRefineContext } from "@hooks/refine";
import { ConfigErrorPage } from "../config-error";

export const WelcomePage = () => {
  const { __initialized } = useRefineContext();

  return (
    <>
      <ConfigSuccessPage />
      {!__initialized && <ConfigErrorPage />}
    </>
  );
};
