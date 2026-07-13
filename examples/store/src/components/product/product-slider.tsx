import React from "react";
import clsx from "clsx";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import Image from "next/legacy/image";
import type { Product } from "@medusajs/medusa";

type Props = {
  product: Product;
};

export const ProductSlider = ({ product }: Props) => {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [ref, slider] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: { perView: 1 },
    slideChanged(s) {
      const slideNumber = s.track.details.rel;
      setCurrentSlide(slideNumber);
    },
  });

  return (
    <>
      <div
        ref={ref}
        className={clsx(
          "keen-slider",
          "flex-1",
          "w-full",
          "aspect-[9/10]",
          "bg-gray-lighter",
          "rounded-3xl",
        )}
      >
        {product.images.map((image, i: number) => (
          <div
            key={image.url}
            className={clsx(
              "keen-slider__slide",
              "flex",
              "items-center",
              "justify-center",
              "relative",
              "!w-full",
              "!min-w-full",
            )}
          >
            <Image
              src={image.url?.replace(
                "https://refine-store.fra1.cdn.digitaloceanspaces.com/",
                "",
              )}
              alt={"Product Image"}
              className={clsx("object-cover", "object-center")}
              layout="fill"
              quality="100"
            />
          </div>
        ))}
      </div>
      {product.images.length > 1 ? (
        <div className={clsx("relative", "w-full", "h-32", "mt-12")}>
          <div
            className={clsx(
              "absolute",
              "inset-0",
              "w-full",
              "h-full",
              "overflow-scroll",
              "scrollbar-hidden",
            )}
          >
            <div
              className={clsx(
                "flex",
                "items-center",
                "justify-start",
                "gap-6",
                "p-1",
              )}
            >
              {product.images.map((image, i: number) => (
                <button
                  key={image.url}
                  type="button"
                  onClick={() => slider.current?.moveToIdx(i)}
                  className={clsx(
                    "h-[120px] w-[108px]",
                    "flex-shrink-0",
                    "flex",
                    "items-center",
                    "justify-center",
                    "bg-gray-lighter",
                    "transition-all",
                    "duration-75",
                    "ease-in-out",
                    "delay-100",
                    "rounded-lg",
                    "border-2 border-solid",
                    currentSlide === i
                      ? "border-gray-darkest"
                      : "hover:border-gray-darkest border-transparent hover:border-opacity-50",
                  )}
                >
                  <Image
                    src={image.url?.replace(
                      "https://refine-store.fra1.cdn.digitaloceanspaces.com/",
                      "",
                    )}
                    alt={"Product Image"}
                    className={clsx("object-contain", "object-center")}
                    width={600}
                    height={600}
                    quality="100"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};
