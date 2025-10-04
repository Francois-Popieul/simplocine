import { useState } from "react";
import type { Movie, UpcomingMovie } from "../../types";
import "./Carrousel.css";
import { Link } from "react-router";

interface CarrouselProps {
  title: string;
  array: Movie[] | UpcomingMovie[];
}

export const Carrousel = (props: CarrouselProps) => {
  const [startNumber, setStartNumber] = useState<number>(0);
  const [endNumber, setEndNumber] = useState<number>(6);

  function ScrollLeft() {
    if (startNumber > 0) {
      setStartNumber(startNumber - 1);
      setEndNumber(endNumber - 1);
    } else {
      setStartNumber(14);
      setEndNumber(20);
    }
  }
  function ScrollRight() {
    if (endNumber < 20) {
      setStartNumber(startNumber + 1);
      setEndNumber(endNumber + 1);
    } else {
      setStartNumber(0);
      setEndNumber(6);
    }
  }

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
