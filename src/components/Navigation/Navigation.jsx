import { NavLink } from 'react-router-dom';
import css from './Navigation.module.css';
import clsx from 'clsx';

const cssClasses = ({ isActive }) => clsx(isActive && css.active) || css.item;

function Navigation() {
  return (
    <>
      <header className={css.header}>
        <h2 className={css.name}>
          🎞️ <span className={css.name_title}>Movies store</span>
        </h2>
        <nav className={css.list}>
          <NavLink className={cssClasses} to="/">
            Home
          </NavLink>
          <NavLink className={cssClasses} to="/movies">
            Movies
          </NavLink>
        </nav>
      </header>
    </>
  );
}

export default Navigation;
