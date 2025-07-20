import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import DetaiContainer from "../components/Details/DetaiContainer";
import Recommendation from "../components/Details/Recommendation";
import Header from "../components/helper/Header";

import "./details.css";
import Loader from "../components/helper/Loader";

const API_KEY = "api_key=8c72c95a59121aae424474da628b54d2";
const BASE_URL = "https://api.themoviedb.org/3";
function Details() {
  const { id } = useParams();
  const [movieContent, setMovieContent] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get("type");

  let url;
  if (type === "movie") {
    url = `${BASE_URL}/movie/${id}?${API_KEY}`; //here we are using the api to get the data of the movie with the id given in the url
  } else if (type === "tv") {
    url = `${BASE_URL}/tv/${id}?${API_KEY}`; //here we are using the api to get the data of the tv show with the id given in the
  }
  useEffect(() => {
    async function fetchContent() {
      setIsLoading(true);
      const response = await fetch(`${url}`);
      const data = await response.json();
      setMovieContent(data);
      setIsLoading(false);
    }
    fetchContent();
  }, [url]);
  return (
    <>
      <Header />
      {isLoading ? (
        <Loader />
      ) : (
        <main>
          <DetaiContainer content={movieContent} type={type} />
          <Recommendation type={type} id={id} />
        </main>
      )}
    </>
  );
}
export default Details;
