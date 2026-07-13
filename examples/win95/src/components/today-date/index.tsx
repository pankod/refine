import styled from "styled-components";
import dayjs from "dayjs";
import { Frame } from "react95";

type Props = {
  className?: string;
};

export const VideoClubTodayDate = ({ className }: Props) => {
  const today = dayjs().year(1995);
  // format today as "weekday, month day, year"
  const date = today.format("dddd, MMMM D, YYYY");
  // format today as "hour:minute AM/PM""
  const hour = today.format("hh:mm A");

  return (
    <Container className={className} variant="field">
      <DateText>{date}</DateText>
      <HourText>{hour}</HourText>
    </Container>
  );
};

const Container = styled(Frame)`
  display: flex;
  gap: 16px;
  padding: 10px;
  background-color: black;
  user-select: none;
`;

const DateText = styled.p`
  color: rgba(217, 217, 217, 1);
`;

const HourText = styled.p`
  color: rgba(103, 248, 65, 1);
`;
