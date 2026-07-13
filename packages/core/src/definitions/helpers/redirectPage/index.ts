import type { IRefineContextOptions } from "../../../contexts/refine/types";
import type { Action } from "../../../contexts/router/types";
import type { RedirectAction } from "../../../hooks/form/types";

type RedirectPageProps = {
  redirectFromProps?: RedirectAction;
  action: Action;
  redirectOptions: IRefineContextOptions["redirect"];
};

export const redirectPage = ({
  redirectFromProps,
  action,
  redirectOptions,
}: RedirectPageProps): RedirectAction => {
  if (redirectFromProps || redirectFromProps === false) {
    return redirectFromProps;
  }

  switch (action) {
    case "clone":
      return redirectOptions.afterClone;
    case "create":
      return redirectOptions.afterCreate;
    case "edit":
      return redirectOptions.afterEdit;
    default:
      return false;
  }
};
