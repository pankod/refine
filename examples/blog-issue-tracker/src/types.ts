import type { Dayjs } from "dayjs";

export interface IAuthUser {
  id: string;
  email: string;
}

export interface ILabel {
  id: number;
  title: string;
  color: string;
}

export interface IPriority {
  id: number;
  title: string;
}

export interface IStatus {
  id: number;
  title: string;
}

export interface ITask {
  id: number;
  title: string;
  description: string;
  start_time: string;
  end_time: string;
  label_id: number;
  priority_id: number;
  status_id: number;
  user_id: string;
}

export interface ITaskFilterVariables {
  title?: string;
  label_id?: number;
  priority_id?: number;
  user_id?: string;
  status_id?: number;
  start_time?: [Dayjs, Dayjs];
  end_time?: [Dayjs, Dayjs];
}
