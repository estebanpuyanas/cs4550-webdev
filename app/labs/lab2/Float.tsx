import "./index.css";

/**
 *
 * TODO: Have to fix this later and make sure it renders properly as
 * shown in the 2.1.17.a exercise.
 *
 * Also need to clairfy how we make 2 `Float` files (?) to also render 2.1.17.b.
 *
 */

export default function Float() {
  return (
    <div id="wd-float-divs">
      <h2>Float</h2>
      <div>
        <img
          className="wd-float-right"
          src="https://www.staradvertiser.com/wp-content/uploads/2021/08/web1_Starship-gap2.jpg"
        />
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius hic ...
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius hic ...
        <img
          className="wd-float-left"
          src="https://www.staradvertiser.com/wp-content/uploads/2021/08/web1_Starship-gap2.jpg"
        />
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius hic ...
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius hic ...
        <img
          className="wd-float-right"
          src="https://www.staradvertiser.com/wp-content/uploads/2021/08/web1_Starship-gap2.jpg"
        />
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius hic ...
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius hic ...
        <img
          className="wd-float-left"
          src="https://www.staradvertiser.com/wp-content/uploads/2021/08/web1_Starship-gap2.jpg"
        />
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius hic ...
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius hic ...
        <div className="wd-float-done"></div>
      </div>
    </div>
  );
}
