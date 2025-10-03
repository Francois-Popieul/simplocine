import type { Movie, UpcomingMovie } from "../../types";
import { useState, useEffect } from "react";
import { Button } from "../button/Button";
import "./Banner.css";
import { Link } from "react-router";
import { useLanguageContext } from "../../LanguageContext";
import { languageData } from "../../translations";

interface BannerProps {
  array: Movie[] | UpcomingMovie[];
}

export const Banner = (props: BannerProps) => {
  const [randomMovie, setRandomMovie] = useState<Movie | UpcomingMovie>();

  const { selectedLanguage } = useLanguageContext();

  const [staticTexts, setStaticTexts] = useState(languageData.en);

  useEffect(() => {
    if (selectedLanguage && selectedLanguage.name == "fr-FR") {
      setStaticTexts(languageData.fr);
    } else if (selectedLanguage && selectedLanguage.name == "en-US") {
      setStaticTexts(languageData.en);
    }
  }, [selectedLanguage]);

  useEffect(() => {
    if (props.array.length > 0) {
      const randomIndex = Math.floor(Math.random() * props.array.length);
      setRandomMovie(props.array[randomIndex]);
    }
  }, [props.array]);

  if (!randomMovie) {
    return (
      <>
        <h2>À l'affiche</h2>
        <p>Aucun film à l’affiche</p>
      </>
    );
  }

  return (
    <>
      <h2 className="banner_title">{staticTexts.selection}</h2>
      <div className="banner_container">
        <div className="banner">
          <img
            className="banner_image"
            src={`https://media.themoviedb.org/t/p/w600_and_h900_bestv2${randomMovie.backdrop_path}`}
            alt={randomMovie.title}
          />
          <div className="banner_information">
            <div>
              <p className="banner_movie_title">{randomMovie.title}</p>
              <p>
                {staticTexts.releaseDate}{" "}
                {new Date(randomMovie.release_date).toLocaleDateString(
                  selectedLanguage?.name,
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }
                )}
              </p>
              <p>
                {staticTexts.note}{" "}
                {Math.floor(randomMovie.vote_average * 10) / 10}
              </p>
            </div>
            <Link key={randomMovie.id} to={`/movie/${randomMovie.id}`}>
              <Button
                name={staticTexts.details}
                variant="primary"
                width="medium"
              />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
