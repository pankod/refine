import { redirect } from "next/navigation";

export default function IndexPage() {
  return redirect("/categories/1");
}
