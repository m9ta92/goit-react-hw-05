import axios from 'axios';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import toast, { Toaster } from 'react-hot-toast';

import MovieList from '../../components/MovieList/MovieList';

import css from './MoviesPage.module.css';

const MoviesPage = () => {
  const [options] = useState({
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNTI0NTRmNGZmZjk0ZTVjOTE4NjhhNDZjOGQxMDQ1NyIsIm5iZiI6MTcyOTE5MzUzMi45NTU0NzYsInN1YiI6IjY3MTE1YTA0MjlkOGE1OWUwNDVlYzk4NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Kdlbow49ibH1cGXKkloUBH6jAQ7gEpEKwfBkL_zotvg',
    },
  });
  const [searchMovies, setSearchMovies] = useState(null);
  // const [searchValue, setSearchValue] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [term, setTerm] = useState('');

  const searchValue = searchParams.get('q');

  useEffect(() => {
    if (searchValue === null) return;

    const fetchSearchMovies = async () => {
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
          position: 'top-right',
        });
        setSearchMovies(null);
      }
    };

    fetchSearchMovies();
  }, [searchValue, options]);

  const handleSubmit = event => {
    event.preventDefault();
    if (term.trim() === '') {
      toast.error('Please enter a correct value to search for 🙋', {
        position: 'top-right',
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
          autoComplete="off"
          autoFocus
          placeholder="Search movies..."
          value={term}
          onChange={event => setTerm(event.target.value)}
        />
        <Toaster position="top-right" reverseOrder={false} />
        <button className={css.searchBtn} type="submit">
          Search
        </button>
      </form>
      <MovieList movies={searchMovies} />
    </>
  );
};

export default MoviesPage;
