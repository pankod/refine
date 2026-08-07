"use client";

import { useState, useEffect } from "react";
import { useTranslate, type AutoSaveIndicatorProps } from "@refinedev/core";
import { AlertTriangle, Clock, CheckCircle2, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = AutoSaveIndicatorProps;

export function AutoSaveIndicator({
  status,
  elements: elementsFromProps,
}: Props) {
  const t = useTranslate();
  const [shouldFadeSuccess, setShouldFadeSuccess] = useState(false);

  useEffect(() => {
    if (status === "success") {
      const timer = setTimeout(() => {
        setShouldFadeSuccess(true);
      }, 1000);

      return () => {
        clearTimeout(timer);
        setShouldFadeSuccess(false);
      };
    }
    setShouldFadeSuccess(false);
  }, [status]);

  const elements = {
    pending: elementsFromProps?.loading ?? (
      <div
        className={cn(
          "flex",
          "items-center",
          "h-9",
          "text-sm",
          "text-sky-600",
          "px-3",
        )}
      >
        <Loader2 className={cn("h-4", "w-4", "mr-2", "animate-spin")} />
        <span className={cn("font-medium")}>
          {t("autoSave.loading", "Saving")}
        </span>
      </div>
    ),
    success: elementsFromProps?.success ?? (
      <div
        className={cn(
          "flex",
          "items-center",
          "h-9",
          "text-sm",
          "text-emerald-500",
          "transition-opacity",
          "duration-500",
          "px-3",
          {
            "opacity-50": shouldFadeSuccess,
          },
        )}
      >
        <CheckCircle2 className={cn("h-4", "w-4", "mr-2")} />
        <span className={cn("font-medium")}>
          {t("autoSave.success", "Saved")}
        </span>
      </div>
    ),
    error: elementsFromProps?.error ?? (
      <div
        className={cn(
          "flex",
          "items-center",
          "h-9",
          "text-sm",
          "text-rose-400",
          "px-3",
        )}
      >
        <AlertTriangle className={cn("h-4", "w-4", "mr-2")} />
        <span className={cn("font-medium")}>
          {t("autoSave.error", "Failed")}
        </span>
      </div>
    ),
    idle: elementsFromProps?.idle ?? (
      <div
        className={cn(
          "flex",
          "items-center",
          "h-9",
          "text-sm",
          "text-slate-500",
          "px-3",
        )}
      >
        <Clock className={cn("h-4", "w-4", "mr-2")} />
        <span>{t("autoSave.idle", "Idle")} </span>
      </div>
    ),
  };

  return <div className={cn("flex")}>{elements[status]}</div>;
}

AutoSaveIndicator.displayName = "AutoSaveIndicator";
