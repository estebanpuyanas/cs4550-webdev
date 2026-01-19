import Link from "next/link";
export default function KambazNavigation() {
  return (
        <h1>THIS SHOULD ONLY BE IN A1 Branch</h1>
    <div id="wd-kambaz-navigation">
      <ul id="navbar">
        <li>
          <a
            href="https://www.northeastern.edu/"
            id="wd-neu-link"
            target="_blank"
          >
            Northeastern
          </a>
        </li>
        <br />

        <Link href="/account" id="wd-account-link">
          <li>Account</li>
        </Link>
        <br />

        <Link href="/dashboard" id="wd-dashboard-link">
          <li>Dashboard</li>
        </Link>
        <br />

        <Link href="/dashboard" id="wd-course-link">
          <li>Courses</li>
        </Link>
        <br />

        <Link href="/calendar" id="wd-calendar-link">
          <li>Calendar</li>
        </Link>
        <br />

        <Link href="/inbox" id="wd-inbox-link">
          <li>Inbox</li>
        </Link>
        <br />

        <Link href="/labs" id="wd-labs-link">
          <li>Labs</li>
        </Link>
        <br />
      </ul>
    </div>
  );
}
