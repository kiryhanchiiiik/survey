import { useNavigate } from "react-router-dom";
import css from "./LandingPage.module.scss";

function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className={css.container}>
      <h1>
        Welcome to the <span>Survey</span>
      </h1>
      <p>Please click below to start.</p>
      <button className={css.navigateBtn} onClick={() => navigate("/survey")}>
        Start Survey
      </button>
    </div>
  );
}

export default LandingPage;
