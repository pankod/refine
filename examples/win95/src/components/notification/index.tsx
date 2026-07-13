import type { OpenNotificationParams } from "@refinedev/core";
import styled, { type CSSProperties } from "styled-components";
import { getImagesUrl } from "@/utils/get-cdn-url";

type Props = {
  className?: string;
  style?: CSSProperties;
} & OpenNotificationParams;

export const Notification = (props: Props) => {
  return (
    <Container style={props.style}>
      <Shadow />
      <Wrapper>
        <Icon
          src={
            props.type === "success"
              ? getImagesUrl("/checkmark-icon.png")
              : getImagesUrl("/error-icon.png")
          }
        />
        <Content>
          <Title>{props.message}</Title>
          <Description>{props.description}</Description>
        </Content>
      </Wrapper>
    </Container>
  );
};

export const Container = styled.div`
  display: flex;
  position: relative;
  margin-bottom: 64px;
  margin-right: 8px;
`;

const Wrapper = styled.div`
  width: 320px;
  min-height: 60px;
  padding-left: 16px;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-right: 16px;
  display: flex;
  align-items: center;
  background-color: #ffffe5;
  border: 4px solid #000;
  box-shadow: 0px 0px 0px 4px #b5b6b5 inset;
  z-index: 1;
`;

const Shadow = styled.div`
  position: absolute;
  z-index: 0;
  width: 320px;
  min-height: 60px;
  right: -12px;
  bottom: -16px;
  background-image: linear-gradient(45deg, #000 25%, transparent 25%),
    linear-gradient(-45deg, #000 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, #000 75%),
    linear-gradient(-45deg, transparent 75%, #000 75%);
  background-size: 10px 10px;
  background-position: bottom right, bottom 5px right 0, bottom 5px right -5px,
    bottom 0px right 5px;
`;

const Icon = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 16px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 4px;
`;

const Title = styled.div``;

const Description = styled.div`
  font-weight: 600;
`;
