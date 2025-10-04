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
import { useLanguageContext } from "../LanguageContext";
import { languageData } from "../translations";

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
  const { selectedLanguage } = useLanguageContext();
  const [genres, setGenres] = useState<Genre[]>([]);
  const [persons, setPersons] = useState<Person[]>([]);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
  const [trendingMovies, setTrendingdMovies] = useState<Movie[]>([]);
  const [upcomingMovies, setUpcomingMovies] = useState<UpcomingMovie[]>([]);
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
      fetcher<Movie>(topRatedMovieURL, selectedLanguage).then(
        setTopRatedMovies
      );
    }, [selectedLanguage]);

    useEffect(() => {
      fetcher<Genre>(movieGenreURL, selectedLanguage).then(setGenres);
    }, [selectedLanguage]);

    useEffect(() => {
      fetcher<Movie>(movieListURL, selectedLanguage).then(setMovies);
    }, [selectedLanguage]);

    useEffect(() => {
      fetcher<Movie>(trendingMovieURL, { name: selectedLanguage.name }).then(
        setTrendingdMovies
      );
    }, [selectedLanguage]);

    useEffect(() => {
      fetcher<UpcomingMovie>(upcomingMoviesURL, selectedLanguage).then(
        setUpcomingMovies
      );
    }, [selectedLanguage]);

    useEffect(() => {
      fetcher<Person>(personURL, selectedLanguage).then(setPersons);
    }, [selectedLanguage]);
  }

  return (
    <>
      <Navbar />
      <Banner array={trendingMovies} />
      <Carrousel
        title={staticTexts.trending}
        array={trendingMovies}
        arrayLength={trendingMovies.length}
      />
      <Carrousel
        title={staticTexts.top}
        array={topRatedMovies}
        arrayLength={topRatedMovies.length}
      />
      <Carrousel
        title={staticTexts.upcoming}
        array={upcomingMovies}
        arrayLength={upcomingMovies.length}
      />
    </>
  );
}

export default Homepage;
