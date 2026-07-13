import { useContext } from "react";

import { RefineContext } from "@contexts/refine";
import { UnsavedWarnContext } from "@contexts/unsavedWarn";
import type { IRefineContextOptions } from "../../../contexts/refine/types";
import type { IUnsavedWarnContext } from "../../../contexts/unsavedWarn/types";

type UseWarnAboutChangeType = () => {
  warnWhenUnsavedChanges: IRefineContextOptions["warnWhenUnsavedChanges"];
  warnWhen: NonNullable<IUnsavedWarnContext["warnWhen"]>;
  setWarnWhen: NonNullable<IUnsavedWarnContext["setWarnWhen"]>;
};

/**
 * When you have unsaved changes and try to leave the current page, **refine** shows a confirmation modal box.
 * To activate this feature, set the `warnWhenUnsavedChanges` to `true`.
 *
 * @see {@link https://refine.dev/docs/api-reference/core/components/refine-config#warnwhenunsavedchanges} for more details.
 */
export const useWarnAboutChange: UseWarnAboutChangeType = () => {
  const { warnWhenUnsavedChanges } = useContext(RefineContext);

  const { warnWhen, setWarnWhen } = useContext(UnsavedWarnContext);

  return {
    warnWhenUnsavedChanges,
    warnWhen: Boolean(warnWhen),
    setWarnWhen: setWarnWhen ?? (() => undefined),
  };
};
