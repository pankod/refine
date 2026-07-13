import { useLogin } from "@refinedev/core";
import type { FormEvent } from "react";
import {
  Button,
  TextInput,
  Window,
  WindowContent,
  WindowHeader,
} from "react95";
import styled from "styled-components";
import { IconQuestionMark } from "@/components/icons";
import { Popover } from "@/components/tooltip";
import { getImagesUrl } from "@/utils/get-cdn-url";

export const LoginPage = () => {
  const { mutate } = useLogin();

  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = new FormData(e.currentTarget);
    const email = form.get("email");
    const password = form.get("password");

    mutate({ email, password });
  };

  return (
    <Wrapper>
      <Window>
        <Header>
          Welcome to Windows 95
          <Popover
            id="tooltip-wrapper"
            content={
              <Hint>
                <HintRow>
                  <HintLabel>Email:</HintLabel>
                  <HintValue>demo@refine.dev</HintValue>
                </HintRow>
                <HintRow>
                  <HintLabel>Password:</HintLabel>
                  <HintValue>demo</HintValue>
                </HintRow>
              </Hint>
            }
            enterDelay={100}
          >
            <Button>
              <IconQuestionMark />
            </Button>
          </Popover>
        </Header>
        <Content>
          <WindowsKeyImage
            src={`${getImagesUrl("/windows-key.png")}`}
            alt="windows key"
          />
          <FormContainer id="loginForm" onSubmit={onFormSubmit}>
            <p>Type your email and password to log on.</p>

            <InputWrapper>
              <InputLabel htmlFor="email">Email:</InputLabel>
              <Input
                id="email"
                name="email"
                type="email"
                value="demo@refine.dev"
              />
            </InputWrapper>

            <InputWrapper>
              <InputLabel htmlFor="password">Password:</InputLabel>
              <Input
                id="password"
                name="password"
                type="password"
                value="demo"
              />
            </InputWrapper>
          </FormContainer>

          <SubmitButton size="md" type="submit" form="loginForm">
            OK
          </SubmitButton>
        </Content>
      </Window>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100dvh;
  margin-left: auto;
  margin-right: auto;
  margin-top: auto;
  margin-bottom: auto;
`;

const Header = styled(WindowHeader)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Hint = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const HintRow = styled.div`
  display: flex;
  gap: 8px;
`;

const HintLabel = styled.div`
  font-weight: 600;
`;

const HintValue = styled.div`
  font-weight: 400;
`;

const Content = styled(WindowContent)`
  display: flex;
  gap: 4px;
`;

const WindowsKeyImage = styled.img`
  width: 96px;
  height: 96px;
  display: block;
`;

const FormContainer = styled.form`
  padding: 8px 32px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const InputLabel = styled.label`
  width: 96px;
`;

const Input = styled(TextInput)``;

const SubmitButton = styled(Button)`
  width: 100px;
`;
