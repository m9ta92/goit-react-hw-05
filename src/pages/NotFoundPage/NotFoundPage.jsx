import { Link } from 'react-router-dom';

import css from './NotFoundPage.module.css';

const NotFoundPage = () => {
  return (
    <div>
      <h1>Page not found...</h1>
      <Link className={css.homeBtn} to="/">
        Go to Home Page
      </Link>
    </div>
  );
};

export default NotFoundPage;
