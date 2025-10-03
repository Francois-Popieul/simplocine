import { Link } from "react-router-dom";
import "./navbar.css";
import { Button } from "../button/Button";
import { useEffect, useState } from "react";
import { useLanguageContext } from "../../LanguageContext";
import { languageData } from "../../translations";

export function Navbar() {
  const { selectedLanguage, setSelectedLanguage } = useLanguageContext();

  const [staticTexts, setStaticTexts] = useState(languageData.en);

  useEffect(() => {
    if (selectedLanguage && selectedLanguage.name == "fr-FR") {
      setStaticTexts(languageData.fr);
    } else if (selectedLanguage && selectedLanguage.name == "en-US") {
      setStaticTexts(languageData.en);
    }
  }, [selectedLanguage]);

  return (
    <>
      <div className="navbar">
        <div className="link_container">
          <div className="logo">
            <Link to={"/"}>
              <img
                srcSet="/images/simplocine_basic_logo.png 720w, /images/simplocine_logo.png"
                alt="Simplociné Logo"
              />
            </Link>
          </div>
          <Link to={"/movie-list"}>{staticTexts.movies}</Link>
          <Link to={"/series-list"}>{staticTexts.series}</Link>
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
