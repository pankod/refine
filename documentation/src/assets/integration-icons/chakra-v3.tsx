import * as React from "react";
import type { SVGProps } from "react";

const SvgChakrav3 = ({
  withBrandColor = true,
  ...props
}: SVGProps<SVGSVGElement> & { withBrandColor?: boolean }) => (
  <svg width="65" height="65" viewBox="0 0 36 36" {...props}>
    <path
      d="M34.5655 17.9244L28.0585 16.7206L27.3139 18.0099L25.4813 21.1828L20.7231 29.4212C20.5147 29.7819 19.9653 29.6335 19.9653 29.2166V22.2928V21.5412C19.9653 21.1509 19.6901 20.8153 19.3087 20.7404L11.8954 19.2841L5.25929 18.0708C5.26937 18.4155 5.35079 18.7586 5.50582 19.0761L10.9828 28.5803C11.7469 29.9063 13.1577 30.7221 14.6835 30.7201L25.1868 30.7061C26.7118 30.7041 28.1198 29.8854 28.8808 28.5585L34.2409 19.2113C34.4694 18.8138 34.5768 18.3679 34.5655 17.9244Z"
      fill="url(#paint0_linear_:Rcpjajsrkq:)"
    />
    <path
      d="M12.642 17.9885L14.4774 14.8034L19.2073 6.59529C19.4154 6.2342 19.9653 6.38242 19.9653 6.79963V14.471C19.9653 14.8617 20.2411 15.1976 20.6231 15.272L28.0585 16.7207L34.5655 17.9245C34.5572 17.5987 34.4841 17.2747 34.3464 16.9717C34.314 16.9004 34.2792 16.8299 34.2397 16.7613L28.8728 7.42387C28.1102 6.09724 26.7007 5.27994 25.1753 5.27994H14.6361C13.1082 5.27994 11.6968 6.09981 10.9352 7.42979L5.58357 16.7749C5.57125 16.7963 5.56056 16.8184 5.54894 16.8401C5.34348 17.2237 5.24692 17.6483 5.25929 18.0708L11.8954 19.2841L12.642 17.9885Z"
      fill="url(#paint1_linear_:Rcpjajsrkq:)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_:Rcpjajsrkq:"
        x1="33.9534"
        y1="23.645"
        x2="5.78627"
        y2="23.9059"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#3585A3" />
        <stop offset="1" stopColor="#00DEAE" />
      </linearGradient>
      <linearGradient
        id="paint1_linear_:Rcpjajsrkq:"
        x1="6.67767"
        y1="12.4545"
        x2="31.7007"
        y2="11.8021"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#3585A3" />
        <stop offset="1" stopColor="#00DEAE" />
      </linearGradient>
    </defs>
  </svg>
);

export default SvgChakrav3;
