import Link from "next/link";
import { FormControl } from "react-bootstrap";
export default function Profile() {
  return (
    <div id="wd-profile-screen">
      <h3>Profile</h3>

      <FormControl id="wd-username" placeholder="username" className="mb-2" />

      <FormControl
        id="wd-password"
        placeholder="password"
        type="password"
        className="mb-2"
      />

      <FormControl
        defaultValue="Alice"
        placeholder="First Name"
        id="wd-firstname"
        className="mb-2"
      />

      <FormControl
        defaultValue="Wonderland"
        placeholder="Last Name"
        id="wd-lastname"
        className="mb-2"
      />

      <FormControl
        defaultValue="2000-01-01"
        type="date"
        id="wd-dob"
        className="mb-2"
      />

      <FormControl
        defaultValue="alice@wonderland"
        type="email"
        id="wd-email"
        className="mb-2"
      />

      <FormControl
        as="select"
        defaultValue="FACULTY"
        id="wd-role"
        className="mb-2"
      >
        <option value="USER">User</option> <option value="ADMIN">Admin</option>
        <option value="FACULTY">Faculty</option>{" "}
        <option value="STUDENT">Student</option>
      </FormControl>

      <Link
        id="wd-sign-out-btn"
        href="/account/signin"
        className="btn btn-danger w-100 mb-2"
      >
        Sign Out
      </Link>
    </div>
  );
}
