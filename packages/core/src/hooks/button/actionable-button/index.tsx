import { useRefineOptions } from "../../use-refine-options";
import { useTranslate } from "../../i18n";

export type ActionableButtonProps = {
  type: "save" | "export" | "import";
};

export type ActionableButtonValues = {
  label: string;
};

export function useActionableButton({
  type,
}: ActionableButtonProps): ActionableButtonValues {
  const translate = useTranslate();
  const {
    textTransformers: { humanize },
  } = useRefineOptions();

  const key = `buttons.${type}`;
  const fallback = humanize(type);

  const label = translate(key, fallback);

  return { label };
}
