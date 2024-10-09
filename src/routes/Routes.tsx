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
        {/*  Homepage route (base url) (technically App.tsx which displays <HomePage /> component) */}
        <Route path="/" element={<App />} />
        {/* Habit Creation route */}
        <Route
          path="/habit-creation"
          element={<HabitCreation createHabit={createHabit} />}
        />{" "}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
