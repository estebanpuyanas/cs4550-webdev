"use client";
export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor">
      <label htmlFor="wd-name">
        <b>Assignment Name</b>
      </label>
      <br />
      <input id="wd-name" defaultValue="A1 - ENV + HTML" />
      <br />
      <br />
      <textarea id="wd-description">
        The assignment is available online. Submit a link to the landing page of
        your web application running on Vercel. The landing page should include
        the following: - Full name and section. - Links to each of the lab
        assignments. - Link to the Kambaz app. - Link to all relevant source
        code repos. - Make sure the Kambaz app includes a link to navigate back
        to the home page.
      </textarea>
      <br />
      <table>
        <tr>
          <td align="left" valign="middle">
            <label htmlFor="wd-points">Points</label>
          </td>
          <td>
            <input id="wd-points" defaultValue={100} />
          </td>
          <br />
          <br />
          <br />
        </tr>
        <label htmlFor="wd-group-selector">
          Assignment Group{" "}
          <select id="wd-group-selector">
            <option value="Assignments">ASSIGNMENTS</option>
            <option value="Quizzes">QUIZZES</option>
            <option value="Exams">EXAMS</option>
            <option value="Project">PROJECT</option>
          </select>
        </label>
        <br />
        <br />
        <label htmlFor="wd-grade-display-type">
          Display Grade As{" "}
          <select id="wd-grade-display-type">
            <option value="Assignments">Percentage</option>
            <option value="Quizzes">Points</option>
            <option value="Exams">Fraction</option>
          </select>
        </label>
        <br />
        <br />
        <label htmlFor="wd-submission-type">
          Submission Type{" "}
          <select id="wd-submission-type">
            <option value="Online">Online</option>
            <option value="Physical">Physical</option>
          </select>
        </label>
        <br />
        <br />
        Online Entry Options:
        <br />
        <input
          type="checkbox"
          name="check-online-entry"
          id="wd-chkbox-text-entry"
        />
        <label htmlFor="wd-chkbox-text-entry">Text Entry</label>
        <br />
        <input
          type="checkbox"
          name="check-online-entry"
          id="wd-chkbox-web-url"
        />
        <label htmlFor="wd-chkbox-web-url">Web URL</label>
        <br />
        <input
          type="checkbox"
          name="check-online-entry"
          id="wd-chkbox-media-recording"
        />
        <label htmlFor="wd-chkbox-media-recording">Media Recording</label>
        <br />
        <input
          type="checkbox"
          name="check-online-entry"
          id="wd-chkbox-student-annotation"
        />
        <label htmlFor="wd-chkbox-student-annotation">Student Annotation</label>
        <br />
        <input
          type="checkbox"
          name="check-online-entry"
          id="wd-chkbox-file-upload"
        />
        <label htmlFor="wd-chkbox-file-upload">File Upload</label>
        <br />
        <br />
        <label htmlFor="wd-assign-to">
          Assign to{" "}
          <select id="wd-assign-to">
            <option value="Everyone">Everyone</option>
            <option value="TAs">TAs</option>
          </select>
          <br />
          <br />
        </label>
        <label htmlFor="wd-due-date">Due</label>
        <br />
        <input type="date" id="wd-due-date" defaultValue="2024-05-13" />
        <br />
        <br />
        <table>
          <tr>
            <td>
              <label htmlFor="wd-available-from">Available From</label>
              <br />
              <input
                type="date"
                id="wd-available-from"
                defaultValue="2024-05-06"
              />
            </td>
            <td>
              <label htmlFor="wd-available-until">Until</label>
              <br />
              <input
                type="date"
                id="wd-available-until"
                defaultValue="2024-05-20"
              />
            </td>
          </tr>
        </table>
      </table>
      <hr />
      <tr>
        <td>
          <button
            type="button"
            onClick={() => alert("Assignment saved!")}
            id="wd-save-assignment"
          >
            Save
          </button>
        </td>
        <td>
          <button
            type="button"
            onClick={() => alert("Assignment cancelled.")}
            id="wd-cancel-assignment"
          >
            Cancel
          </button>
        </td>
      </tr>
    </div>
  );
}
