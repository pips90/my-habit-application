import { useState } from "react";
import { Habit } from "./slices/habit-creation-slice";

// For testing
// Define the props interface
interface HabitCreationProps {
  createHabit: (habit: Habit) => void;
}

export const createHabit = (habit: Habit) => {
  console.log(habit);
};

const HabitCreation = ({ createHabit }: HabitCreationProps) => {
  const [newHabit, setNewHabit] = useState<Habit>({ id: "1", habitName: "" });

  const handleHabitChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewHabit({ ...newHabit, habitName: event.target.value });
  };

  const addNewlyCreatedHabit = () => {
    createHabit(newHabit);
  };

  return (
    <div>
      <h1>Habit Creation Screen</h1>
      <input
        placeholder="Your Habit"
        onChange={handleHabitChange}
        value={newHabit.habitName}
      />
      <button onClick={addNewlyCreatedHabit}>Add Habit</button>
    </div>
  );
};

export default HabitCreation;
