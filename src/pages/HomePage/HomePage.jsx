// Fixing please !!!

import axios from 'axios';
import { useEffect, useState } from 'react';
import MovieList from '../../components/MovieList/MovieList';
import css from './HomePage.module.css';

const HomePage = () => {
  const url = 'https://api.themoviedb.org/3/trending/movie/day?language=en-US';
  const [options] = useState({
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNTI0NTRmNGZmZjk0ZTVjOTE4NjhhNDZjOGQxMDQ1NyIsIm5iZiI6MTcyOTE5MzUzMi45NTU0NzYsInN1YiI6IjY3MTE1YTA0MjlkOGE1OWUwNDVlYzk4NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Kdlbow49ibH1cGXKkloUBH6jAQ7gEpEKwfBkL_zotvg',
    },
  });
  const [trendingMovies, setTrendingMovies] = useState(null);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      const { data } = await axios
        .get(url, options)
        .catch(err => console.error(err));
      setTrendingMovies(data.results);
    };
    fetchTrendingMovies();
  }, [options]);

  return (
    <>
      <div className={css.container}>
        <h3 className={css.title}>Trending today :</h3>
        <MovieList movies={trendingMovies} />
      </div>
    </>
  );
};

export default HomePage;
