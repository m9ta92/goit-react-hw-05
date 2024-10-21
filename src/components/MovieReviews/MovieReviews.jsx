import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const MovieReviews = () => {
  const [options] = useState({
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNTI0NTRmNGZmZjk0ZTVjOTE4NjhhNDZjOGQxMDQ1NyIsIm5iZiI6MTcyOTE5MjI2OC4xODczODksInN1YiI6IjY3MTE1YTA0MjlkOGE1OWUwNDVlYzk4NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.uJg6F-xqM6MpIr-XliFyApDdMMv8qzYHU51A2hdklME',
    },
  });
  const { movieId } = useParams();
  const [movieReviews, setMovieReviews] = useState(null);

  useEffect(() => {
    const fetchMovieCast = async () => {
      const { data } = await axios
        .get(
          `https://api.themoviedb.org/3/movie/${movieId}/reviews?language=en-US&page=1`,
          options
        )
        .catch(err => console.error(err));
      if (data.results) setMovieReviews(data.results);
    };

    fetchMovieCast();
  }, [movieId, options]);

  if (movieReviews)
    return (
      <>
        <ul>
          {movieReviews.map(movieReview => (
            <li key={movieReview.id}>
              <h4>{movieReview.author}</h4>
              <p>{movieReview.content}</p>
            </li>
          ))}
        </ul>
      </>
    );
};

export default MovieReviews;
