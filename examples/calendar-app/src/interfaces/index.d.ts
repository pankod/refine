export interface IEvent {
  id: number;
  title: string;
  date: string;
  type: "warning" | "success" | "error";
}
