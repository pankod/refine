import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";

dayjs.extend(relativeTime);

export const formattedDate = (time: string): string =>
  dayjs(time).format("D MMM YYYY, HH:mm");

export const timeFromNow = (time: string): string => dayjs(time).fromNow();
