import css from "./SuccessPage.module.scss";

function SuccessPage() {
  return (
    <div className={css.container}>
      <h1 className={css.title}>Survey Complete!</h1>
      <p className={css.subtitle}>Thank you for your trust!</p>
      <p className={css.subtitle}>
        We have received your responses. A specialist from Kiryhanchik
        Investments will contact you shortly and provide investment solutions
        tailored specifically to you.
      </p>
      <img className={css.img} src="/public/img/like.png" alt="Like" />
    </div>
  );
}

export default SuccessPage;
