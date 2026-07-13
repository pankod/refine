export interface CredentialResponse {
  credential?: string;
  select_by?:
    | "auto"
    | "user"
    | "user_1tap"
    | "user_2tap"
    | "btn"
    | "btn_confirm"
    | "brn_add_session"
    | "btn_confirm_add_session";
  clientId?: string;
}

export interface IdConfiguration {
  client_id: string | undefined;
  auto_select?: boolean;
  callback: (handleCredentialResponse: CredentialResponse) => void;
  login_uri?: string;
  native_callback?: (...args: any[]) => void;
  cancel_on_tap_outside?: boolean;
  prompt_parent_id?: string;
  nonce?: string;
  context?: string;
  state_cookie_domain?: string;
  ux_mode?: "popup" | "redirect";
  allowed_parent_origin?: string | string[];
  intermediate_iframe_close_callback?: (...args: any[]) => void;
}

export interface GsiButtonConfiguration {
  type: "standard" | "icon";
  theme?: "outline" | "filled_blue" | "filled_black";
  size?: "large" | "medium" | "small";
  text?: "signin_with" | "signup_with" | "continue_with" | "signup_with";
  shape?: "rectangular" | "pill" | "circle" | "square";
  logo_alignment?: "left" | "center";
  width?: string;
  local?: string;
}

export interface PromptMomentNotification {
  isDisplayMoment: () => boolean;
  isDisplayed: () => boolean;
  isNotDisplayed: () => boolean;
  getNotDisplayedReason: () =>
    | "browser_not_supported"
    | "invalid_client"
    | "missing_client_id"
    | "opt_out_or_no_session"
    | "secure_http_required"
    | "suppressed_by_user"
    | "unregistered_origin"
    | "unknown_reason";
  isSkippedMoment: () => boolean;
  getSkippedReason: () =>
    | "auto_cancel"
    | "user_cancel"
    | "tap_outside"
    | "issuing_failed";
  isDismissedMoment: () => boolean;
  getDismissedReason: () =>
    | "credential_returned"
    | "cancel_called"
    | "flow_restarted";
  getMomentType: () => "display" | "skipped" | "dismissed";
}

export interface RevocationResponse {
  successful: boolean;
  error: string;
}

export interface Credential {
  id: string;
  password: string;
}

export interface Google {
  accounts: {
    id: {
      initialize: (input: IdConfiguration) => void;
      prompt: (
        momentListener?: (res: PromptMomentNotification) => void,
      ) => void;
      renderButton: (
        parent: HTMLElement,
        options: GsiButtonConfiguration,
      ) => void;
      disableAutoSelect: () => void;
      storeCredential: (credentials: Credential, callback: () => void) => void;
      cancel: () => void;
      onGoogleLibraryLoad: () => void;
      revoke: (
        hint: string,
        callback: (done: RevocationResponse) => void,
      ) => void;
    };
  };
}

declare global {
  interface Window {
    google: Google;
  }
}

export interface UserPayload {
  iss: string;
  nbf: number;
  aud: string;
  sub: string;
  email: string;
  email_verified: boolean;
  azp: string;
  name: string;
  picture: string;
  given_name: string;
  family_name: string;
  iat: number;
  exp: number;
  jti: string;
}
