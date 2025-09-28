import OneMovie from "../components/OneMovie";
import allMovies from "../data";
import "./CursePage.css";

const CursePage = () => {
  return (
    <section className="movie-section">
      {allMovies.map((movie) => (
        <OneMovie
          key={movie.id}
          movieImage={movie.image}
          movieTitle={movie.title}
          movieTags={movie.tags}
          movieAge={movie.age}
          movieDescription={movie.description}
        />
      ))}
    </section>
  );
};

export default CursePage;
