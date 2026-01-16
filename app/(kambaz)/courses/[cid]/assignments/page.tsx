import Link from "next/link";

export default function Assignments() {
  return (
    <div id="wd-assignments">
      <input placeholder="Search for Assignments" id="wd-search-assignment" />
      <button id="wd-add-assignment-group">+ Group</button>
      <button id="wd-add-assignment">+ Assignment</button>
      <h3 id="wd-assignments-title">
        ASSIGNMENTS 40% of Total <button>+</button>{" "}
      </h3>
      <ul id="wd-assignment-list">
        <li className="wd-assignment-list-item">
          <Link
            href="/courses/1234/assignments/123"
            className="wd-assignment-link"
          >
            A1 - ENV + HTML
          </Link>{" "}
        </li>
        Multiple Modules | <b>Not Available until</b> May 6 at 12:00 AM | <br />
        <b>Due</b> May 13 at 11:59 PM |100 pts.
        <li className="wd-assignment-list-item">
          <Link
            href="/courses/1234/assignments/456"
            className="wd-assignment-link"
          >
            A2 - CSS + BOOTSTRAP
          </Link>{" "}
        </li>
        Multiple Modules | <b>Not Available until</b> May 13 at 12:00 AM |{" "}
        <br />
        <b>Due</b> May 20 at 11:59 PM |100 pts.
        <li className="wd-assignment-list-item">
          <Link
            href="/courses/1234/assignments/789"
            className="wd-assignment-link"
          >
            A3 - JAVASCRIPT + REACT
          </Link>{" "}
        </li>
        Multiple Modules | <b>Not Available until</b> May 20 at 12:00 AM |{" "}
        <br />
        <b>Due</b> May 27 at 11:59 PM |100 pts.
      </ul>
    </div>
  );
}
