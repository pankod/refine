import React, { type FC } from "react";
import { useColorMode } from "@docusaurus/theme-common";
import BrowserOnly from "@docusaurus/BrowserOnly";

type Props = Omit<
  React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  >,
  "src"
> & {
  srcDark: string;
  srcLight: string;
  srcSetDark?: string;
  srcSetLight?: string;
};

export const CommonThemedImage: FC<Props> = ({
  srcDark,
  srcLight,
  srcSetDark,
  srcSetLight,
  ...props
}) => {
  const { colorMode } = useColorMode();
  const src = colorMode === "dark" ? srcDark : srcLight;
  const srcSet = colorMode === "dark" ? srcSetDark : srcSetLight;

  return (
    <BrowserOnly>
      {() => <img {...props} src={src} srcSet={srcSet} />}
    </BrowserOnly>
  );
};
