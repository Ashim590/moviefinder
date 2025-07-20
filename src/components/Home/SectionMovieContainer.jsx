/* eslint-disable react/prop-types */

import { useNavigate } from "react-router-dom";

import MovieContainer from "./MovieContainer";
function SectionMovieContainer({ shows, term }) {
  const navigate = useNavigate();
  function goToDifferentSection(term) {
    navigate(`/singlePage/${term}`);
  }
  return (
    <section
      className={
        term === "tv"
          ? "container tv"
          : term === "movie"
          ? "container"
          : "container trending "
      }
    >
      <h2
        style={{ cursor: "pointer" }}
        onClick={() => goToDifferentSection(term)}
      >
        {term === "movie"
          ? "Latest Movies"
          : term === "tv"
          ? "Latest TV Show"
          : "Trending Today"}
      </h2>
      <MovieContainer movies={shows} from={term} />
    </section>
  );
}

export default SectionMovieContainer;
