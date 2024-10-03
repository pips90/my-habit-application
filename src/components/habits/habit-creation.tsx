import { useEffect, useState } from "react";
import styles from "../styles/create-habit-styleSheet.module.css";
import { addHabit, Habit } from "./slices/habit-creation-slice";

import { RootState } from "../../Redux/store";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { SubmitHandler, useForm } from "react-hook-form";


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
  const dispatch = useAppDispatch(); // Use Redux dispatch
    // Access the habits from Redux store
    const habits = useAppSelector((state: RootState) => state.habitCreation);
    const { register, handleSubmit, reset } = useForm<Habit>();

  const [newHabit, setNewHabit] = useState<Habit>({ id: generateUniqueId(), habitName: "" });

   // useEffect to log all habits whenever they change
   useEffect(() => {
    console.log("All habits:", habits);
  }, [habits]); // Trigger useEffect whenever the habits array changes

  const onSubmit: SubmitHandler<Habit> = (newHabit) => {
    // Generate a new unique ID each time a habit is created. TODO: use uuidv4 - something similar for this
    const newCreatedHabit = { ...newHabit, id: generateUniqueId() };
    dispatch(addHabit(newCreatedHabit)); // Dispatch action to Redux store
    createHabit(newCreatedHabit);
    reset(); // Reset form after submission

  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <h1>Habit Creation Screen</h1>
        <input
          placeholder="Your Habit"
          {...register("habitName", { required: true })} // Registering the input field
        />
        <button type="submit">Add Habit</button>
      </form>
    </div>
  );
};

export default HabitCreation;
