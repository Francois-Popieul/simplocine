import type { Language, DetailedMovie } from "../types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "../ui/button/Button";
import "./moviepage.css";
import Navbar from "../ui/navbar/navbar";

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

function Moviepage() {
  const { id } = useParams();
  const [detailedMovie, setDetailedMovie] = useState<DetailedMovie | null>(
    null
  );
  useEffect(() => {
    if (id) {
      itemFetcher<DetailedMovie>(`movie/${id}`, { name: "fr-FR" }).then(
        setDetailedMovie
      );
    }
  }, [setDetailedMovie]);

  return (
    <>
      <Navbar />
      {detailedMovie && (
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
              Length: {detailedMovie.runtime} minutes
            </p>
            <div className="movie_page_genre_container">
              {detailedMovie.genres.map((genre) => (
                <Button name={genre.name} variant="primary" width="small" />
              ))}
            </div>
            <p className="movie_page_summary">{detailedMovie.overview}</p>
          </div>
        </div>
      )}
    </>
  );
}

export default Moviepage;
