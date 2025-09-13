import { useNavigate } from "react-router-dom";
import css from "./LandingPage.module.scss";

function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className={css.container}>
      <h1>
        Welcome to <span>Kiryhanchik Investments!</span>
      </h1>
      <p>
        We help you find reliable investment solutions tailored to your income
        level and lifestyle.
      </p>
      <p>
        Take a short survey (3 quick questions) — it will take less than a
        minute and allow us to provide you with personalized options.
      </p>
      <button className={css.navigateBtn} onClick={() => navigate("/survey")}>
        Start Survey
      </button>
    </div>
  );
}

export default LandingPage;
