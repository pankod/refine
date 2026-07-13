import clsx from "clsx";
import React from "react";

import SearchBar from "../theme/SearchBar";

import { Dialog, Transition } from "@headlessui/react";
import { CommonHamburgerIcon } from "./common-hamburger-icon";
import { CommonThemeToggle, CommonThemeToggleAlt } from "./common-theme-toggle";
import { DocSearchButton } from "./doc-search-button";
import { socialLinks } from "./footer-data";
import { TutorialNavigation } from "./tutorial-navigation";
import { TutorialParameterDropdown } from "./tutorial-parameter-dropdown";
import { TutorialRefineLogo } from "./tutorial-refine-logo";

import Link from "@docusaurus/Link";

export const HEADER_HEIGHT = 65;

const TutorialModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <Transition appear show={isOpen} as={React.Fragment}>
      <Dialog as="div" className="relative z-mobileNavbar" onClose={onClose}>
        <Transition.Child
          as={React.Fragment}
          enter="ease-out duration-75"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-75"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-white dark:bg-zinc-800" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-start justify-center">
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-75"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-75"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Panel
                className={clsx("w-full h-[100dvh]", "flex flex-col", "px-2")}
              >
                <div
                  className={clsx(
                    "py-4",
                    "px-2",
                    "w-full h-16",
                    "flex items-center justify-between",
                  )}
                >
                  <TutorialRefineLogo />
                  <div className={clsx("flex items-center gap-4")}>
                    <CommonHamburgerIcon onClick={onClose} active={true} />
                  </div>
                </div>

                <div
                  className={clsx(
                    "relative",
                    "w-full max-w-[480px]",
                    "flex",
                    "flex-col",
                    "mx-auto",
                    "rounded-lg",
                    "border border-zinc-300 dark:border-zinc-600",
                    "flex flex-col gap-0",
                  )}
                >
                  <div
                    className={clsx(
                      "flex items-center justify-between",
                      "gap-10",
                      "px-4",
                      "py-4",
                      "border-b border-b-zinc-200 dark:border-b-zinc-600",
                    )}
                  >
                    <span
                      className={clsx(
                        "text-sm",
                        "text-zinc-800",
                        "dark:text-white",
                      )}
                    >
                      Appearance
                    </span>
                    <CommonThemeToggleAlt />
                  </div>
                  <div
                    className={clsx(
                      "flex items-center justify-between",
                      "gap-10",
                      "px-4",
                      "py-4",
                      "border-b border-b-zinc-200 dark:border-b-zinc-600",
                    )}
                  >
                    <Link
                      to="/core/"
                      className={clsx(
                        "text-sm",
                        "no-underline",
                        "hover:no-underline",
                        "font-semibold",
                        "text-zinc-800 dark:text-white",
                      )}
                    >
                      Refine Home
                    </Link>
                  </div>
                  <div
                    className={clsx(
                      "flex items-center justify-between",
                      "gap-10",
                      "px-4",
                      "py-4",
                      "border-b border-b-zinc-200 dark:border-b-zinc-600",
                    )}
                  >
                    <Link
                      to="/core/docs/"
                      className={clsx(
                        "text-sm",
                        "no-underline",
                        "hover:no-underline",
                        "font-semibold",
                        "text-zinc-800 dark:text-white",
                      )}
                    >
                      Documentation
                    </Link>
                  </div>
                  <div
                    className={clsx(
                      "flex items-start justify-between",
                      "px-4",
                      "py-4",
                      "bg-zinc-100 dark:bg-zinc-700",
                      "flex-col tutorial-sm:flex-row",
                      "gap-4",
                    )}
                  >
                    <div
                      className={clsx(
                        "dark:text-white text-zinc-800",
                        "text-sm leading-6",
                      )}
                    >
                      Join us on
                    </div>
                    <div
                      className={clsx(
                        "flex gap-4",
                        "dark:text-zinc-400 text-zinc-500",
                      )}
                    >
                      {socialLinks.map(({ href, icon: Icon }, i) => {
                        return (
                          <a
                            key={i}
                            href={href}
                            target="_blank"
                            rel="noopener"
                            className={clsx("flex items-center no-underline")}
                          >
                            <Icon
                              className={clsx(
                                "w-9 h-9 tutorial-sm:w-6 tutorial-sm:h-6",
                              )}
                            />
                          </a>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  return (
    <div className={clsx("w-full", "flex", "items-center", "mx-auto", "gap-6")}>
      <div
        className={clsx(
          "flex-1",
          "flex",
          "justify-start",
          "items-center",
          "gap-6",
          "tutorial-md:gap-12",
          "max-w-[656px]",
        )}
      >
        <TutorialRefineLogo />
        <div className={clsx("hidden", "tutorial-sm:flex", "flex-1")}>
          <TutorialNavigation />
        </div>
      </div>
      <div
        className={clsx(
          "flex-shrink-0",
          "ml-auto",
          "tutorial-lg:flex-1",
          "flex",
          "justify-end",
          "items-center",
          "gap-2",
        )}
      >
        <div
          className={clsx(
            "hidden tutorial-lg:flex",
            "flex-1",
            "items-center",
            "justify-start",
            "gap-2",
          )}
        >
          <TutorialParameterDropdown
            label="Routing"
            parameter="routerSelection"
          />
          <TutorialParameterDropdown
            label="UI Framework"
            parameter="uiSelection"
          />
        </div>
        <div
          className={clsx("hidden tutorial-md:flex items-center justify-start")}
        >
          <SearchBar />
        </div>

        <div className={clsx("tutorial-md:hidden flex")}>
          <SearchBar
            CustomButton={React.forwardRef<
              HTMLButtonElement,
              React.PropsWithChildren<{}>
            >(function CustomButton(props, ref) {
              return <DocSearchButton ref={ref} {...props} iconOnly />;
            })}
          />
        </div>

        <CommonThemeToggle
          className={clsx(
            "scale-75",
            "tutorial-sm:scale-100",
            "!hidden tutorial-md:!flex",
          )}
        />

        <CommonHamburgerIcon
          onClick={() => setIsSidebarOpen(true)}
          active={isSidebarOpen}
          className="flex tutorial-md:!hidden"
        />
      </div>
      <TutorialModal
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
    </div>
  );
};

export const MobileNavigation = () => {
  return (
    <div
      className={clsx(
        "flex tutorial-sm:hidden",
        "pt-4",
        "w-full",
        "max-w-[464px]",
      )}
    >
      <TutorialNavigation />
    </div>
  );
};

export const TutorialHeader = React.memo(function TutorialHeaderComponent() {
  return (
    <div
      className={clsx(
        "flex items-center justify-center",
        "flex-col",
        "min-h-16",
        "pb-4 tutorial-sm:pb-0",
        "z-10",
        "sticky",
        "top-0",
        "pr-4 tutorial-md:pr-6",
        "bg-white dark:bg-neutral-900",
      )}
    >
      <Header />
      <MobileNavigation />
    </div>
  );
});
