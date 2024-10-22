import { Routes, Route, NavLink } from 'react-router-dom';

import HomePage from '/src/pages/HomePage/HomePage';
import MoviesPage from '/src/pages/MoviesPage/MoviesPage';
import MovieDetailsPage from '../../pages/MovieDetailsPage/MovieDetailsPage';
import MovieCast from '../MovieCast/MovieCast';
import MovieReviews from '../MovieReviews/MovieReviews';
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage';

import clsx from 'clsx';
import css from './Navigation.module.css';

const cssClasses = ({ isActive }) => clsx(isActive && css.active) || css.item;

function Navigation() {
  return (
    <>
      <header className={css.header}>
        <nav className={css.list}>
          <NavLink className={cssClasses} to="/">
            Home
          </NavLink>
          <NavLink className={cssClasses} to="/movies">
            Movies
          </NavLink>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
          <Route path="cast" element={<MovieCast />} />
          <Route path="reviews" element={<MovieReviews />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default Navigation;
