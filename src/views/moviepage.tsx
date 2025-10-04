import type {
  Language,
  DetailedMovie,
  MovieCredits,
  Movie,
  Collection,
} from "../types";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "../ui/button/Button";
import "./moviepage.css";
import Navbar from "../ui/navbar/navbar";
import { useLanguageContext } from "../LanguageContext";
import { PersonVignette } from "../ui/personVignette/personVignette";
import { languageData } from "../translations";
import { Carrousel } from "../ui/carrousel/Carrousel";

const collectionURL = "collection";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_APIKEY}`,
  },
};

async function fetcher<T>(
  urlpart: string,
  language: Language,
  genre?: number
): Promise<T[]> {
  console.log(language);

  const url = `https://api.themoviedb.org/3/${urlpart}?language=${language.name}`;

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`Statut de la réponse : ${response.status}`);
    }

    const data = await response.json();
    console.log(data.parts);
    return data.parts;
  } catch (error) {
    return [];
  }
}

async function itemFetcher<T>(
  urlpart: string,
  language: Language
): Promise<T | null> {
  const url = `https://api.themoviedb.org/3/${urlpart}?language=${language.name}`;
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`Statut de la réponse : ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    return null;
  }
}

function Moviepage() {
  const { selectedLanguage } = useLanguageContext();
  const { id } = useParams();
  const [detailedMovie, setDetailedMovie] = useState<DetailedMovie | null>(
    null
  );
  const [detailedMovieCredits, setDetailedMovieCredits] =
    useState<MovieCredits | null>(null);

  const [collectionMovies, setCollectionMovies] = useState<Movie[] | null>(
    null
  );

  const [staticTexts, setStaticTexts] = useState(languageData.en);

  useEffect(() => {
    if (selectedLanguage && selectedLanguage.name == "fr-FR") {
      setStaticTexts(languageData.fr);
    } else if (selectedLanguage && selectedLanguage.name == "en-US") {
      setStaticTexts(languageData.en);
    }
  }, [selectedLanguage]);

  if (selectedLanguage) {
    useEffect(() => {
      if (id) {
        itemFetcher<DetailedMovie>(`movie/${id}`, selectedLanguage).then(
          setDetailedMovie
        );
        itemFetcher<MovieCredits>(`movie/${id}/credits`, selectedLanguage).then(
          setDetailedMovieCredits
        );
      }
    }, [setDetailedMovie, selectedLanguage, collectionMovies]);
  }

  useEffect(() => {
    if (detailedMovie?.belongs_to_collection?.id && selectedLanguage) {
      fetcher<Movie>(
        `${collectionURL}/${detailedMovie.belongs_to_collection.id}`,
        selectedLanguage
      ).then(setCollectionMovies);
    }
  }, [detailedMovie, selectedLanguage]);

  return (
    <>
      <Navbar />
      {detailedMovie && (
        <div className="movie_page_global_container">
          <div className="movie_page_container">
            <div className="movie_page_left_column">
              <img
                className="movie_page_image"
                src={`https://media.themoviedb.org/t/p/w600_and_h900_bestv2${detailedMovie.poster_path}`}
                alt={detailedMovie.title}
              />
            </div>
            <div className="movie_page_right_column">
              <h1 className="movie_page_title">{detailedMovie.title}</h1>
              <p className="movie_page_length">
                {staticTexts.length} {detailedMovie.runtime} minutes
              </p>
              <div className="movie_page_genre_container">
                {detailedMovie.genres.map((genre) => (
                  <Button name={genre.name} variant="primary" width="small" />
                ))}
              </div>
              <p className="movie_page_summary">{detailedMovie.overview}</p>
            </div>
          </div>
          {detailedMovieCredits && detailedMovieCredits.cast.length > 0 && (
            <>
              <p className="casting_title">{staticTexts.mainCast}</p>
              <div className="casting_container">
                {detailedMovieCredits?.cast.slice(0, 10).map((actor) => (
                  <PersonVignette
                    actorName={actor.name}
                    actorId={actor.id}
                    actorCharacter={actor.character}
                    actorProfilePath={actor.profile_path}
                  />
                ))}
              </div>
              {collectionMovies && (
                <div>
                  <Carrousel
                    title={staticTexts.sameCollection}
                    array={collectionMovies}
                  />
                </div>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
}

export default Moviepage;
