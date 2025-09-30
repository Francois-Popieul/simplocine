import "./homepage.css";
import { useEffect, useState } from "react";
import type {
  Genre,
  DetailedMovie,
  Person,
  Movie,
  UpcomingMovie,
} from "../types";
import { Carrousel } from "../ui/carrousel/Carrousel";
import { Banner } from "../ui/banner/Banner";
import type { Language } from "../types";
import Navbar from "../ui/navbar/navbar";

const personURL = "discover/person";
const movieListURL = "discover/movie";
const movieGenreURL = "genre/movie/list";
const trendingMovieURL = "trending/movie/day";
const topRatedMovieURL = "movie/top_rated";
const upcomingMoviesURL = "movie/upcoming";

export const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_APIKEY}`,
  },
};

async function fetcher<T>(urlpart: string, language: Language): Promise<T[]> {
  const url = `https://api.themoviedb.org/3/${urlpart}?language=${language.name}`;
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`Statut de la réponse : ${response.status}`);
    }

    const data = await response.json();

    return data.results;
  } catch (error) {
    return [];
  }
}

function Homepage() {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [persons, setPersons] = useState<Person[]>([]);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
  const [trendingMovies, setTrendingdMovies] = useState<Movie[]>([]);
  const [upcomingMovies, setUpcomingMovies] = useState<UpcomingMovie[]>([]);
  const [detailedMovie, setDetailedMovie] = useState<DetailedMovie | null>();

  useEffect(() => {
    fetcher<Movie>(topRatedMovieURL, { name: "fr-FR" }).then(setTopRatedMovies);
  }, []);

  useEffect(() => {
    fetcher<Genre>(movieGenreURL, { name: "fr-FR" }).then(setGenres);
  }, []);

  useEffect(() => {
    fetcher<Movie>(movieListURL, { name: "fr-FR" }).then(setMovies);
  }, []);

  useEffect(() => {
    fetcher<Movie>(trendingMovieURL, { name: "fr-FR" }).then(
      setTrendingdMovies
    );
  }, []);

  useEffect(() => {
    fetcher<UpcomingMovie>(upcomingMoviesURL, { name: "fr-FR" }).then(
      setUpcomingMovies
    );
  }, []);

  useEffect(() => {
    fetcher<Person>(personURL, { name: "fr-FR" }).then(setPersons);
  }, []);

  return (
    <>
      <Navbar />
      <Banner array={trendingMovies} />
      <Carrousel title="Trending Movies" array={trendingMovies} />
      <Carrousel title="Top Rated Movies" array={topRatedMovies} />
      <Carrousel title="Upcoming Movies" array={upcomingMovies} />
    </>
  );
}

export default Homepage;
