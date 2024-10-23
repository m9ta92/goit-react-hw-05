import axios from 'axios';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { options } from '../../utils/options';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage.jsx';
import MovieList from '../../components/MovieList/MovieList';
import css from './MoviesPage.module.css';

const MoviesPage = () => {
  const [searchMovies, setSearchMovies] = useState(null);
  // const [searchValue, setSearchValue] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [term, setTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchValue = searchParams.get('q');

  useEffect(() => {
    if (searchValue === null) return;

    const fetchSearchMovies = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios
          .get(
            `https://api.themoviedb.org/3/search/movie?query=${searchValue}&include_adult=false&language=en-US&page=1`,
            options
          )
          .catch(err => console.error(err));
        if (data.total_results) {
          setSearchMovies(data.results);
        } else {
          toast.error('Opps, any movie for your question 🙋 ', {
            position: 'top-center',
          });
          setSearchMovies(null);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSearchMovies();
  }, [searchValue]);

  const handleSubmit = event => {
    event.preventDefault();
    if (term.trim() === '') {
      toast.error('Please enter a correct value to search for 🙋', {
        position: 'top-center',
      });
      setTerm('');
      return;
    } else {
      // setSearchValue(term.trim());
      setSearchParams({ q: term.trim() });
      setTerm('');
    }
  };

  return (
    <>
      <form className={css.form} onSubmit={handleSubmit}>
        <input
          className={css.searchInput}
          type="text"
          name="name"
          placeholder="Search movies..."
          value={term}
          onChange={event => setTerm(event.target.value)}
        />
        <Toaster position="top-right" reverseOrder={false} />
        <button className={css.searchBtn} type="submit">
          Search
        </button>
      </form>
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      <MovieList movies={searchMovies} />
    </>
  );
};

export default MoviesPage;
