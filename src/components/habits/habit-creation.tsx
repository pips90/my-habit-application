import { useEffect, useState } from "react";
import styles from "../styles/create-habit-styleSheet.module.css";
import { addHabit, Habit } from "./slices/habit-creation-slice";

import { RootState } from "../../Redux/store";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { useSelector } from "react-redux/es/hooks/useSelector";

// For testing
// Define the props interface
interface HabitCreationProps {
  createHabit: (habit: Habit) => void;
}

  // Simple unique ID generator
  const generateUniqueId = () => {
    return Date.now().toString() + Math.floor(Math.random() * 1000).toString();
  };

export const createHabit = (habit: Habit) => {
  console.log(habit);
};

const HabitCreation = ({ createHabit }: HabitCreationProps) => {
  const dispatch = useDispatch(); // Use Redux dispatch
    // Access the habits from Redux store
    const habits = useSelector((state: RootState) => state.habitCreation.habits);
  const [newHabit, setNewHabit] = useState<Habit>({ id: generateUniqueId(), habitName: "" });

   // useEffect to log all habits whenever they change
   useEffect(() => {
    console.log("All habits:", habits);
  }, [habits]); // Trigger useEffect whenever the habits array changes
  
  const handleHabitChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewHabit({ ...newHabit, habitName: event.target.value });
  };

  const addNewlyCreatedHabit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Generate a new unique ID each time a habit is created
    const newCreatedHabit = { ...newHabit, id: generateUniqueId() };
    dispatch(addHabit(newCreatedHabit)); // Dispatch action to Redux store
    createHabit(newCreatedHabit);
  };

  return (
    <div className={styles.container}>
      <form onSubmit={addNewlyCreatedHabit} className={styles.form}>
        <h1>Habit Creation Screen</h1>
        <input
          placeholder="Your Habit"
          onChange={handleHabitChange}
          value={newHabit.habitName}
        />
        <button type="submit">Add Habit</button>
      </form>
    </div>
  );
};

export default HabitCreation;
