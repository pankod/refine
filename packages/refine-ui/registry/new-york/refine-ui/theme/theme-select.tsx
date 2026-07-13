"use client";

import React from "react";
import { useTheme } from "./theme-provider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/registry/new-york/ui/dropdown-menu";
import { Button } from "@/registry/new-york/ui/button";
import { Moon, Sun, Monitor, ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

type ThemeOption = {
  value: "light" | "dark" | "system";
  label: string;
  icon: React.ReactNode;
};

const themeOptions: ThemeOption[] = [
  {
    value: "light",
    label: "Light",
    icon: <Sun className="h-4 w-4" />,
  },
  {
    value: "dark",
    label: "Dark",
    icon: <Moon className="h-4 w-4" />,
  },
  {
    value: "system",
    label: "System",
    icon: <Monitor className="h-4 w-4" />,
  },
];

export function ThemeSelect() {
  const { theme, setTheme } = useTheme();

  const currentTheme = themeOptions.find((option) => option.value === theme);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="lg"
          className={cn(
            "w-full",
            "justify-between",
            "px-3",
            "text-left",
            "text-sm",
            "font-normal",
            "text-foreground",
            "hover:bg-accent",
            "hover:text-accent-foreground",
            "focus-visible:outline-none",
            "focus-visible:ring-2",
            "focus-visible:ring-ring",
          )}
        >
          <div className="flex items-center gap-2">
            {currentTheme?.icon}
            <span>{currentTheme?.label}</span>
          </div>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-40 space-y-1">
        {themeOptions.map((option) => {
          const isSelected = theme === option.value;

          return (
            <DropdownMenuItem
              key={option.value}
              onClick={() => setTheme(option.value)}
              className={cn(
                "flex items-center gap-2 cursor-pointer relative pr-8",
                {
                  "bg-accent text-accent-foreground": isSelected,
                },
              )}
            >
              {option.icon}
              <span>{option.label}</span>
              {isSelected && (
                <Check className="h-4 w-4 absolute right-2 text-primary" />
              )}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

ThemeSelect.displayName = "ThemeSelect";
