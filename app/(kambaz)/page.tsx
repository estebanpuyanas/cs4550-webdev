import { redirect } from "next/navigation";

// This should be the landing page of the application.
export default function Kambaz() {
  redirect("/account/signin");
}
