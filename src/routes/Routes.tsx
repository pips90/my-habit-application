import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import App from "../App";
import HabitCreation, {
  createHabit,
} from "../components/habits/habit-creation";
const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} /> {/* Home page route */}
        <Route
          path="/habit-creation"
          element={<HabitCreation createHabit={createHabit} />}
        />{" "}
        {/* Habit creation route */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
