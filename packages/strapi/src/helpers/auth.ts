import axios from "axios";

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

export const AuthHelper = (apiUrl: string) => ({
  login: async (identifier: string, password: string) => {
    const url = `${apiUrl}/auth/local`;

    return await axios.post<ILoginResponse>(url, {
      identifier,
      password,
    });
  },
  me: async (token: string) => {
    return await axios.get<IUser>(`${apiUrl}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
});
