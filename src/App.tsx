import { useDispatch } from "react-redux/es/hooks/useDispatch";
import "./App.css";
import HomePage from "./components/HomePage";
import { useEffect } from "react";
import { setHabits } from "./components/habits/slices/habit-creation-slice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch habits from localStorage on app startup
    const storedHabits = localStorage.getItem('habits');
    if (storedHabits) {
      dispatch(setHabits(JSON.parse(storedHabits))); // Set habits in Redux store
    }
  }, [dispatch]);
  return (
    <div>
      <HomePage />
    </div>
  );
}

export default App;
