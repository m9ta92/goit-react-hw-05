import css from './LoadMoreBtn.module.css';

const LoadMoreBtn = ({ totalPage, loadNextPage }) => {
  if (totalPage === 0) {
    return null;
  }

  return (
    <button className={css.loadMoreBtn} onClick={loadNextPage} type="button">
      Load more
    </button>
  );
};

export default LoadMoreBtn;
