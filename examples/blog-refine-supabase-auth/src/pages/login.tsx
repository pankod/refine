import { useLogin } from "@refinedev/core";
import { type FormEvent, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabaseClient } from "@/providers/supabase-client";

let persistedLoginError: string | null = null;
let persistedMobileNo = "";
let persistedFormState: "SEND_OTP" | "LOGIN" = "SEND_OTP";

export const LoginPage = () => {
  const mobileNoRef = useRef(persistedMobileNo);
  const otpRef = useRef("");
  const [error, setError] = useState<string | null>(() => persistedLoginError);
  const [formState, setFormState] = useState<"SEND_OTP" | "LOGIN">(
    () => persistedFormState,
  );

  const { mutate: login, isPending } = useLogin();

  const setFormError = (message: string | null) => {
    persistedLoginError = message;
    setError(message);
  };

  const setPersistedFormState = (nextState: "SEND_OTP" | "LOGIN") => {
    persistedFormState = nextState;
    setFormState(nextState);
  };

  const backToSendOtp = () => {
    otpRef.current = "";
    setFormError(null);
    setPersistedFormState("SEND_OTP");
  };

  const onLogin = () => {
    login(
      { mobileNo: mobileNoRef.current, otp: otpRef.current },
      {
        onSuccess: ({ success, error }) => {
          if (!success) {
            setFormError(error?.message ?? error?.name ?? "Login failed");
            return;
          }

          setFormError(null);
          persistedMobileNo = "";
          setPersistedFormState("SEND_OTP");
        },
        onError: (error) => setFormError(error.message),
      },
    );
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (formState === "SEND_OTP") {
      void onSendOtp();
      return;
    }

    onLogin();
  };

  const mobileFormRender = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="mobile">Enter your mobile number</Label>
        <Input
          id="mobile"
          onChange={(e) => {
            mobileNoRef.current = e.target.value;
            persistedMobileNo = e.target.value;
          }}
          name="mobile"
          type="tel"
          defaultValue={mobileNoRef.current}
          placeholder="+14155552671"
        />
      </div>
      <Button className="w-full" type="submit">
        Send OTP
      </Button>
    </div>
  );

  const otpFormRender = () => (
    <div className="space-y-4">
      <div className="rounded-md border border-border bg-muted/40 px-3 py-2 text-sm text-muted-foreground">
        Code sent to{" "}
        <span className="font-medium text-foreground">
          {mobileNoRef.current}
        </span>
      </div>
      <div className="space-y-2">
        <Label htmlFor="otp">Enter OTP</Label>
        <Input
          id="otp"
          onChange={(e) => {
            otpRef.current = e.target.value;
          }}
          name="otp"
          defaultValue={otpRef.current}
          placeholder="123456"
        />
      </div>
      <div className="flex gap-2">
        <Button className="flex-1" type="submit" disabled={isPending}>
          Login
        </Button>
        <Button
          className="flex-1"
          type="button"
          variant="outline"
          disabled={isPending}
          onClick={backToSendOtp}
        >
          Change Number
        </Button>
      </div>
    </div>
  );

  const onSendOtp = async () => {
    const mobileNo = mobileNoRef.current || "";
    if (!/^\+[1-9]{1}[0-9]{3,14}$/.test(mobileNo)) {
      setFormError("Please enter a valid mobile number");
      return;
    }

    const { error } = await supabaseClient.auth.signInWithOtp({
      phone: mobileNo,
    });

    if (error) {
      setFormError(error.message);
      return;
    }

    setFormError(null);
    setPersistedFormState("LOGIN");
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 py-10">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-zinc-100 via-background to-background dark:from-zinc-900/60 dark:via-background dark:to-background" />
      <Card className="relative z-10 w-full max-w-md border-border/70 bg-card/95 shadow-xl shadow-zinc-950/5 backdrop-blur dark:shadow-black/25">
        <CardHeader className="space-y-1">
          <CardTitle>Sign In</CardTitle>
          <CardDescription>
            {formState === "SEND_OTP"
              ? "Enter your phone number to receive a one-time password."
              : "Enter the one-time password sent to your phone."}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error ? (
            <div className="rounded-md border border-destructive/20 bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {error}
            </div>
          ) : null}
          <form className="space-y-4" onSubmit={onSubmit}>
            {formState === "SEND_OTP" && mobileFormRender()}
            {formState === "LOGIN" && otpFormRender()}
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
