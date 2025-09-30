import { useState } from "react";
import type { Series } from "../../types";
import "./Carrousel.css";
import { Link } from "react-router";

interface CarrouselProps {
  title: string;
  array: Series[];
}

export const TvCarrousel = (props: CarrouselProps) => {
  const [startNumber, setStartNumber] = useState<number>(0);
  const [endNumber, setEndNumber] = useState<number>(6);

  function ScrollLeft() {
    if (startNumber > 0) {
      setStartNumber(startNumber - 1);
      setEndNumber(endNumber - 1);
    }
  }
  function ScrollRight() {
    if (endNumber < 20) {
      setStartNumber(startNumber + 1);
      setEndNumber(endNumber + 1);
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
        {props.array.slice(startNumber, endNumber).map((series) => (
          <Link key={series.id} to={`/tv/${series.id}`}>
            <div className="vignette">
              <img
                className="vignette_image"
                src={`https://media.themoviedb.org/t/p/w600_and_h900_bestv2${series.poster_path}`}
                alt={series.name}
              />
              <p className="vignette_title">{series.name}</p>
              <p className="vignette_note">{series.vote_average}</p>
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
