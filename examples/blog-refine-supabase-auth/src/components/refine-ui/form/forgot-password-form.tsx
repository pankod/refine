"use client";

import { ArrowLeft } from "lucide-react";
import { useState } from "react";

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
import { cn } from "@/lib/utils";
import { useForgotPassword, useLink, useRefineOptions } from "@refinedev/core";

export const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");

  const Link = useLink();

  const { title } = useRefineOptions();

  const { mutate: forgotPassword } = useForgotPassword();

  const handleForgotPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    forgotPassword({
      email,
    });
  };

  return (
    <div
      className={cn(
        "flex",
        "flex-col",
        "items-center",
        "justify-center",
        "px-6",
        "py-8",
        "min-h-svh",
      )}
    >
      <div className={cn("flex", "items-center", "justify-center", "gap-2")}>
        {title.icon && (
          <div
            className={cn("text-foreground", "[&>svg]:w-12", "[&>svg]:h-12")}
          >
            {title.icon}
          </div>
        )}
      </div>

      <Card className={cn("sm:w-[456px]", "p-12", "mt-6")}>
        <CardHeader className={cn("px-0")}>
          <CardTitle
            className={cn(
              "text-blue-600",
              "dark:text-blue-400",
              "text-3xl",
              "font-semibold",
            )}
          >
            Forgot password
          </CardTitle>
          <CardDescription
            className={cn("text-muted-foreground", "font-medium")}
          >
            Enter your email to change your password.
          </CardDescription>
        </CardHeader>

        <CardContent className={cn("px-0")}>
          <form onSubmit={handleForgotPassword}>
            <div className={cn("flex", "flex-col", "gap-2")}>
              <Label htmlFor="email">Email</Label>
              <div className={cn("flex", "gap-2")}>
                <Input
                  id="email"
                  type="email"
                  placeholder=""
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={cn("flex-1")}
                />
                <Button
                  type="submit"
                  className={cn(
                    "bg-blue-600",
                    "hover:bg-blue-700",
                    "text-white",
                    "px-6",
                  )}
                >
                  Send
                </Button>
              </div>
            </div>
          </form>

          <div className={cn("mt-8")}>
            <Link
              to="/login"
              className={cn(
                "inline-flex",
                "items-center",
                "gap-2",
                "text-sm",
                "text-muted-foreground",
                "hover:text-foreground",
                "transition-colors",
              )}
            >
              <ArrowLeft className={cn("w-4", "h-4")} />
              <span>Back</span>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

ForgotPasswordForm.displayName = "ForgotPasswordForm";
