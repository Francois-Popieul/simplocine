import { useEffect, useState } from "react";
import type { Genre, Movie } from "../types";
import { Carrousel } from "../ui/carrousel/Carrousel";
import type { Language } from "../types";
import Navbar from "../ui/navbar/navbar";

const seriesListURL = "discover/tv";
const seriesGenreURL = "genre/tv/list";

export const options = {
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
  const baseUrl = `https://api.themoviedb.org/3/${urlpart}?language=${language}`;
  const genderParam = `&with_genres=${genre}`;
  const url = `${baseUrl}${genderParam}`;
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`Statut de la réponse : ${response.status}`);
    }

    const data = await response.json();
    if (urlpart === "genre/tv/list") {
      return data.genres;
    }
    return data.results;
  } catch (error) {
    return [];
  }
}

export function Serieslistpage() {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [series1, setMovies1] = useState<Movie[]>([]);
  const [series2, setMovies2] = useState<Movie[]>([]);
  const [series3, setMovies3] = useState<Movie[]>([]);
  const [series4, setMovies4] = useState<Movie[]>([]);
  const [series5, setMovies5] = useState<Movie[]>([]);

  useEffect(() => {
    fetcher<Genre>(movieGenreURL, { name: "fr-FR" }).then(setGenres);
  }, []);

  useEffect(() => {
    if (genres.length >= 5) {
      fetcher<Movie>(movieListURL, { name: "fr-FR" }, genres[0].id).then(
        setMovies1
      );
      fetcher<Movie>(movieListURL, { name: "fr-FR" }, genres[1].id).then(
        setMovies2
      );
      fetcher<Movie>(movieListURL, { name: "fr-FR" }, genres[2].id).then(
        setMovies3
      );
      fetcher<Movie>(movieListURL, { name: "fr-FR" }, genres[3].id).then(
        setMovies4
      );
      fetcher<Movie>(movieListURL, { name: "fr-FR" }, genres[4].id).then(
        setMovies5
      );
    }
  }, [genres]);
  return (
    <>
      <Navbar />
      {genres.length >= 5 && (
        <div>
          <Carrousel title={genres[0].name} array={movies1} />
          <Carrousel title={genres[1].name} array={movies2} />
          <Carrousel title={genres[2].name} array={movies3} />
          <Carrousel title={genres[3].name} array={movies4} />
          <Carrousel title={genres[4].name} array={movies5} />
        </div>
      )}
    </>
  );
}

export default Serieslistpage;
