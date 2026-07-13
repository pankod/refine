import clsx from "clsx";
import React from "react";
import { useLocation } from "@docusaurus/router";
import { PlayOutlinedIcon } from "./icons/play-outlined";
import { LandingPlaygroundModal } from "./landing-playground-modal";
import { LandingRainbowButton } from "./landing-rainbow-button";

export const LandingPlayground = () => {
  const { search, hash } = useLocation();

  const [playgroundVisible, setPlaygroundVisible] = React.useState(false);

  const [params, setParams] = React.useState<Record<string, string>>({});

  React.useEffect(() => {
    const _params = new URLSearchParams(search);
    const paramsObj: Record<string, string> = {};

    // @ts-expect-error no downlevel iteration
    for (const [key, value] of _params.entries()) {
      paramsObj[key] = value;
    }

    setParams(paramsObj);
  }, [search]);

  const scrollToItem = React.useCallback(() => {
    const playgroundElement = document.getElementById("playground");
    if (playgroundElement) {
      playgroundElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
  }, []);

  React.useEffect(() => {
    if (params.playground || hash === "#playground") {
      scrollToItem();
    }
  }, [params.playground, hash]);

  React.useEffect(() => {
    if (playgroundVisible) {
      scrollToItem();
    }
  }, [playgroundVisible]);

  return (
    <>
      <div className={clsx("mb-12")}>
        <div className={clsx("w-full", "relative", "z-[1]")}>
          <div
            className={clsx(
              "bg-landing-planar-grid-mobile",
              "landing-lg:bg-landing-planar-grid",
              "w-full",
              "h-[156px]",
              "-mt-[64px]",
              "-mb-[140px]",
              "mx-auto",
              "landing-md:-mb-[112px]",
              "landing-lg:mb-0",
              "landing-lg:-mt-[256px]",
              "landing-lg:h-[312px]",
              "max-w-screen-landing-2xl",
              "bg-[length:720px_156px]",
              "landing-lg:bg-[length:1440px_312px]",
              "bg-no-repeat",
            )}
          />
          <div
            id="playground"
            className={clsx(
              "my-12",
              "max-w-screen-landing-content",
              "w-full",
              "mx-auto",
              "flex flex-col items-center justify-center",
              "gap-6",
              "landing-lg:gap-12",
            )}
            style={{
              scrollMarginTop: "4rem",
            }}
          >
            <div
              className={clsx(
                "text-[1.5rem]",
                "leading-[2rem]",
                "landing-md:text-[2rem]",
                "landing-md:leading-[2.5rem]",
                "landing-lg:text-[2.5rem]",
                "landing-lg:leading-[3rem]",
                "font-semibold",
                "text-center",
              )}
            >
              <span
                className={clsx(
                  "block landing-md:inline",
                  "bg-landing-text-bg",
                  "bg-clip-text",
                  "text-transparent",
                )}
              >
                Develop with your
              </span>{" "}
              <span
                className={clsx(
                  "block landing-md:inline",
                  "bg-landing-text-bg",
                  "bg-clip-text",
                  "text-transparent",
                )}
              >
                favorite tech stack
              </span>
            </div>
            <div
              className={clsx(
                "px-2 landing-md:px-0",
                "mx-auto",
                "w-full",
                "max-w-[464px]",
                "landing-md:max-w-[624px]",
                "h-[288px]",
                "landing-lg:max-w-[944px]",
                "landing-lg:h-[515px]",
                "flex",
              )}
            >
              <div
                className={clsx(
                  "flex-1",
                  "w-full",
                  "h-full",
                  "flex",
                  "bg-landing-playground-bg",
                  "border-opacity-50",
                  "backdrop-blur-xl",
                  "border-[1.5px]",
                  "border-refine-landing-playground-border",
                  "rounded-xl",
                  "overflow-hidden",
                  "relative",
                )}
              >
                <div
                  className={clsx(
                    "absolute",
                    "left-0 top-0",
                    "z-[2]",
                    "flex-1",
                    "w-full",
                    "h-full",
                    "hidden",
                    "landing-lg:flex",
                    "delay-200 transition-transform duration-200 ease-in-out",
                  )}
                  style={{
                    pointerEvents: playgroundVisible ? "initial" : "none",
                    transform: playgroundVisible ? "scale(1)" : "scale(0)",
                  }}
                >
                  <iframe
                    src="https://refine.new/embed-form"
                    className={clsx("w-full", "h-full", "border-none")}
                  />
                </div>
                <div className={clsx("flex", "flex-1", "w-full", "h-full")}>
                  <div className={clsx("flex-1", "min-w-[50%]")}>
                    <div
                      className={clsx(
                        "h-full w-full",
                        "flex items-start justify-center",
                        "flex-col",
                        "py-14",
                        "px-14",
                        "gap-6",
                      )}
                    >
                      <div
                        className={clsx(
                          "w-full",
                          "bg-landing-text-bg",
                          "bg-clip-text",
                          "text-transparent",
                          "text-[16px]",
                          "leading-[24px]",
                          "landing-lg:text-[24px]",
                          "landing-lg:leading-[32px]",
                          "text-center",
                          "landing-md:text-left",
                          "max-w-[304px]",
                          "mx-auto",
                          "landing-md:mx-0",
                        )}
                      >
                        Starting a new Refine project{" "}
                        <span className="block landing-lg:inline font-semibold">
                          takes less than one minute.
                        </span>
                      </div>
                      <div
                        className={clsx(
                          "w-full",
                          "text-[12px]",
                          "leading-[16px]",
                          "landing-lg:text-[16px]",
                          "landing-lg:leading-[24px]",
                          "text-gray-0",
                          "text-center",
                          "landing-md:text-left",
                          "max-w-[240px]",
                          "landing-md:max-w-[304px]",
                          "mx-auto",
                          "landing-md:mx-0",
                        )}
                      >
                        Use the setup wizard to create tailor-made architectures
                        for your project.
                      </div>
                      <div
                        className={clsx(
                          "w-full",
                          "flex",
                          "justify-center",
                          "landing-md:justify-start",
                        )}
                      >
                        <LandingRainbowButton
                          onClick={() => setPlaygroundVisible(true)}
                        >
                          <PlayOutlinedIcon />
                          <span className="text-base font-semibold">
                            Start Now!
                          </span>
                        </LandingRainbowButton>
                      </div>
                    </div>
                  </div>
                  <div
                    className={clsx(
                      "flex-1",
                      "hidden landing-md:block",
                      "min-w-[50%]",
                      "pointer-events-none",
                      "select-none",
                    )}
                  >
                    <div
                      className={clsx(
                        "w-full h-full",
                        "flex",
                        "justify-end",
                        "pr-8",
                        "landing-lg:pr-16",
                        "gap-4 landing-lg:gap-8",
                        "animation-parent",
                      )}
                    >
                      <div
                        className={clsx(
                          "-mt-[10%]",
                          "h-[120%]",
                          "w-[90px]",
                          "landing-lg:w-[177px]",
                          "overflow-hidden",
                          "animation-parent",
                          "landing-playground-slide-mask",
                        )}
                        style={{
                          transform: "translate3d(0,0,0) rotate(15deg)",
                        }}
                      >
                        <div
                          className={clsx(
                            "flex flex-col",
                            "animate-playground-slide-down-mobile",
                            "landing-lg:animate-playground-slide-down",
                            "transition-transform duration-100 ease-in-out",
                            "will-change-transform",
                          )}
                        >
                          <img
                            src="assets/landing-playground-slide-left.svg"
                            className={clsx(
                              "w-[90px]",
                              "h-[1655px]",
                              "landing-lg:w-[177px]",
                              "landing-lg:h-[3329px]",
                            )}
                            style={{
                              transform: "translateZ(0)",
                              perspective: "1000",
                              backfaceVisibility: "hidden",
                            }}
                          />
                          <img
                            src="assets/landing-playground-slide-left.svg"
                            className={clsx(
                              "w-[90px]",
                              "h-[1655px]",
                              "landing-lg:w-[177px]",
                              "landing-lg:h-[3329px]",
                            )}
                            style={{
                              transform: "translateZ(0)",
                              perspective: "1000",
                              backfaceVisibility: "hidden",
                            }}
                          />
                        </div>
                      </div>
                      <div
                        className={clsx(
                          "-mt-[10%]",
                          "h-[120%]",
                          "w-[90px]",
                          "landing-lg:w-[177px]",
                          "overflow-hidden",
                          "animation-parent",
                          "landing-playground-slide-mask",
                        )}
                        style={{
                          transform: "translate3d(0,0,0) rotate(15deg)",
                        }}
                      >
                        <div
                          className={clsx(
                            "flex flex-col",
                            "animate-playground-slide-up-mobile",
                            "landing-lg:animate-playground-slide-up",
                            "will-change-transform",
                          )}
                        >
                          <img
                            src="assets/landing-playground-slide-right.svg"
                            className={clsx(
                              "w-[90px]",
                              "h-[1655px]",
                              "landing-lg:w-[177px]",
                              "landing-lg:h-[3329px]",
                            )}
                            style={{
                              transform: "translateZ(0)",
                              perspective: "1000",
                              backfaceVisibility: "hidden",
                            }}
                          />
                          <img
                            src="assets/landing-playground-slide-right.svg"
                            className={clsx(
                              "w-[90px]",
                              "h-[1655px]",
                              "landing-lg:w-[177px]",
                              "landing-lg:h-[3329px]",
                            )}
                            style={{
                              transform: "translateZ(0)",
                              perspective: "1000",
                              backfaceVisibility: "hidden",
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className={clsx(
              "z-[-1]",
              "absolute",
              "w-full",
              "h-full",
              "left-0",
              "top-0",
              "flex items-center justify-center",
            )}
          >
            <div
              className={clsx(
                "w-full",
                "max-w-[1440px]",
                "landing-lg:mt-[110px]",
                "h-[200px]",
                "bg-landing-linear-spectrum",
                "bg-center",
                "bg-no-repeat",
                "bg-[length:1200px]",
                "blur-[128px]",
                "opacity-50",
              )}
              style={{
                transform: "translateZ(0)",
              }}
            />
          </div>
          <div
            className={clsx(
              "bg-landing-planar-grid-reversed-mobile",
              "landing-lg:bg-landing-planar-grid-reversed",
              "w-full",
              "h-[156px]",
              "-mt-[50px]",
              "landing-lg:mt-0",
              "-mb-[140px]",
              "mx-auto",
              "landing-lg:-mb-[240px]",
              "landing-lg:h-[312px]",
              "max-w-screen-landing-2xl",
              "bg-[length:720px_156px]",
              "landing-lg:bg-[length:1440px_312px]",
              "bg-no-repeat",
            )}
          />
        </div>
      </div>
      <LandingPlaygroundModal
        visible={playgroundVisible}
        close={() => setPlaygroundVisible(false)}
      />
    </>
  );
};
