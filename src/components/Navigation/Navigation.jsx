import css from './Navigation.module.css';
import { Routes, Route, NavLink } from 'react-router-dom';
import HomePage from '/src/pages/HomePage/HomePage';
import MoviesPage from '/src/pages/MoviesPage/MoviesPage';
import MovieDetailsPage from '../../pages/MovieDetailsPage/MovieDetailsPage';
import MovieCast from '../MovieCast/MovieCast';
import MovieReviews from '../MovieReviews/MovieReviews';
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage';
import clsx from 'clsx';

function Navigation() {
  return (
    <div className={css.home}>
      <nav className={css.nav}>
        <NavLink
          className={({ isActive }) => clsx(isActive && css.active)}
          to="/"
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) => clsx(isActive && css.active)}
          to="/movies"
        >
          Movies
        </NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MoviesPage />} />

        <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
          <Route path="cast" element={<MovieCast />} />
          <Route path="reviews" element={<MovieReviews />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default Navigation;
