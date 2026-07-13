"use client";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

type InputPasswordProps = React.ComponentProps<"input">;

export const InputPassword = ({ className, ...props }: InputPasswordProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={cn("relative")}>
      <Input
        type={showPassword ? "text" : "password"}
        className={cn(className)}
        {...props}
      />
      <button
        type="button"
        className={cn(
          "appearance-none",
          "absolute right-3 top-1/2 -translate-y-1/2",
        )}
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? (
          <EyeOff size={18} className={cn("text-gray-500")} />
        ) : (
          <Eye size={18} className={cn("text-gray-500")} />
        )}
      </button>
    </div>
  );
};

InputPassword.displayName = "InputPassword";
