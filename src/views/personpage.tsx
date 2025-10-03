import type { Language, Person } from "../types";
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

function Personpage() {
  const { selectedLanguage } = useLanguageContext();
  const { id } = useParams();
  const [person, setPerson] = useState<Person | null>(null);

  if (selectedLanguage) {
    useEffect(() => {
      if (id) {
        itemFetcher<Person>(`person/${id}`, selectedLanguage).then(setPerson);
      }
    }, [setPerson, selectedLanguage]);
  }

  return (
    <>
      <Navbar />
      {person && (
        <div className="person_page_container">
          <h1>{person.name}</h1>
          <p>{person.biography}</p>

          <p>{person.also_known_as}</p>
          <p>{person.gender}</p>
          <p>
            {new Date(person.birthday).toLocaleDateString(
              selectedLanguage?.name,
              {
                year: "numeric",
                month: "long",
                day: "numeric",
              }
            )}
          </p>
          {person.deathday && (
            <p>
              {new Date(person.deathday).toLocaleDateString(
                selectedLanguage?.name,
                {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }
              )}
            </p>
          )}

          <p>{person.place_of_birth}</p>
          <img
            className="vignette_image"
            src={`https://media.themoviedb.org/t/p/w600_and_h900_bestv2${person.profile_path}`}
            alt={person.name}
          />
          <p>{person.known_for_department}</p>
          <p>{person.homepage}</p>
        </div>
      )}
    </>
  );
}

export default Personpage;
