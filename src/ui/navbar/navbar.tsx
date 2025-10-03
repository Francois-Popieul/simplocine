import { Link } from "react-router-dom";
import "./navbar.css";
import { Button } from "../button/Button";
import { useEffect } from "react";
import { useLanguageContext } from "../../LanguageContext";

export function Navbar() {
  const { selectedLanguage, setSelectedLanguage } = useLanguageContext();

  useEffect(() => {
    console.log(selectedLanguage);
    // window.location.reload();
  }, [selectedLanguage]);

  return (
    <>
      <div className="navbar">
        <div className="link_container">
          <div className="logo">
            <Link to={"/"}>
              <img src="/images/simplocine_logo.png" alt="Simplociné Logo" />
            </Link>
          </div>
          <Link to={"/movie-list"}>Movies</Link>
          <Link to={"/series-list"}>Series</Link>
        </div>
        <div className="language_container">
          <Button
            name="EN"
            variant="primary"
            width="very_small"
            onClick={() => setSelectedLanguage({ name: "en-US" })}
          />
          <Button
            name="FR"
            variant="primary"
            width="very_small"
            onClick={() => setSelectedLanguage({ name: "fr-FR" })}
          />
        </div>
      </div>
    </>
  );
}

export default Navbar;
