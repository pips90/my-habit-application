import React from "react";
import { Link } from "react-router-dom";

const HomePage: React.FC = () => {
  return (
    <div>
      <h2>Welcome to the Habit Tracker</h2>
      <Link to="/habit-creation">Go to Your Habits</Link>
    </div>
  );
};

export default HomePage;
