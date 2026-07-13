import type { UploadFile } from "antd/lib/upload/interface";

export interface IUserAvatar {
  name: string;
  url: string;
  size: number;
  uid: string;
}

export interface IUserVariable {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  avatar: UploadFile[];
}

export interface IUser {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  avatar: IUserAvatar[];
}
