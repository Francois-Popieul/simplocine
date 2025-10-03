import { Link } from "react-router";
import "./personVignette.css";

interface PersonVignetteProps {
  actorId: number;
  actorName: string;
  actorCharacter: string;
  actorProfilePath: string;
}

export const PersonVignette = (props: PersonVignetteProps) => {
  return (
    <>
      <Link key={props.actorId} to={`/person/${props.actorId}`}>
        <div className="actor_container">
          <img
            className="actor_portrait"
            src={`https://media.themoviedb.org/t/p/w600_and_h900_bestv2${props.actorProfilePath}`}
            alt={`${props.actorName} portrait`}
          />
          <p className="actor_name">{props.actorName}</p>
          <p className="actor_role">({props.actorCharacter})</p>
        </div>
      </Link>
    </>
  );
};
