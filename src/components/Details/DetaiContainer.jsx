import { useState } from "react";
import ExtraDetails from "./ExtraDetails";
import Genre from "./Genre";

/* eslint-disable react/prop-types */
function DetaiContainer({ content, type }) {
  let vote;
  if (content.vote_average) {
    vote = content.vote_average.toFixed(1);
  }
  const [isOpen, setIsOpen] = useState(false);
  const readMoreClicked = () => {
    setIsOpen((s) => !s);
  };
  return (
    <>
      <div className="background-img">
        <img
          src={`https://image.tmdb.org/t/p/original/${content.backdrop_path}`}
          alt=""
          id="background"
        />
      </div>
      <div className="detail-container">
        <figure>
          <img
            src={`https://image.tmdb.org/t/p/original/${content.poster_path}`}
            alt=""
            id="poster"
          />
        </figure>
        <div className="info">
          <h1 id="title">
            {content.name || content.title || content.original_name}
          </h1>
          <p id="rating">
            ⭐<span id="ratingVal">{vote || "N/A"}</span>
            <span id="ratingQty">({content.vote_count})</span>
          </p>
          <section className="type-genre">
            <div id="type" className="type">
              {type === "tv" ? "TV Series" : "Movie"}
            </div>
            <Genre genres={content.genres} />
          </section>
          <div className="overview-container">
            <h2>Overview</h2>
            <p id="overview" className={isOpen ? null : "active"}>
              {content.overview}
            </p>
            <button id="readMore" onClick={readMoreClicked}>
              {isOpen ? "Read Less" : "Read More"}
            </button>
          </div>
          <ExtraDetails content={content} />
        </div>
      </div>
    </>
  );
}

export default DetaiContainer;
