import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { options } from '../../utils/options';

import css from './MovieCast.module.css';

const MovieCast = () => {
  const { movieId } = useParams();
  const [movieCasts, setMovieCasts] = useState(null);

  useEffect(() => {
    const fetchMovieCast = async () => {
      const { data } = await axios
        .get(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`,
          options
        )
        .catch(err => console.error(err));
      if (data.cast) setMovieCasts(data.cast);
    };

    fetchMovieCast();
  }, [movieId]);

  if (movieCasts)
    return (
      <>
        <ul className={css.list}>
          {movieCasts.map(movieCast => (
            <li className={css.item} key={movieCast.id}>
              {movieCast.profile_path ? (
                <img
                  className={css.photo}
                  src={`https://image.tmdb.org/t/p/w500/${movieCast.profile_path}`}
                />
              ) : (
                <img
                  className={css.photo}
                  src="https://static3.bigstockphoto.com/9/1/3/large2/31903202.jpg"
                />
              )}
              <p>{movieCast.name}</p>
            </li>
          ))}
        </ul>
      </>
    );
};

export default MovieCast;
