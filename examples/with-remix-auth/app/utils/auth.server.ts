import { Authenticator } from "remix-auth";
import { Auth0Strategy } from "remix-auth-auth0";
import { GoogleStrategy } from "remix-auth-google";
import { KeycloakStrategy } from "remix-auth-keycloak";
import { FormStrategy } from "remix-auth-form";

import { sessionStorage } from "~/services/session.server";

// Create an instance of the authenticator, pass a generic with what your
// strategies will return and will be stored in the session
export const authenticator = new Authenticator<{}>(sessionStorage);

const auth0Strategy = new Auth0Strategy(
  {
    // !!! Should be stored in .env file.
    callbackURL: "http://localhost:3000/auth/auth0/callback",
    clientID: "AcinJvjWp1Dr41gPcJeQ20r5vcsteks4",
    clientSecret:
      "y3pj2KaTiNgING-5e8_JYmX_bIQSwvkp_XgDcA75sEPSSB2zmi0n-3UoTfH0pOTP",
    domain: "dev-y38p834gjptooc4g.us.auth0.com",
  },
  async ({ accessToken, extraParams, profile, refreshToken }) => {
    const { id, displayName, photos } = profile;
    return Promise.resolve({
      id,
      name: displayName,
      avatar: photos?.[0]?.value,
    });
  },
);

const googleStrategy = new GoogleStrategy(
  {
    // !!! Should be stored in .env file.
    callbackURL: "http://localhost:3000/auth/google/callback",
    clientID:
      "1041339102270-e1fpe2b6v6u1didfndh7jkjmpcashs4f.apps.googleusercontent.com",
    clientSecret: "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",
  },
  async ({ accessToken, extraParams, profile, refreshToken, context }) => {
    const { id, displayName, photos } = profile;
    return Promise.resolve({
      id,
      name: displayName,
      avatar: photos?.[0]?.value,
    });
  },
);

const keycloakStrategy = new KeycloakStrategy(
  {
    // !!! Should be stored in .env file.
    useSSL: true,
    domain: "lemur-0.cloud-iam.com/auth",
    realm: "refine",
    clientID: "refine-demo",
    clientSecret: "refine",
    callbackURL: "http://localhost:3000/auth/keycloak/callback",
  },
  async ({ accessToken, extraParams, profile, refreshToken, context }) => {
    const { id, displayName, photos } = profile;
    return Promise.resolve({
      id,
      name: displayName,
      avatar: "https://faces-img.xcdn.link/thumb-lorem-face-6312_thumb.jpg",
    });
  },
);

const formStrategy = new FormStrategy(async ({ form }) => {
  console.log("--| FormData", form.get("email"), form.get("password"));
  // TODO: Check credentials on your api
  return Promise.resolve({
    id: 1,
    name: "John Doe",
    avatar: "https://faces-img.xcdn.link/thumb-lorem-face-6312_thumb.jpg",
  });
});

authenticator.use(auth0Strategy);
authenticator.use(googleStrategy);
authenticator.use(keycloakStrategy);
authenticator.use(formStrategy, "user-pass");
