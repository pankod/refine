import type { contributor } from "@site/src/types/integrations";
import clsx from "clsx";
import React from "react";

type LargeCardProps = {
  title: string;
  description: string;
  linkUrl: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  contributors?: contributor[];
};

const Card: React.FC<LargeCardProps> = ({
  title,
  description,
  icon: Icon,
  linkUrl,
  contributors,
}) => {
  return (
    <a
      target="_blank"
      href={linkUrl}
      className={clsx(
        "flex gap-4 sm:gap-8",
        "no-underline",
        "p-4 sm:p-8",
        "border border-zinc-700",
        "rounded-2xl",
      )}
      rel="noopener"
    >
      <div className={clsx()}>
        <Icon className={clsx("w-6 h-6 sm:w-12 sm:h-12", "!text-white")} />
      </div>

      <div className={clsx("flex flex-col gap-2")}>
        <div className={clsx("text-zinc-200", "font-semibold")}>{title}</div>
        <div
          className={clsx("text-zinc-300", "text-xs sm:text-sm")}
          // biome-ignore lint/security/noDangerouslySetInnerHtml: explicitly disabled
          dangerouslySetInnerHTML={{ __html: description }}
        />
        {!!contributors?.length && (
          <div>
            {contributors?.map((contributor) => {
              return (
                <a
                  key={contributor.name}
                  target="_blank"
                  rel="noopener"
                  href={contributor.url}
                  className={clsx(
                    "no-underline flex items-center gap-1 text-xs mt-2 sm:mt-4",
                  )}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M4.85 2.4999C3.05507 2.4999 1.6 3.95498 1.6 5.7499C1.6 6.52375 1.86945 7.23249 2.32035 7.79056C2.33648 7.81052 2.35164 7.83126 2.36578 7.85268C2.38378 7.87995 2.40447 7.90599 2.42791 7.93045L7.60291 13.3305C7.70665 13.4387 7.85007 13.4999 8 13.4999C8.14993 13.4999 8.29336 13.4387 8.3971 13.3305L13.5721 7.93045C13.5956 7.90598 13.6163 7.87992 13.6343 7.85264C13.6484 7.8312 13.6636 7.81046 13.6797 7.79048C14.1306 7.23242 14.4 6.52372 14.4 5.7499C14.4 3.95498 12.9449 2.4999 11.15 2.4999C10.1294 2.4999 9.21901 2.96943 8.6219 3.70734C8.47001 3.89505 8.24146 4.0041 8 4.0041C7.75854 4.0041 7.53 3.89505 7.37811 3.70734C6.78099 2.96943 5.87062 2.4999 4.85 2.4999ZM0 5.7499C0 3.07132 2.17142 0.899902 4.85 0.899902C6.05251 0.899902 7.15304 1.33812 8 2.06206C8.84696 1.33812 9.94749 0.899902 11.15 0.899902C13.8286 0.899902 16 3.07132 16 5.7499C16 6.88992 15.6057 7.93996 14.9467 8.76805C14.8815 8.86278 14.8083 8.95295 14.7273 9.0375L9.55228 14.4375C9.14676 14.8606 8.58608 15.0999 8 15.0999C7.41392 15.0999 6.85324 14.8606 6.44773 14.4375L1.27273 9.0375C1.19175 8.95299 1.11855 8.86286 1.05343 8.76819C0.394354 7.94008 0 6.88998 0 5.7499Z"
                      fill="#FF4C4D"
                    />
                  </svg>
                  <span className={clsx("text-zinc-500")}>by</span>
                  <span className={clsx("text-zinc-300", "underline")}>
                    {contributor.name}
                  </span>
                </a>
              );
            })}
          </div>
        )}
      </div>
    </a>
  );
};

export default Card;
