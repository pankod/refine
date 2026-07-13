type Props = {
  minutes: number;
};

export const getHourFromMinutes = ({ minutes }: Props) => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  return {
    hour: hours,
    minute: remainingMinutes,
    text: `${hours}h ${remainingMinutes}m`,
  };
};
