import { useEffect, useState } from "react";
import styles from "../styles/create-habit-styleSheet.module.css";
import {
  addHabit,
  Habit,
} from "./slices/habit-creation-slice";
import { Link } from "react-router-dom";

import { RootState } from "../../Redux/store";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { SubmitHandler, useForm } from "react-hook-form";
import HabitDisplay from "./habit-display";

// For testing
// Define the props interface
interface HabitCreationProps {
  createHabit: (habit: Habit) => void;
}

// Simple unique ID generator- probably could have used uuidv4() instead
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

  const onSubmit: SubmitHandler<Habit> = (newHabit) => {
    // Generate a new unique ID each time a habit is created. TODO: use uuidv4 - something similar for this
    const newCreatedHabit = {
      ...newHabit,
      id: generateUniqueId(),
      completedHabit: false,
    };
    dispatch(addHabit(newCreatedHabit)); // Dispatch action to Redux store
    createHabit(newCreatedHabit);
    reset(); // Reset form after submission
  };

  return (
    <div>
       {/* Navbar quick style */}
       <div className={styles.navbar}>
        <Link to="/">
          <button type="button" className={styles.backButton}>
            Go Back to Home
          </button>
        </Link>
      </div>
      {/* Basic small container for main app */}
    <div className={styles.container}>
      {/* Form styling */}
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <h1>Habit Creation Screen</h1>
        <input
          type="text"
          placeholder="Your Habit"
          {...register("habitName", { required: true })} // Registering the input field (capturing value using react-hook-form)
        />
        <button type="submit">Add Habit</button>
        {/* Component that displays all habits from local storage */}
        <HabitDisplay habits={habits} />
      </form>
    </div>
    </div>
  );
};

export default HabitCreation;
