import { useState } from "react";
import { useLogin } from "@refinedev/core";

import {
  Window,
  WindowHeader,
  WindowContent,
  TextInput,
  Button,
} from "react95";

interface ILoginForm {
  email: string;
  password: string;
}

export const LoginPage = () => {
  const [email, setemail] = useState("info@refine.dev");
  const [password, setPassword] = useState("refine-supabase");

  const { mutate: login } = useLogin<ILoginForm>();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        minHeight: "100vh",
        backgroundColor: "rgb(0, 128, 128)",
      }}
    >
      <Window>
        <WindowHeader>
          <span>Refine Login</span>
        </WindowHeader>
        <div style={{ marginTop: 8 }}>
          <img
            src="https://raw.githubusercontent.com/refinedev/refine/main/logo.png"
            alt="refine-logo"
            width={100}
          />
        </div>
        <WindowContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              login({ email, password });
            }}
          >
            <div style={{ width: 500 }}>
              <div style={{ display: "flex" }}>
                <TextInput
                  placeholder="User Name"
                  fullWidth
                  value={email}
                  onChange={(e) => {
                    setemail(e.target.value);
                  }}
                />
              </div>
              <br />
              <TextInput
                placeholder="Password"
                fullWidth
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <br />
              <Button type="submit" value="login">
                Sign in
              </Button>
            </div>
          </form>
        </WindowContent>
      </Window>
    </div>
  );
};
