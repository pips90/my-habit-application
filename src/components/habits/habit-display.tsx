import React, { useState } from "react";
import {
  completedHabit,
  deleteHabit,
  Habit,
  updateHabitName,
} from "./slices/habit-creation-slice";
import styles from "../styles/habit-display-styleSheet.module.css";
import { useAppDispatch } from "../../Redux/hooks";

interface HabitListProps {
  habits: Habit[];
}

const HabitList: React.FC<HabitListProps> = ({ habits }) => {
  const [editMode, setEditMode] = useState<string | null>(null); // Track which habit is being edited
  const [editedHabitName, setEditedHabitName] = useState<string>(""); // Track the edited habit name
  const dispatch = useAppDispatch(); // Use Redux dispatch

  const handleEditClick = (habit: Habit) => {
    setEditMode(habit.id); // Enable edit mode for this habit
    setEditedHabitName(habit.habitName); // Initialize the input with the current habit name
  };

  const handleDeleteClick = (id: string) => {
    dispatch(deleteHabit(id));
  };

  const handleSaveClick = (id: string) => {
    dispatch(updateHabitName({ id, habitName: editedHabitName }));
    setEditMode(null); // Exit edit mode
  };

  const handleCompletionCheck = (id: string) => {
    dispatch(completedHabit(id));
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
              <form style={{ display: "flex", alignItems: "center" }}>
                <input
                  type="text"
                  value={editedHabitName}
                  onChange={(e) => setEditedHabitName(e.target.value)}
                  style={{ marginRight: "8px" }}
                />
                <button onClick={() => handleSaveClick(habit.id)} style={{ marginRight: "8px", background: 'blue' }}>
                  Save Habit
                </button>
                <button onClick={() => handleDeleteClick(habit.id)} style={{background: 'red'}}>
                  Delete Habit
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
