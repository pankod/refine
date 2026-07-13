import type { PropsWithChildren } from "react";

import {
  createGlobalStyle,
  ThemeProvider as BaseThemeProvider,
} from "styled-components";
import { styleReset } from "react95";
import themeOriginal from "react95/dist/themes/original";
import { getFontsUrl } from "@/utils/get-cdn-url";

const GlobalStyles = createGlobalStyle`
  ${styleReset}
  @font-face {
    font-family: 'ms_sans_serif';
    src: url(${getFontsUrl("/ms_sans_serif.woff2")}) format('woff2');
    font-weight: 400;
    font-style: normal
  }
  @font-face {
    font-family: 'ms_sans_serif';
    src: url(${getFontsUrl("/ms_sans_serif_bold.woff2")}) format('woff2');
    font-weight: bold;
    font-style: normal
  }
  @font-face {
    font-family: 'pixelated-times-new-roman';
    src: url(${getFontsUrl("/pixelated-times-new-roman.ttf")}) format('truetype'), 
         url(${getFontsUrl("/pixelated-times-new-roman.otf")}) format('otf');
    font-weight: 400;
    font-style: normal
  }
  body {
    background: ${themeOriginal.desktopBackground};
    font-family: 'ms_sans_serif', sans-serif;
  }
  div {
    line-height: 20px;
  }
  tr > td > a {
    color: #0000FF;
    text-decoration: none;
  }
  tr:hover {
     td > a {
        color: #80FBFE !important;
     }  
  }

  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  return (
    <>
      <GlobalStyles />
      <BaseThemeProvider theme={themeOriginal}>{children}</BaseThemeProvider>
    </>
  );
};

export const theme = themeOriginal;
