import type { MetaQuery } from "@refinedev/core";
import axios from "axios";
import qs from "qs";

interface ILoginResponse {
  jwt: string;
  user: IUser;
}

interface IRole {
  id: number | string;
  name: string;
  description: string;
  type: string;
}

interface IUser {
  id: number | string;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  role: IRole;
  created_at: string;
  updated_at: string;
}

export type MeOptions = {
  meta?: MetaQuery;
  /**
   * @deprecated `metaData` is deprecated with refine@4, refine will pass `meta` instead, however, we still support `metaData` for backward compatibility.
   */
  metaData?: MetaQuery;
};

export const AuthHelper = (apiUrl: string) => ({
  login: async (identifier: string, password: string) => {
    const url = `${apiUrl}/auth/local`;

    return await axios.post<ILoginResponse>(url, {
      identifier,
      password,
    });
  },
  me: async (token: string, options?: MeOptions) => {
    const { meta = {} } = options ?? {};
    const locale = meta?.locale;
    const fields = meta?.fields;
    const populate = meta?.populate;

    const query = {
      locale,
      fields,
      populate,
    };

    return await axios.get<IUser>(
      `${apiUrl}/users/me?${qs.stringify(query, {
        encodeValuesOnly: true,
      })}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  },
});
