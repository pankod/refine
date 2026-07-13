import React, { type FC, Fragment, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { LandingRainbowButton } from "@site/src/refine-theme/landing-rainbow-button";
import { ArrowRightIcon } from "@site/src/refine-theme/icons/arrow-right";
import Link from "@docusaurus/Link";
import { Dialog, Transition } from "@headlessui/react";
import { CloseIcon } from "@site/src/refine-theme/icons/close";
import useScrollTracker from "@site/src/hooks/use-scroll-tracker";
import useLocalStorage from "@site/src/hooks/use-localstorage";
import { useLocation } from "@docusaurus/router";
import { pushGtmEvent } from "@site/src/utils/gtm";

const SCROLL_TRESHOLD = 79;
const SCROLL_MAX = 100;
const MAX_VISIT_COUNT = 9;

type Props = {
  title?: string;
  variant?: "gray" | "purple";
  image?: {
    src?: string;
    alt?: string;
    href?: string;
  };
  button?: {
    text: string;
    href?: string;
    onClick?: () => void;
  };
};

export const BannerModal: FC<Props> = ({
  title = "refine's app scaffolder offers +720 customizable CRUD app codebase combinations.",
  variant = "purple",
  image = {
    src: "https://refine.ams3.cdn.digitaloceanspaces.com/website/static/banners/playground.gif",
    alt: "refine App screenshot",
    href: "https://refine.dev/?ref=banner-modal",
  },
  button = {
    text: "Try online",
    href: "https://refine.dev/?ref=banner-modal",
    onClick: undefined,
  },
}) => {
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [visitCount, setVisitCount] = useLocalStorage("banner-modal", null);
  const scrollTresholdExceeded = useRef(false);

  const tracker = useScrollTracker();

  useEffect(() => {
    if (pathname === "/blog/" || pathname === "/blog") return;
    if (scrollTresholdExceeded.current || isOpen) return;

    if (tracker.scrollY > SCROLL_TRESHOLD && tracker.scrollY < SCROLL_MAX) {
      scrollTresholdExceeded.current = true;

      if (visitCount === MAX_VISIT_COUNT || visitCount === null) {
        setIsOpen(true);
        setVisitCount(0);
      } else {
        setVisitCount(visitCount + 1);
        scrollTresholdExceeded.current = true;
      }
    }
  }, [tracker.scrollY]);

  useEffect(() => {
    if (!isOpen || typeof window === "undefined") return;
    pushGtmEvent({
      event: "view_banner",
      banner_name: "banner-modal",
      banner_text: title,
      banner_image: image.src,
    });
  }, [isOpen]);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-modal"
        onClose={() => setIsOpen(false)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-75"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-75"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-900/70" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-start justify-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-75"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-75"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Panel
                className={clsx(
                  "w-full min-h-screen",
                  "flex flex-col justify-center items-center",
                )}
              >
                <div
                  className={clsx(
                    "relative",
                    "rounded-3xl",
                    "max-w-[576px]",
                    "py-8",
                    "px-4 md:px-8",
                    variant === "gray" && "bg-banner-examples-modal-gray",
                    variant === "purple" && "bg-banner-examples-modal-purple",
                  )}
                >
                  <div
                    className={clsx(
                      "flex",
                      "flex-col",
                      "items-center",
                      "gap-8",
                      "text-center",
                      "not-prose",
                    )}
                  >
                    <Link
                      to={image?.href ?? button?.href}
                      target="_blank"
                      rel="noopener"
                      className={clsx(
                        "flex",
                        "h-auto xl:h-[192px]",
                        "flex-shrink-0",
                        "rounded-lg",
                        "overflow-hidden",
                        "focus:outline-none",
                      )}
                    >
                      <img
                        className={clsx("object-contain")}
                        src={image?.src}
                        alt={image?.alt ?? title}
                        loading="lazy"
                      />
                    </Link>
                    <p
                      className={clsx(
                        "text-2xl",
                        "font-semibold",
                        variant === "gray" && "bg-clip-text",
                        variant === "gray" && "text-transparent",
                        variant === "gray" && "bg-banner-examples-text",
                        variant === "purple" && "text-gray-0",
                      )}
                    >
                      {title}
                    </p>
                    <LandingRainbowButton
                      className={clsx("w-max")}
                      buttonClassname={clsx("!px-4", "!py-4")}
                      href={button.href}
                      onClick={button.onClick}
                      target="_blank"
                      rel="noopener"
                    >
                      <div
                        className={clsx(
                          "text-gray-900",
                          "text-base",
                          "font-bold",
                        )}
                      >
                        {button.text}
                      </div>
                      <ArrowRightIcon className={clsx("w-4", "h-4")} />
                    </LandingRainbowButton>
                  </div>
                  <button
                    className={clsx(
                      "absolute",
                      "top-2 right-2",
                      "w-8 h-8",
                      "flex items-center justify-center flex-shrink-0",
                      "text-gray-0",
                      "rounded-full",
                      "bg-gray-900/20",
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    <CloseIcon className="w-4 h-4" />
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
