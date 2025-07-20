import { useEffect, useState } from "react";
import MovieCard from "../Home/MovieCard";

/* eslint-disable react/prop-types */
const API_KEY = "api_key=8c72c95a59121aae424474da628b54d2";
function Recommendation({ type, id }) {
  const [recommendations, setRecommendations] = useState([]);
  const [exists, setExists] = useState(true);
  useEffect(() => {
    async function fetchRecommendations() {
      const response = await fetch(
        `https://api.themoviedb.org/3/${type}/${id}/recommendations?${API_KEY}`
      );
      const data = await response.json();
      if (data.results.length === 0) {
        setExists(false);
        // document.querySelector("#recommendedSection").style.display = "none";
      }
      setRecommendations(data.results);
    }
    fetchRecommendations();
  }, [id, type]);
  return (
    <>
      {exists ? (
        <section id="recommendedSection">
          <h2>Recommended</h2>
          <div className="movies-container" id="recommendations">
            <button className="btn-cont left">
              <i className="bx bx-chevron-left"></i>
            </button>
            <button className="btn-cont right">
              <i className="bx bx-chevron-right"></i>
            </button>
            {recommendations.map((movie) => {
              return <MovieCard movie={movie} key={movie.id} from={type} />;
            })}
          </div>
        </section>
      ) : null}
    </>
  );
}

export default Recommendation;
