import MovieCard from "./Home/MovieCard";

/* eslint-disable react/prop-types */
function SearchedMovie({ movieDetails, searchItem }) {
  return (
    <main>
      <section className="container results">
        <h1>
          Showing Results for
          <span id="searchVal">&quot;{searchItem}&quot;</span>
        </h1>
        <div className="movies-container" id="searchResults">
          {movieDetails.map((movie) => {
            return (
              <MovieCard key={movie.id} movie={movie} from={movie.media_type} />
            );
          })}
        </div>
      </section>
    </main>
  );
}

export default SearchedMovie;
