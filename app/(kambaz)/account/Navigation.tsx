"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AccountNavigation() {
  const pathname = usePathname();

  const linkClass = (href: string) =>
    `text-danger text-decoration-none mb-2 ps-2 ${
      pathname.endsWith(href) ? "border-start border-3 border-dark" : ""
    }`;

  return (
    <div id="wd-account-navigation" className="d-flex flex-column">
      <Link href="signin" className={linkClass("/signin")}>
        Signin
      </Link>
      <Link href="signup" className={linkClass("/signup")}>
        Signup
      </Link>
      <Link href="profile" className={linkClass("/profile")}>
        Profile
      </Link>
    </div>
  );
}
