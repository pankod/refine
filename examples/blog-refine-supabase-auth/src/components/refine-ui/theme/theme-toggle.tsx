"use client";

import { useTheme } from "@/components/refine-ui/theme/theme-provider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Monitor, Moon, Sun } from "lucide-react";

type ThemeToggleProps = {
  className?: string;
};

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();

  const cycleTheme = () => {
    switch (theme) {
      case "light":
        setTheme("dark");
        break;
      case "dark":
        setTheme("system");
        break;
      case "system":
        setTheme("light");
        break;
      default:
        setTheme("light");
    }
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={cycleTheme}
      className={cn(
        "rounded-full",
        "border-sidebar-border",
        "bg-transparent",
        className,
        "h-10",
        "w-10",
      )}
    >
      <Sun
        className={cn(
          "h-[1.2rem]",
          "w-[1.2rem]",
          "rotate-0",
          "scale-100",
          "transition-all",
          "duration-200",
          {
            "-rotate-90 scale-0": theme === "dark" || theme === "system",
          },
        )}
      />
      <Moon
        className={cn(
          "absolute",
          "h-[1.2rem]",
          "w-[1.2rem]",
          "rotate-90",
          "scale-0",
          "transition-all",
          "duration-200",
          {
            "rotate-0 scale-100": theme === "dark",
            "rotate-90 scale-0": theme === "light" || theme === "system",
          },
        )}
      />
      <Monitor
        className={cn(
          "absolute",
          "h-[1.2rem]",
          "w-[1.2rem]",
          "rotate-0",
          "scale-0",
          "transition-all",
          "duration-200",
          {
            "scale-100": theme === "system",
            "scale-0": theme === "light" || theme === "dark",
          },
        )}
      />
      <span className="sr-only">Toggle theme (Light → Dark → System)</span>
    </Button>
  );
}

ThemeToggle.displayName = "ThemeToggle";
