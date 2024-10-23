import { Link, useLocation } from 'react-router-dom';
import css from './MovieList.module.css';

const MovieList = ({ movies }) => {
  const location = useLocation();

  if (movies) {
    return (
      <div className={css.list}>
        {movies !== null &&
          movies.map(movie => (
            <Link
              className={css.item}
              state={{
                from: location,
              }}
              to={`/movies/${movie.id}`}
              key={movie.id}
            >
              <div className={css.container}>
                {movie.backdrop_path ? (
                  <img
                    className={css.photo}
                    src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                  />
                ) : (
                  <img
                    className={css.photo}
                    src="https://t4.ftcdn.net/jpg/07/91/22/59/240_F_791225927_caRPPH99D6D1iFonkCRmCGzkJPf36QDw.jpg"
                  />
                )}
                <p className={css.title}>{movie.title}</p>
              </div>
            </Link>
          ))}
      </div>
    );
  }
};

export default MovieList;
