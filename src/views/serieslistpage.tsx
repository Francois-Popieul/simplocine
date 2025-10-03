import { useEffect, useState } from "react";
import type { Genre, Series } from "../types";
import { TvCarrousel } from "../ui/carrousel/TvCarrousel";
import type { Language } from "../types";
import Navbar from "../ui/navbar/navbar";
import { useLanguageContext } from "../LanguageContext";

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
  const baseUrl = `https://api.themoviedb.org/3/${urlpart}?language=${language.name}`;
  const genreParam = `&with_genres=${genre}`;
  const url = `${baseUrl}${genreParam}`;
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
  const { selectedLanguage } = useLanguageContext();
  const [genres, setGenres] = useState<Genre[]>([]);
  const [series1, setSeries1] = useState<Series[]>([]);
  const [series2, setSeries2] = useState<Series[]>([]);
  const [series3, setSeries3] = useState<Series[]>([]);
  const [series4, setSeries4] = useState<Series[]>([]);
  const [series5, setSeries5] = useState<Series[]>([]);
  const [id1, setId1] = useState<number>();
  const [id2, setId2] = useState<number>();
  const [id3, setId3] = useState<number>();
  const [id4, setId4] = useState<number>();
  const [id5, setId5] = useState<number>();

  if (selectedLanguage) {
    useEffect(() => {
      fetcher<Genre>(seriesGenreURL, selectedLanguage).then(setGenres);
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
      selectedLanguage &&
      genres.length >= 5 &&
      id1 != undefined &&
      id2 != undefined &&
      id3 != undefined &&
      id4 != undefined &&
      id5 != undefined
    ) {
      fetcher<Series>(seriesListURL, selectedLanguage, genres[id1].id).then(
        setSeries1
      );
      fetcher<Series>(seriesListURL, selectedLanguage, genres[id2].id).then(
        setSeries2
      );
      fetcher<Series>(seriesListURL, selectedLanguage, genres[id3].id).then(
        setSeries3
      );
      fetcher<Series>(seriesListURL, selectedLanguage, genres[id4].id).then(
        setSeries4
      );
      fetcher<Series>(seriesListURL, selectedLanguage, genres[id5].id).then(
        setSeries5
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
            <TvCarrousel title={genres[id1].name} array={series1} />
            <TvCarrousel title={genres[id2].name} array={series2} />
            <TvCarrousel title={genres[id3].name} array={series3} />
            <TvCarrousel title={genres[id4].name} array={series4} />
            <TvCarrousel title={genres[id5].name} array={series5} />
          </div>
        )}
    </>
  );
}

export default Serieslistpage;
