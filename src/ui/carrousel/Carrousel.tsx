import type { Movie, UpcomingMovie } from "../../types";
import "./Carrousel.css";
import { Link } from "react-router";

interface CarrouselProps {
  title: string;
  array: Movie[] | UpcomingMovie[];
}

export const Carrousel = (props: CarrouselProps) => {
  return (
    <div className="carrousel_container">
      <h2 className="carrousel_title">
        <a href="">{props.title}</a>
      </h2>
      <div className="carrousel">
        {props.array.map((movie) => (
          <Link key={movie.id} to={`/movie/${movie.id}`}>
            <div className="vignette">
              <img
                className="vignette_image"
                src={`https://media.themoviedb.org/t/p/w600_and_h900_bestv2${movie.poster_path}`}
                alt={movie.title}
              />
              <p className="vignette_title">{movie.title}</p>
              <p className="vignette_note">{movie.vote_average}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
