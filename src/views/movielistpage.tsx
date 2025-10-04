import { useEffect, useState } from "react";
import type { Genre, Movie } from "../types";
import { Carrousel } from "../ui/carrousel/Carrousel";
import type { Language } from "../types";
import Navbar from "../ui/navbar/navbar";
import { useLanguageContext } from "../LanguageContext";

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
  const genreParam = `&with_genres=${genre}`;
  const url = `${baseUrl}${genreParam}`;
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
  const { selectedLanguage } = useLanguageContext();
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

  if (selectedLanguage) {
    useEffect(() => {
      fetcher<Genre>(movieGenreURL, selectedLanguage).then(setGenres);
    }, [selectedLanguage]);
  }

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
      if (selectedLanguage) {
        fetcher<Movie>(movieListURL, selectedLanguage, genres[id1].id).then(
          setMovies1
        );
        fetcher<Movie>(movieListURL, selectedLanguage, genres[id2].id).then(
          setMovies2
        );
        fetcher<Movie>(movieListURL, selectedLanguage, genres[id3].id).then(
          setMovies3
        );
        fetcher<Movie>(movieListURL, selectedLanguage, genres[id4].id).then(
          setMovies4
        );
        fetcher<Movie>(movieListURL, selectedLanguage, genres[id5].id).then(
          setMovies5
        );
      }
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
            <Carrousel
              title={genres[id1].name}
              array={movies1}
              arrayLength={movies1.length}
            />
            <Carrousel
              title={genres[id2].name}
              array={movies2}
              arrayLength={movies2.length}
            />
            <Carrousel
              title={genres[id3].name}
              array={movies3}
              arrayLength={movies3.length}
            />
            <Carrousel
              title={genres[id4].name}
              array={movies4}
              arrayLength={movies4.length}
            />
            <Carrousel
              title={genres[id5].name}
              array={movies5}
              arrayLength={movies5.length}
            />
          </div>
        )}
    </>
  );
}

export default Movielistpage;
