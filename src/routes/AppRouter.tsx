import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WelcomePage from "../pages/WelcomePage/WelcomePage";
import CreateNewMatch from "../pages/CreateNewMatch/CreateNewMatch";
import SeeAllPlayers from "../pages/SeeAllPlayers/SeeAllPlayers";
import NotFound from "../pages/NotFound/NotFound";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/create-new-match" element={<CreateNewMatch />} />
        <Route path="/see-all-players" element={<SeeAllPlayers />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
