import css from './ErrorMessage.module.css';

const ErrorMessage = () => {
  return (
    <p className={css.error}>
      Opps not sure what happend there. Please try again later...
    </p>
  );
};

export default ErrorMessage;
