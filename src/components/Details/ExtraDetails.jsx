/* eslint-disable react/prop-types */
import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const API_KEY = "api_key=8c72c95a59121aae424474da628b54d2";
const BASE_URL = "https://api.themoviedb.org/3";
function ExtraDetails({ content }) {
  const { id } = useParams();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get("type");
  let directorArr;
  const [stars, setStars] = useState([]);
  const [creator, setCreator] = useState([]);

  const date = new Date(content.release_date || content.first_air_date);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`${BASE_URL}/${type}/${id}/credits?${API_KEY}`);
      const data = await res.json();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      directorArr = data.crew.filter((el) => {
        return el.known_for_department === "Directing";
      });
      if (directorArr.length > 0) {
        setCreator(directorArr[0].name);
      }
      setStars(data.cast);
    }
    fetchData();
  }, [type, id]);
  return (
    <>
      <section className="extra-details">
        <table id="detailTable">
          <tr>
            <th>Creator</th>
            <td id="creator">{creator}</td>
          </tr>
          <tr>
            <th>Stars</th>
            <td id="stars">
              {stars.slice(0, 6).map((s) => {
                return (
                  <span key={s.id} className="cast-name">
                    {s.name}
                  </span>
                );
              })}
            </td>
          </tr>

          <tr id="relContainer">
            <th>Release Date</th>
            <td id="releaseDate">{date.toDateString() || "N/A"}</td>
          </tr>

          {type === "tv" && (
            <>
              <tr>
                <th>Seasons</th>
                <td>{content.number_of_seasons}</td>
              </tr>
              <tr>
                <th>Episodes</th>
                <td>{content.number_of_episodes}</td>
              </tr>
            </>
          )}
        </table>
      </section>
    </>
  );
}

export default ExtraDetails;
