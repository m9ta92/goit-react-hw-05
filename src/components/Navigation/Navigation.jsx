import { Routes, Route, NavLink } from 'react-router-dom';
import HomePage from '/src/pages/HomePage/HomePage';
import MoviesPage from '/src/pages/MoviesPage/MoviesPage';

import css from './Navigation.module.css';
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
      </Routes>
    </div>
  );
}

export default Navigation;
