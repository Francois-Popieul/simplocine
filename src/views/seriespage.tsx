import type { Language, DetailedSeries } from "../types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "../ui/button/Button";
import "./moviepage.css";
import Navbar from "../ui/navbar/navbar";
import { useLanguageContext } from "../LanguageContext";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_APIKEY}`,
  },
};

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

function Seriespage() {
  const { selectedLanguage } = useLanguageContext();
  const { id } = useParams();
  const [detailedSeries, setDetailedSeries] = useState<DetailedSeries | null>(
    null
  );

  if (selectedLanguage) {
    useEffect(() => {
      if (id) {
        itemFetcher<DetailedSeries>(`tv/${id}`, selectedLanguage).then(
          setDetailedSeries
        );
      }
    }, [setDetailedSeries]);
  }

  return (
    <>
      <Navbar />
      {detailedSeries && (
        <div className="movie_page_container">
          <div className="movie_page_left_column">
            <img
              className="movie_page_image"
              src={`https://media.themoviedb.org/t/p/w600_and_h900_bestv2${detailedSeries.poster_path}`}
              alt={detailedSeries.name}
            />
          </div>
          <div className="movie_page_right_column">
            <h1 className="movie_page_title">{detailedSeries.name}</h1>
            <p className="movie_page_length">
              Number of seasons: {detailedSeries.number_of_seasons}
            </p>
            <p className="movie_page_length">
              Number of episodes: {detailedSeries.number_of_episodes}
            </p>
            <div className="movie_page_genre_container">
              {detailedSeries.genres.map((genre) => (
                <Button name={genre.name} variant="primary" width="small" />
              ))}
            </div>

            <p className="movie_page_summary">{detailedSeries.overview}</p>

            <div className="">
              {detailedSeries.seasons.map((season) => (
                <ul>
                  <li>{season.name}</li>
                </ul>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Seriespage;
