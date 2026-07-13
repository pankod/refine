import React from "react";
import clsx from "clsx";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

export const Image = (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
  const src = getImgixSrc(props.src ?? "");
  const handleWrapperClick: React.MouseEventHandler<HTMLSpanElement> = (
    event,
  ) => {
    const clickedImage = (event.target as HTMLElement).closest("img");
    const hasModifierKey =
      event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;

    if (event.currentTarget.closest("a") && clickedImage && !hasModifierKey) {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  return (
    <span
      onClick={handleWrapperClick}
      className={clsx(
        "blog-content-bleed",
        "block",
        "w-full",
        "h-auto",
        "overflow-hidden",
        "rounded-2xl",
        "bg-white",
        "dark:bg-[#09090B80]",
        "border",
        "border-zinc-200",
        "dark:border-zinc-800",
        "p-2",
        "mt-6",
        "mb-8",
        props.className,
      )}
    >
      <Zoom isDisabled={!src} wrapElement="span">
        <img
          {...props}
          src={src}
          className={clsx(
            "w-full h-auto",
            "object-contain",
            "object-center",
            "rounded-lg",
            "!m-0",
          )}
          loading="lazy"
          decoding="async"
          alt={props.alt ?? ""}
        />
      </Zoom>
      {props.alt && (
        <span
          className={clsx(
            "block",
            "flex",
            "items-center",
            "font-medium",
            "mt-2",
            "p-2",
            "text-sm",
            "tracking-[-0.007em]",
            "text-zinc-500",
            "dark:text-zinc-400",
            "!no-underline hover:!no-underline",
          )}
        >
          {props.alt}
        </span>
      )}
    </span>
  );
};

export const getImgixSrc = (src: string) => {
  const shouldBypassImgix = src?.endsWith(".avif") || src?.endsWith(".webp");

  const imgixSrc = shouldBypassImgix
    ? src
    : `${src?.replace(
        "https://refine.ams3.cdn.digitaloceanspaces.com",
        "https://refine-web.imgix.net",
      )}?fm=webp&auto=format`;

  return imgixSrc;
};
