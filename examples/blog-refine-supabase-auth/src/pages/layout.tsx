import { type LayoutProps, useLogout } from "@refinedev/core";

import { Button } from "@/components/ui/button";

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { mutate: logout, isPending } = useLogout();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-10 border-b border-border/60 bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <div>
            <h1 className="text-sm font-semibold tracking-tight">Colors</h1>
            <p className="text-xs text-muted-foreground">
              Browse the color records fetched from Supabase.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            disabled={isPending}
            onClick={() => logout()}
          >
            Logout
          </Button>
        </div>
      </header>
      <main className="mx-auto w-full max-w-5xl px-4 py-6">{children}</main>
    </div>
  );
};
