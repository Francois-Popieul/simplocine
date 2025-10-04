import { useState } from "react";
import type { Movie, UpcomingMovie } from "../../types";
import "./Carrousel.css";
import { Link } from "react-router";

interface CarrouselProps {
  title: string;
  array: Movie[] | UpcomingMovie[];
}

const VISIBLE_COUNT = 6;

export const Carrousel = ({ title, array }: CarrouselProps) => {
  const [startIndex, setStartIndex] = useState(0);

  const maxStartIndex = Math.max(array.length - VISIBLE_COUNT, 0);

  function scrollLeft() {
    setStartIndex((prev) => (prev > 0 ? prev - 1 : maxStartIndex));
  }

  function scrollRight() {
    setStartIndex((prev) => (prev < maxStartIndex ? prev + 1 : 0));
  }

  const visibleItems = array.slice(startIndex, startIndex + VISIBLE_COUNT);


  return (
    <div className="carrousel_container">
      <h2 className="carrousel_title">
        <a href="">{props.title}</a>
      </h2>
      <div className="carrousel">
        <button className="left_scroll_button" onClick={ScrollLeft}>
          &#60;
        </button>
        {props.array.slice(startNumber, endNumber).map((movie) => (
          <Link key={movie.id} to={`/movie/${movie.id}`}>
            <div className="vignette">
              <img
                className="vignette_image"
                src={`https://media.themoviedb.org/t/p/w600_and_h900_bestv2${movie.poster_path}`}
                alt={movie.title}
              />
              <p className="vignette_title">{movie.title}</p>
              <p className="vignette_note">
                {Math.floor(movie.vote_average * 10) / 10}
              </p>
            </div>
          </Link>
        ))}
        <button className="right_scroll_button" onClick={ScrollRight}>
          &#62;
        </button>
      </div>
    </div>
  );
};
