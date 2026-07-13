import { parseCookies, setCookie } from "nookies";
import { useEffect, useState } from "react";

const COOKIE_NAME = "accept_cookies";

interface ReturnUseAcceptCookies {
  acceptedCookies: boolean;
  onAcceptCookies: () => void;
}

export const useAcceptCookies = (): ReturnUseAcceptCookies => {
  const [acceptedCookies, setAcceptedCookies] = useState(true);

  useEffect(() => {
    const cookies = parseCookies();
    if (!Object.hasOwn(cookies, COOKIE_NAME)) {
      setAcceptedCookies(false);
    }
  }, []);

  const acceptCookies = () => {
    setAcceptedCookies(true);
    setCookie(null, COOKIE_NAME, "accepted", {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
    });
  };

  return {
    acceptedCookies,
    onAcceptCookies: acceptCookies,
  };
};
