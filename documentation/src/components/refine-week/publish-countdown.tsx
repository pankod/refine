import { useCountdown } from "@site/src/hooks/use-countdown";
import clsx from "clsx";
import React from "react";

type Props = {
  publishDate: string;
  className?: string;
};

const PublishCountdown = ({ publishDate, className }: Props) => {
  const { value } = useCountdown({ targetDate: publishDate });

  const hours = (value.days * 24 + value.hours).toString().padStart(2, "0");
  const minutes = value.minutes.toString().padStart(2, "0");
  const seconds = value.seconds.toString().padStart(2, "0");

  const hasTime = hours !== "00" || minutes !== "00" || seconds !== "00";

  return (
    <div
      className={clsx(
        "flex justify-center items-center gap-4",
        "mx-auto",
        "text-gray-900",
        className,
      )}
    >
      <svg
        width="222"
        height="40"
        viewBox="0 0 222 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M219.508 22.2073L219.509 22.2065C219.836 21.5076 220 20.7539 220 20C220 19.2462 219.836 18.4924 219.509 17.7935L219.508 17.7927L213.508 4.99297C212.652 3.16635 210.817 2 208.8 2H13.2C11.183 2 9.34777 3.16633 8.49158 4.99292C8.49157 4.99294 8.49156 4.99295 8.49155 4.99297L2.49158 17.7927L2.49123 17.7935C2.16394 18.4924 2 19.2462 2 20C2 20.7539 2.16394 21.5076 2.49123 22.2065L2.49158 22.2073L8.49155 35.007C8.49156 35.007 8.49157 35.0071 8.49158 35.0071C9.34777 36.8337 11.183 38 13.2 38H208.8C210.817 38 212.652 36.8336 213.508 35.007L219.508 22.2073Z"
          fill="#FFBF00"
          className="text-gray-0 dark:text-gray-900"
          stroke="currentColor"
          strokeWidth="4"
        />

        {!hasTime && (
          <text
            className={clsx("text-gray-900")}
            x="64"
            y="25"
            fontSize="16px"
            fontWeight={700}
            fill="currentColor"
          >
            Unlocks soon
          </text>
        )}

        {hasTime && (
          <>
            <text
              className={clsx("text-gray-900")}
              x="28"
              y="25"
              fontSize="16px"
              fill="currentColor"
            >
              Unlocks in
            </text>
            <text
              className={clsx("text-gray-900")}
              x="116"
              y="25"
              fontSize="16px"
              fontWeight={700}
              fill="currentColor"
            >
              {hours} : {minutes} : {seconds}
            </text>
          </>
        )}
      </svg>
    </div>
  );
};

export default PublishCountdown;
