// Відтворення списку фільмів
import { Link } from 'react-router-dom';
import css from './MovieList.module.css';

const MovieList = ({ movies }) => {
  if (movies) {
    return (
      <div className={css.list}>
        {movies !== null &&
          movies.map(movie => (
            <Link to={`/movies/${movie.id}`} key={movie.id}>
              - {movie.title}
            </Link>
          ))}
      </div>
    );
  }
};

export default MovieList;
