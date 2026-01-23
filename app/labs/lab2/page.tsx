import "./index.css"
export default function Lab2() {
  return (
    <div id="wd-lab2">
      <h2>Lab 2 - Cascading Style Sheets</h2>
      <h3>Styling with the STYLE Attribute</h3>
            <div id="wd-css-id-selectors">
                <h3>ID Selectors</h3>
                <p id="wd-id-selector-1">
                    Instead of changing the look and feel of all the elements of the same name,
                    e.g., P, we can refer to a specific element by its ID.
                </p>
                <p id="wd-id-selector-2">
                    Here's another paragraph using a different ID and a different look and feel.
                </p>
            </div>
            <div id="wd-class-selectors">
                <h3>Class Selectors</h3>
                <p className="wd-class-selector">
                    Instead of using IDs to refer to elements, you can use an element's 
                    CLASS attribute.
                </p>
                <h4 className="wd-class-selector">
                    This heading has the same style as the paragraph above.
                </h4>
            </div>
    </div>
  );
}
