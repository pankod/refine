"use client";

import * as React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingOverlayProps extends React.HTMLAttributes<HTMLDivElement> {
  loading?: boolean;
  children: React.ReactNode;
}

export const LoadingOverlay = React.forwardRef<
  HTMLDivElement,
  LoadingOverlayProps
>(({ className, loading = false, children, ...props }, ref) => {
  if (!loading) return children;

  return (
    <div className="relative" ref={ref} {...props}>
      {children}
      <div
        className={cn(
          "absolute inset-0 z-50 flex items-center justify-center",
          "bg-background/60",
          className,
        )}
      >
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    </div>
  );
});

LoadingOverlay.displayName = "LoadingOverlay";
