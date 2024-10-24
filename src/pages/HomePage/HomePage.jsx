import axios from 'axios';
import { useEffect, useState } from 'react';
import { url } from '../../utils/url';
import { options } from '../../utils/options';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage.jsx';
import MovieList from '../../components/MovieList/MovieList';
import css from './HomePage.module.css';

const HomePage = () => {
  const [trendingMovies, setTrendingMovies] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(url, options);

        if (data.results) {
          setTrendingMovies(data.results);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrendingMovies();
  }, []);

  return (
    <>
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      {error ? null : (
        <div className={css.container}>
          <h3 className={css.title}> ↓ TOP-20 for a week ↓</h3>
          <MovieList movies={trendingMovies} />
        </div>
      )}
    </>
  );
};

export default HomePage;
