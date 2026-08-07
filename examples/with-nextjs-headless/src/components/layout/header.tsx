"use client";

import { SelectLanguage } from "@components/select-language";
import { useLogout, useTranslation } from "@refinedev/core";

export const Header = () => {
  const { translate } = useTranslation();
  const { mutate: logout } = useLogout();

  return (
    <div>
      <br />
      <SelectLanguage />
      <br />
      <button type="button" onClick={() => logout()}>
        {translate("buttons.logout")}
      </button>
      <br />
      <br />
    </div>
  );
};
