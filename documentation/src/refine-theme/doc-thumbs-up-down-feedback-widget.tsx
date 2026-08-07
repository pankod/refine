import React, {
  type CSSProperties,
  type PropsWithChildren,
  type SVGProps,
  useState,
} from "react";
import clsx from "clsx";
import {
  autoUpdate,
  useFloating,
  useDismiss,
  useInteractions,
  offset,
  flip,
} from "@floating-ui/react";
import { AnimatePresence, motion } from "framer-motion";

// Type fixes for framer-motion v6 with React 17
const AnimatePresenceCompat = AnimatePresence as any;
const MotionDiv = motion.div as any;
import { useColorMode } from "@docusaurus/theme-common";
import { ThumbsUpIcon } from "./icons/thumbs-up";
import { ThumbsDownIcon } from "./icons/thumbs-down";
import {
  type SurveyOption,
  SurveyTypeEnum,
  useRefineCloudSurveyAPI,
} from "../hooks/use-refine-cloud-survey-api";
import { useLocation } from "@docusaurus/router";
import { PaperPlaneIcon } from "@radix-ui/react-icons";

type Props = {
  id: string;
};

export const DocThumbsUpDownFeedbackWidget = (
  props: PropsWithChildren<Props>,
) => {
  const location = useLocation();

  const [feedbackText, setFeedbackText] = useState("");
  const [selectedThumb, setSelectedThumb] = useState<SurveyOption | null>(null);
  const [isFeedbackTextIsVisible, setIsFeedbackTextIsVisible] = useState(false);
  const [resultViewVisible, setResultViewVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isPopoverVisible = isFeedbackTextIsVisible || resultViewVisible;

  const { survey, createSurvey, updateSurvey } = useRefineCloudSurveyAPI({
    type: SurveyTypeEnum.THUMBS,
  });

  const onThumbsUpDownClick = async (value: SurveyOption) => {
    setSelectedThumb(value);
    setIsFeedbackTextIsVisible(true);

    if (survey) {
      await updateSurvey({
        surveyId: survey.id,
        body: {
          response: value,
        },
      });
    } else {
      await createSurvey({
        body: {
          response: value,
          entityId: location.pathname,
          metaData: {
            sectionId: props.id,
          },
        },
      });
    }
  };

  const onFeedbackTextSubmit = async () => {
    const text = feedbackText.trim();
    if (!text) return;

    setIsSubmitting(true);
    try {
      await updateSurvey({
        surveyId: survey.id,
        body: { response: selectedThumb, responseText: text },
      });

      setResultViewVisible(true);
      setTimeout(() => {
        setIsFeedbackTextIsVisible(false);
        setResultViewVisible(false);
      }, 2000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="group">
      {props.children}
      <div
        className={clsx(
          "refine-feedback-widget",
          "relative",
          "z-popover",
          "hidden md:flex",
          "items-center",
          "gap-2",
          "w-max h-[32px]",
          "pt-1 pr-1 pb-1 pl-3",
          "bg-zinc-100 dark:bg-zinc-800",
          "rounded-lg",
          "transition-all duration-300 ease-in-out",
          !isPopoverVisible && "opacity-0",
          "group-hover:opacity-100",
        )}
      >
        <div
          className={clsx(
            "text-xs",
            "whitespace-nowrap",
            "text-zinc-700 dark:text-zinc-300",
            "tracking-[-0.006em]",
          )}
        >
          Was this helpful?
        </div>
        <div
          className={clsx("flex", "items-center", "gap-1", "widget-actions")}
        >
          <button
            type="button"
            onClick={() => onThumbsUpDownClick(THUMBS_VALUES.UP)}
            className={clsx(
              "group/thumbs",
              "w-6 h-6",
              "flex items-center justify-center",
              "rounded-[0.25rem]",
              "text-zinc-500 dark:text-zinc-400",
              selectedThumb !== THUMBS_VALUES.UP &&
                "hover:text-green-700/60 hover:bg-green-100/60  dark:hover:text-green-400/60 dark:hover:bg-green-900/60",
              selectedThumb === THUMBS_VALUES.UP &&
                "text-green-700 bg-green-100 dark:text-green-400 dark:bg-green-900",
              "transition-all duration-200 ease-in-out",
            )}
          >
            <ThumbsUpIcon
              className={clsx(
                selectedThumb === THUMBS_VALUES.UP &&
                  "text-green-700 dark:text-green-400",
                "group-hover/thumbs:text-green-400",
              )}
            />
          </button>
          <button
            type="button"
            onClick={() => onThumbsUpDownClick(THUMBS_VALUES.DOWN)}
            className={clsx(
              "group/thumbs",
              "w-6 h-6",
              "flex items-center justify-center",
              "rounded-[0.25rem]",
              "text-zinc-500 dark:text-zinc-400",
              selectedThumb !== THUMBS_VALUES.DOWN &&
                " hover:text-red-700/60 hover:bg-red-100/60 dark:hover:text-red-400/60 dark:hover:bg-red-900/60",
              selectedThumb === THUMBS_VALUES.DOWN &&
                "text-red-700 bg-red-100 dark:text-red-400 dark:bg-red-900",
              "transition-all duration-200 ease-in-out",
            )}
          >
            <ThumbsDownIcon
              className={clsx(
                selectedThumb === THUMBS_VALUES.DOWN && "text-red-400",
                "group-hover/thumbs:text-red-400",
              )}
            />
          </button>
        </div>
        <FeedbackTextPopover
          isOpen={isPopoverVisible}
          onOpenChange={(isOpen) => {
            if (resultViewVisible) return;

            if (!isOpen) {
              setIsFeedbackTextIsVisible(false);
              setResultViewVisible(false);
            }
          }}
          arrowStyle={{
            right: selectedThumb === 1 ? "184px" : "156px",
          }}
        >
          {!resultViewVisible && (
            <form
              className={clsx("flex flex-col", "p-1")}
              onSubmit={(e) => {
                e.preventDefault();
                onFeedbackTextSubmit();
              }}
            >
              <textarea
                rows={3}
                required
                minLength={3}
                placeholder="Your thumbs tells us a lot, but If you have any additional thoughts or suggestions, we'd love to hear them!"
                onChange={(e) => setFeedbackText(e.target.value)}
                value={feedbackText}
                className={clsx(
                  "w-full",
                  "bg-zinc-100 dark:bg-zinc-800",
                  "text-zinc-900 dark:text-zinc-100",
                  "resize-none",
                  "rounded-[0.25rem]",
                  "text-xs",
                  "py-2 px-2",
                  "tracking-[-0.006em]",
                )}
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className={clsx(
                  "min-w-[72px] h-8",
                  "flex items-center justify-center",
                  "bg-sky-400/15 dark:bg-sky-500/20",
                  "text-xs",
                  "text-sky-700 dark:text-sky-300",
                  "rounded-[0.25rem]",
                  "px-2",
                  "mt-1 ml-auto",
                  "tracking-[-0.006em]",
                  "flex",
                  "items-center",
                  "gap-1.5",
                  isSubmitting && "opacity-70 cursor-not-allowed",
                )}
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <PaperPlaneIcon /> <span>Send</span>
                  </>
                )}
              </button>
            </form>
          )}
          {resultViewVisible && (
            <div
              className={clsx(
                "flex items-center",
                "p-4",
                "text-xs",
                "text-zinc-700 dark:text-zinc-300",
                "tracking-[-0.006em]",
              )}
            >
              <span>Thank you for your feedback!</span>
            </div>
          )}
        </FeedbackTextPopover>
      </div>
    </div>
  );
};

const FeedbackTextPopover = (
  props: PropsWithChildren<{
    isOpen: boolean;
    arrowStyle?: CSSProperties;
    onOpenChange?: (isOpen: boolean) => void;
  }>,
) => {
  const [flipped, setFlipped] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    placement: "bottom-start",
    open: props.isOpen,
    onOpenChange: props.onOpenChange,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(({ middlewareData }) => {
        if (middlewareData?.flip) {
          return {
            mainAxis: 3,
          };
        }
        return {
          mainAxis: 35,
        };
      }),
      flip(({ placement }) => {
        if (placement.includes("bottom")) {
          setFlipped(false);
        }

        if (placement.includes("top")) {
          setFlipped(true);
        }

        return {
          fallbackPlacements: ["top-start"],
        };
      }),
    ],
  });
  const dismiss = useDismiss(context, {
    outsidePress: (event) =>
      !(event.target as HTMLElement)?.closest?.(".widget-actions"),
  });
  const { getReferenceProps, getFloatingProps } = useInteractions([dismiss]);

  return (
    <>
      <div
        ref={refs.setReference}
        {...getReferenceProps()}
        style={{
          position: "absolute",
          top: "0",
          left: 0,
        }}
      />
      <AnimatePresenceCompat>
        {context.open && (
          <MotionDiv
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.2 } }}
            exit={{ opacity: 0 }}
            ref={refs.setFloating}
            style={floatingStyles}
            {...getFloatingProps()}
            className={clsx(
              "w-[320px]",
              "bg-white dark:bg-zinc-900",
              "border border-zinc-200 dark:border-zinc-700",
              "rounded-lg",
              "relative",
              "shadow-lg",
            )}
          >
            {props.children}
            <PopoverPointer
              style={{
                position: "absolute",
                top: flipped ? "unset" : "-6px",
                bottom: flipped ? "-6px" : "unset",
                transform: flipped ? "rotate(180deg)" : "rotate(0deg)",
                transition: "right 0.2s ease-in-out",
                willChange: "right",
                ...props.arrowStyle,
              }}
            />
          </MotionDiv>
        )}
      </AnimatePresenceCompat>
    </>
  );
};

const PopoverPointer = (props: SVGProps<SVGSVGElement>) => {
  const { colorMode } = useColorMode();
  const isDarkTheme = colorMode === "dark";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={14}
      height={8}
      viewBox="0 0 14 8"
      fill="none"
      {...props}
    >
      <title>Popover Pointer</title>
      <path
        fill={isDarkTheme ? "#18181B" : "#FFFFFF"}
        stroke="url(#popover-pointer-a)"
        d="M13.5 7.5v-2h-.759c-1.266 0-2.42-.713-3.039-1.795l-1.4-2.45A1.482 1.482 0 0 0 7 .5c-.51 0-1.015.252-1.303.756l-1.4 2.45C3.68 4.785 2.526 5.5 1.26 5.5H.5v2h13Z"
      />
      <defs>
        <linearGradient
          id="popover-pointer-a"
          x1={7}
          x2={7}
          y1={0}
          y2={10}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset={0.6} stopColor={isDarkTheme ? "#3F3F46" : "#E4E4E7"} />
          <stop
            offset={0.6}
            stopColor={isDarkTheme ? "#3F3F46" : "#E4E4E7"}
            stopOpacity={0}
          />
        </linearGradient>
      </defs>
    </svg>
  );
};

const THUMBS_VALUES: Record<"UP" | "DOWN", SurveyOption> = {
  UP: 1,
  DOWN: 2,
};
