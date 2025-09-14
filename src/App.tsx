import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import LandingPage from "./pages/LandingPage/LandingPage";
import SurveyPage from "./pages/SurveyPage/SurveyPage";
import SuccessPage from "./pages/SuccessPage/SuccessPage";
import "./App.scss";

function App() {
  return (
    <main className="container">
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/survey" element={<SurveyPage />}></Route>
        <Route path="/success" element={<SuccessPage />}></Route>
      </Routes>
      <Toaster position="top-right" reverseOrder={false} />
    </main>
  );
}

export default App;
