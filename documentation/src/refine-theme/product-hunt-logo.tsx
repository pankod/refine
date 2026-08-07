import clsx from "clsx";
import React from "react";

interface ProductHuntLogoProps {
  className?: string;
}

export const ProductHuntLogo = ({ className }: ProductHuntLogoProps) => {
  return (
    <div className={clsx(className)}>
      <a
        href="https://www.producthunt.com/posts/refine-3?utm_source=badge-top-post-badge&utm_medium=badge&utm_souce=badge-refine&#0045;3"
        target="_blank"
        rel="noopener"
      >
        <img
          src="https://api.producthunt.com/widgets/embed-image/v1/top-post-badge.svg?post_id=362220&theme=dark&period=daily"
          alt="refine - 100&#0037;&#0032;open&#0032;source&#0032;React&#0032;framework&#0032;to&#0032;build&#0032;web&#0032;apps&#0032;3x&#0032;faster | Product Hunt"
          style={{
            width: "200px",
            height: "42px",
          }}
          width="250"
          height="54"
        />
      </a>
    </div>
  );
};
