import React, { useState } from "react";
import { Habit } from "./slices/habit-creation-slice";
import styles from "../styles/habit-display-styleSheet.module.css";

interface HabitListProps {
  habits: Habit[];
  handleCompletionCheck: (id: string) => void;
  handleEditHabit: (id: string, newHabitName: string) => void; // Add this prop
}

const HabitList: React.FC<HabitListProps> = ({
  habits,
  handleCompletionCheck,
  handleEditHabit,
}) => {
  const [editMode, setEditMode] = useState<string | null>(null); // Track which habit is being edited
  const [editedHabitName, setEditedHabitName] = useState<string>(""); // Track the edited habit name

  const handleEditClick = (habit: Habit) => {
    setEditMode(habit.id); // Enable edit mode for this habit
    setEditedHabitName(habit.habitName); // Initialize the input with the current habit name
  };

  const handleSaveClick = (id: string) => {
    handleEditHabit(id, editedHabitName); // Save the updated habit name
    setEditMode(null); // Exit edit mode
  };

  return (
    <div className={styles.habitContainer}>
      <h2>Your Habits</h2>
      <ul>
        {habits.map((habit) => (
          <li key={habit.id}>
            <input
              type="checkbox"
              id={habit.id}
              checked={habit.habitCompleted}
              onChange={() => handleCompletionCheck(habit.id)}
            />
            {editMode === habit.id ? (
              <form style={{ display: 'flex', alignItems: 'center' }}>
                <input
                  type="text"
                  value={editedHabitName}
                  onChange={(e) => setEditedHabitName(e.target.value)}
                  style={{ marginRight: '8px' }}
                />
                <button onClick={() => handleSaveClick(habit.id)}>
                  Save Habit
                </button>
              </form>
            ) : (
              <label onClick={() => handleEditClick(habit)} htmlFor={habit.id}>
                {habit.habitName}
              </label>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HabitList;
