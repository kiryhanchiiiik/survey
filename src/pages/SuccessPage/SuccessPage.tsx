import css from "./SuccessPage.module.scss";

function SuccessPage() {
  return (
    <div className={css.container}>
      <h1 className={css.title}>Survey Complete!🎉🎉🎉</h1>
      <p className={css.subtitle}>Thank you! Your responses have been saved.</p>
    </div>
  );
}

export default SuccessPage;
