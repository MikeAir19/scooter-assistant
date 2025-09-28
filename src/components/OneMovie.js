import { useState } from "react";
import "./OneMovie.css";

const OneMovie = ({ movieImage, movieTitle, movieTags, movieAge, movieDescription }) => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked((prev) => !prev);
  };

  return (
    <div className={`one-movie ${clicked ? "clicked" : ""}`} onClick={handleClick}>
      <img src={movieImage} alt={movieTitle} />
      <div className="movie-info">
        <h2>{movieTitle}</h2>
        <p>{movieTags}</p>
        <p>{movieAge}</p>
      </div>
      {clicked && (
        <div className="movie-description">
          <p>{movieDescription}</p>
        </div>
      )}
    </div>
  );
};

export default OneMovie;
