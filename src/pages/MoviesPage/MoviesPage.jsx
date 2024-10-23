import axios from 'axios';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { options } from '../../utils/options';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage.jsx';
import MovieList from '../../components/MovieList/MovieList';
import css from './MoviesPage.module.css';
import LoadMoreBtn from '../../components/LoadMoreBtn/LoadMoreBtn.jsx';
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop.jsx';

const MoviesPage = () => {
  const [searchMovies, setSearchMovies] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  // const [searchValue, setSearchValue] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [term, setTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchValue = searchParams.get('q');

  useEffect(() => {
    if (searchMovies === null) {
      return;
    }
    if (searchMovies.length > 20) {
      window.scrollBy({
        top: 550,
        behavior: 'smooth',
      });
    }
  }, [searchMovies]);

  useEffect(() => {
    if (searchValue === null) return;

    const fetchSearchMovies = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios
          .get(
            `https://api.themoviedb.org/3/search/movie?query=${searchValue}&include_adult=false&language=en-US&page=${page}`,
            options
          )
          .catch(err => console.error(err));

        if (data.page > 1) {
          setSearchMovies(prevImages => [...prevImages, ...data.results]);
        } else {
          setSearchMovies(data.results);
          setTotalPage(data.total_pages);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSearchMovies();
  }, [searchValue, page]);

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

  const loadNextPage = () => {
    const newPage = page + 1;
    setPage(newPage);
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
      {totalPage === page ? null : (
        <LoadMoreBtn totalPage={totalPage} loadNextPage={loadNextPage} />
      )}
      <ScrollToTop />
    </>
  );
};

export default MoviesPage;
