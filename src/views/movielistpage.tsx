import { useEffect, useState } from "react";
import type { Genre, Movie } from "../types";
import { Carrousel } from "../ui/carrousel/Carrousel";
import type { Language } from "../types";
import Navbar from "../ui/navbar/navbar";

const movieListURL = "discover/movie";
const movieGenreURL = "genre/movie/list";

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
  console.log(language);

  const baseUrl = `https://api.themoviedb.org/3/${urlpart}?language=${language.name}`;
  const genderParam = `&with_genres=${genre}`;
  const url = `${baseUrl}${genderParam}`;
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`Statut de la réponse : ${response.status}`);
    }

    const data = await response.json();
    if (urlpart === "genre/movie/list") {
      return data.genres;
    }
    return data.results;
  } catch (error) {
    return [];
  }
}

export function Movielistpage() {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [movies1, setMovies1] = useState<Movie[]>([]);
  const [movies2, setMovies2] = useState<Movie[]>([]);
  const [movies3, setMovies3] = useState<Movie[]>([]);
  const [movies4, setMovies4] = useState<Movie[]>([]);
  const [movies5, setMovies5] = useState<Movie[]>([]);
  const [id1, setId1] = useState<number>();
  const [id2, setId2] = useState<number>();
  const [id3, setId3] = useState<number>();
  const [id4, setId4] = useState<number>();
  const [id5, setId5] = useState<number>();

  useEffect(() => {
    fetcher<Genre>(movieGenreURL, { name: "fr-FR" }).then(setGenres);
  }, []);

  useEffect(() => {
    if (genres.length > 0) {
      setId1(Math.floor(Math.random() * genres.length));
      setId2(Math.floor(Math.random() * genres.length));
      setId3(Math.floor(Math.random() * genres.length));
      setId4(Math.floor(Math.random() * genres.length));
      setId5(Math.floor(Math.random() * genres.length));
    }
  }, [genres]);

  useEffect(() => {
    if (
      genres.length >= 5 &&
      id1 != undefined &&
      id2 != undefined &&
      id3 != undefined &&
      id4 != undefined &&
      id5 != undefined
    ) {
      fetcher<Movie>(movieListURL, { name: "fr-FR" }, genres[id1].id).then(
        setMovies1
      );
      fetcher<Movie>(movieListURL, { name: "fr-FR" }, genres[id2].id).then(
        setMovies2
      );
      fetcher<Movie>(movieListURL, { name: "fr-FR" }, genres[id3].id).then(
        setMovies3
      );
      fetcher<Movie>(movieListURL, { name: "fr-FR" }, genres[id4].id).then(
        setMovies4
      );
      fetcher<Movie>(movieListURL, { name: "fr-FR" }, genres[id5].id).then(
        setMovies5
      );
    }
  }, [genres, id1, id2, id3, id4, id5]);
  return (
    <>
      <Navbar />
      {genres.length >= 5 &&
        id1 != undefined &&
        id2 != undefined &&
        id3 != undefined &&
        id4 != undefined &&
        id5 != undefined && (
          <div>
            <Carrousel title={genres[id1].name} array={movies1} />
            <Carrousel title={genres[id2].name} array={movies2} />
            <Carrousel title={genres[id3].name} array={movies3} />
            <Carrousel title={genres[id4].name} array={movies4} />
            <Carrousel title={genres[id5].name} array={movies5} />
          </div>
        )}
    </>
  );
}

export default Movielistpage;
