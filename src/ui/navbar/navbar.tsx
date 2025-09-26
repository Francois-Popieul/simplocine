import { Link } from "react-router";
import "./navbar.css";
export function Navbar() {
  return (
    <>
      <div className="navbar">
        <div className="logo">
          <Link to={"/"}>
            <img src="/images/simplocine_logo.png" alt="Simplociné Logo" />
          </Link>
        </div>
        <div className="link_container">
          <Link to={"/movie-list"}>Movies</Link>
          <Link to={"/series-list"}>Series</Link>
        </div>
      </div>
    </>
  );
}

export default Navbar;
