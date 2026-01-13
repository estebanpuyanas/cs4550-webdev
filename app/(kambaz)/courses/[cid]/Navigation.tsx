import Link from "next/link";
export default function CourseNavigation() {
  return (
    <div id="wd-courses-navigation">
      <div id="wd-course-1234-navigation-header">
        <ul>
          <Link href="/courses/1234/home" id="wd-course-home-link">
            <li>Home</li>
          </Link>
          <br />
          <Link href="/courses/1234/modules" id="wd-course-modules-link">
            <li>Modules</li>
          </Link>
          <br />
          <Link href="/courses/1234/piazza" id="wd-course-piazza-link">
            <li>Piazza</li>
          </Link>
          <br />
          <Link href="/courses/1234/zoom" id="wd-course-zoom-link">
            <li>Zoom</li>
          </Link>
          <br />
          <Link
            href="/courses/1234/assignments"
            id="wd-course-assignments-link"
          >
            <li>Assignments</li>
          </Link>
          <br />
          <Link href="/courses/1234/quizzes" id="wd-course-quizzes-link">
            <li>Quizzes</li>
          </Link>
          <br />
          <Link href="/courses/1234/grades" id="wd-course-grades-link">
            <li>Grades</li>
          </Link>
          <br />
          <Link href="/courses/1234/people/table" id="wd-course-people-link">
            <li>People</li>
          </Link>
          <br />
        </ul>
      </div>
    </div>
  );
}
