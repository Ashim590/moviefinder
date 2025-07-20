import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../components/helper/Header";
import Loader from "../components/helper/Loader";
import MovieCard from "../components/Home/MovieCard";
import Pagination from "../components/helper/Pagination";

const API_KEY = "api_key=8c72c95a59121aae424474da628b54d2";
function Section() {
  const { name } = useParams();
  const [card, setCard] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // This function updates the current page state when called
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = card.slice(indexOfFirstItem, indexOfLastItem);

  let url;
  if (name === "movie") {
    url = `https://api.themoviedb.org/3/movie/now_playing?${API_KEY}`;
  } else if (name === "tv") {
    url = `https://api.themoviedb.org/3/discover/tv?${API_KEY}`;
  } else {
    url = `https://api.themoviedb.org/3/trending/all/day?${API_KEY}`;
  }
  useEffect(() => {
    async function fetchInformation() {
      setIsLoading(true);
      const res = await fetch(url);
      const data = await res.json();
      setCard(data.results);
      setIsLoading(false);
    }
    fetchInformation();
  }, [url]);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <main>
            <section className="container results">
              {name === "movie" ? (
                <h1>Latest Movies</h1>
              ) : name === "tv" ? (
                <h1>Latest TV Shows</h1>
              ) : (
                <h1>Trending Today</h1>
              )}
              <div className="movies-container" id="searchResults">
                {currentItems.map((c) => {
                  return <MovieCard key={c.id} movie={c} from={name} />;
                })}
              </div>
              <Pagination
                itemsPerPage={itemsPerPage}
                totalItems={card.length}
                currentPage={currentPage}
                paginate={handlePageChange}
              />
            </section>
          </main>
        </>
      )}
    </>
  );
}

export default Section;
