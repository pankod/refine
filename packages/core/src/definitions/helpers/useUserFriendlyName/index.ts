import { useRefineContext } from "@hooks/refine";

/**
 * A method that the internal uses
 * @internal
 */
export const useUserFriendlyName = () => {
  const {
    options: { textTransformers },
  } = useRefineContext();

  const getFriendlyName = (name = "", type: "singular" | "plural"): string => {
    const humanizeName = textTransformers.humanize(name);
    if (type === "singular") {
      return textTransformers.singular(humanizeName);
    }
    return textTransformers.plural(humanizeName);
  };

  return getFriendlyName;
};
