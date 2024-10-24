import css from './ErrorMessage.module.css';

const ErrorMessage = () => {
  return (
    <p className={css.error}>
      Oops, not sure what happened there. Please try again later...
    </p>
  );
};

export default ErrorMessage;
