import type { ActionIconVariant, ButtonVariant } from "@mantine/core";

export const mapButtonVariantToActionIconVariant = (
  variant?: ButtonVariant,
): ActionIconVariant | undefined => {
  switch (variant) {
    case "white":
      return "default";
    default:
      return variant;
  }
};
