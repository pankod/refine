import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useGo, useResourceParams, useTranslate } from "@refinedev/core";
import { ChevronLeft, InfoIcon } from "lucide-react";
import { useEffect, useState } from "react";

/**
 * When the app is navigated to a non-existent route, refine shows a default error page.
 * A custom error component can be used for this error page.
 *
 * @see {@link https://refine.dev/docs/packages/documentation/routers/} for more details.
 */
export function ErrorComponent() {
  const [errorMessage, setErrorMessage] = useState<string>();

  const translate = useTranslate();
  const go = useGo();

  const { resource, action } = useResourceParams();

  useEffect(() => {
    if (resource && action) {
      setErrorMessage(
        translate(
          "pages.error.info",
          {
            action: action,
            resource: resource?.name,
          },
          `You may have forgotten to add the "${action}" component to "${resource?.name}" resource.`,
        ),
      );
    }
  }, [resource, action, translate]);

  return (
    <div
      className={cn(
        "flex",
        "items-center",
        "justify-center",
        "bg-background",
        "my-auto",
      )}
    >
      <div className={cn("text-center", "space-y-8")}>
        <div className={cn("flex", "justify-center")}>
          <svg
            width="199"
            height="73"
            viewBox="0 0 199 73"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={cn("w-48", "h-auto")}
          >
            <title>404 text</title>
            <path
              d="M0.293794 60.0909V45.3636L25.112 1.18182H43.2483L18.9756 44.8182V45.3636H60.4302V60.0909H0.293794ZM34.2483 71V55.7273L34.9302 49.1818V27.3636H51.9756V71H34.2483ZM98.983 72.9091C92.642 72.8864 87.1648 71.4205 82.5511 68.5114C77.9375 65.6023 74.3807 61.4091 71.8807 55.9318C69.3807 50.4545 68.142 43.8864 68.1648 36.2273C68.1875 28.5455 69.4375 22.0227 71.9148 16.6591C74.4148 11.2955 77.9602 7.21591 82.5511 4.42045C87.1648 1.625 92.642 0.22727 98.983 0.22727C105.324 0.22727 110.801 1.63636 115.415 4.45455C120.028 7.25 123.585 11.3295 126.085 16.6932C128.585 22.0568 129.824 28.5682 129.801 36.2273C129.801 43.9318 128.551 50.5227 126.051 56C123.551 61.4773 119.994 65.6705 115.381 68.5795C110.79 71.4659 105.324 72.9091 98.983 72.9091ZM98.983 57.5C102.256 57.5 104.938 55.7955 107.028 52.3864C109.142 48.9545 110.188 43.5682 110.165 36.2273C110.165 31.4318 109.688 27.5114 108.733 24.4659C107.778 21.4205 106.46 19.1705 104.778 17.7159C103.097 16.2386 101.165 15.5 98.983 15.5C95.7102 15.5 93.0398 17.1591 90.9716 20.4773C88.9034 23.7955 87.8466 29.0455 87.8011 36.2273C87.7784 41.1136 88.2443 45.1364 89.1989 48.2955C90.1534 51.4318 91.4716 53.75 93.1534 55.25C94.858 56.75 96.8011 57.5 98.983 57.5ZM138.209 60.0909V45.3636L163.027 1.18182H181.164L156.891 44.8182V45.3636H198.345V60.0909H138.209ZM172.164 71V55.7273L172.845 49.1818V27.3636H189.891V71H172.164Z"
              fill="url(#paint0_linear_2672_10455)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_2672_10455"
                x1="99"
                y1="-16"
                x2="99"
                y2="88"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#D4D4D8" />
                <stop offset="1" stopColor="#E4E4E7" stopOpacity="0.25" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className={cn("space-y-4")}>
          <h1 className={cn("text-2xl", "font-semibold", "text-foreground")}>
            {translate("pages.error.title", "Page not found.")}
          </h1>

          <div
            className={cn("flex", "items-center", "justify-center", "gap-2")}
          >
            <p className={cn("text-muted-foreground")}>
              {translate(
                "pages.error.description",
                "The page you're looking for does not exist.",
              )}
            </p>
            {errorMessage && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <InfoIcon
                      className={cn(
                        "h-4",
                        "w-4",
                        "text-muted-foreground",
                        "cursor-help",
                      )}
                      data-testid="error-component-tooltip"
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{errorMessage}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        </div>

        <Button
          onClick={() => {
            go({ to: "/" });
          }}
          className={cn("flex", "items-center", "gap-2", "mx-auto")}
        >
          <ChevronLeft className={cn("h-4", "w-4")} />
          {translate("pages.error.backHome", "Back to homepage")}
        </Button>
      </div>
    </div>
  );
}

ErrorComponent.displayName = "ErrorComponent";
