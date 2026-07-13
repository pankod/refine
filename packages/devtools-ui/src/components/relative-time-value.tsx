import React from "react";
import dayjs from "dayjs";

export const RelativeTimeValue = ({
  value,
  ...props
}: {
  value: number;
} & React.HTMLAttributes<HTMLSpanElement>) => {
  const [time, setTime] = React.useState(dayjs(value).format("HH:mm:ss:SSS"));

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTime(dayjs(value).fromNow());
    }, 10000);

    return () => {
      clearInterval(interval);
    };
  }, [value]);

  return <span {...props}>{time}</span>;
};
