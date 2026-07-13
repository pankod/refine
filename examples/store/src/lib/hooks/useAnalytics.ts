import { useEffect } from "react";
import { useRouter } from "next/router";

export const useAnalytics = (): void => {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      window.gtag("config", "G-7BSVVDBPMB", {
        page_path: url,
      });
    };
    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);
};
