import { Routes, Route, NavLink } from 'react-router-dom';
import { lazy, Suspense } from 'react';

const HomePage = lazy(() => import('/src/pages/HomePage/HomePage'));
const MoviesPage = lazy(() => import('/src/pages/MoviesPage/MoviesPage'));
const MovieDetailsPage = lazy(
  () => import('../../pages/MovieDetailsPage/MovieDetailsPage')
);
const MovieCast = lazy(() => import('../MovieCast/MovieCast'));
const MovieReviews = lazy(() => import('../MovieReviews/MovieReviews'));
const NotFoundPage = lazy(
  () => import('../../pages/NotFoundPage/NotFoundPage')
);

import css from './Navigation.module.css';
import clsx from 'clsx';

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

      <Suspense>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default Navigation;
