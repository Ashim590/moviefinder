/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import MovieCard from "./MovieCard";

function MovieContainer({ movies, from }) {
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true); // Assume initially content can scroll right

  const scrollCard = (direction) => {
    let val = 850;
    if (direction === "left") {
      val = -val;
    }
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: val, behavior: "smooth" });
      setTimeout(() => updateVisibility(), 500);
    }
  };

  const updateVisibility = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth, scrollWidth } =
        scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth);
    }
  };

  useEffect(() => {
    updateVisibility();
    window.addEventListener("resize", updateVisibility);
    return () => window.removeEventListener("resize", updateVisibility);
  }, []);
  return (
    <div
      className="movies-container"
      id={
        from === "movies"
          ? "latestContainer"
          : from === "trending"
          ? "trendingContainer"
          : "latestTVContainer"
      }
      ref={scrollContainerRef}
    >
      {canScrollLeft && (
        <button
          className="btn-cont left"
          style={{ display: "block" }}
          onClick={() => scrollCard("left")}
        >
          <i className="bx bx-chevron-left"></i>
        </button>
      )}

      {movies.map((movie) => {
        return (
          <MovieCard
            movie={movie}
            key={movie.id}
            from={
              from === "movie"
                ? "movie"
                : from === "tv"
                ? "tv"
                : `${movie.media_type}`
            }
          />
        );
      })}
      {canScrollRight && (
        <button
          className="btn-cont right"
          style={{ display: "block" }}
          onClick={() => scrollCard("right")}
        >
          <i className="bx bx-chevron-right"></i>
        </button>
      )}
    </div>
  );
}

export default MovieContainer;
