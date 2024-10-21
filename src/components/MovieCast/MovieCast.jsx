import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const MovieCast = () => {
  const [options] = useState({
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNTI0NTRmNGZmZjk0ZTVjOTE4NjhhNDZjOGQxMDQ1NyIsIm5iZiI6MTcyOTE5MjI2OC4xODczODksInN1YiI6IjY3MTE1YTA0MjlkOGE1OWUwNDVlYzk4NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.uJg6F-xqM6MpIr-XliFyApDdMMv8qzYHU51A2hdklME',
    },
  });
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
  }, [movieId, options]);

  if (movieCasts)
    return (
      <>
        <ul>
          {movieCasts.map(movieCast => (
            <li key={movieCast.id}>
              <img
                src={`https://image.tmdb.org/t/p/w500/${
                  movieCast.profile_path
                }`}
                alt={movieCast.name}
              />
              <p>{movieCast.name}</p>
            </li>
          ))}
        </ul>
      </>
    );
};

export default MovieCast;
