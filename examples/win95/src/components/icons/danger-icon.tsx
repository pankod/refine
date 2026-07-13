import styled from "styled-components";
import { getImagesUrl } from "../../utils/get-cdn-url";

type Props = {
  message?: string;
};

export const DangerIcon = ({ message }: Props) => {
  return (
    <Container>
      <StyledDangerIcon
        src={getImagesUrl("/error-icon.png")}
        alt={message}
        aria-label={message}
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledDangerIcon = styled.img`
  width: 24px;
  height: 24px;
  vertical-align: sub;
`;
