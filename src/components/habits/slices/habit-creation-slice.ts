import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Habit {
  id: string;
  habitName: string;
  habitCompleted: boolean;
}

/* This app initializes with stored habits otherwise it results as an empty array */
const storedHabits = localStorage.getItem("habits");

export const initialState: Habit[] = storedHabits
  ? JSON.parse(storedHabits)
  : [];

// Create a slice
const habitCreationSlice = createSlice({
  name: "CreateHabit", // Slice name
  initialState,
  reducers: {
    // Responsible for adding new habits to local storage using react-hook-form's setItem
    addHabit: (state, action: PayloadAction<Habit>) => {
      state.push(action.payload); // Push the new habit to the user's habits array
      localStorage.setItem("habits", JSON.stringify(state));
    },
    // Create a new reducer to fetch habits from localStorage
    setHabits: (state, action: PayloadAction<Habit[]>) => {
      return action.payload;
    },
    // Handles marking a habit complete. Important for Future work- will be using this for daily, weekly and monthly habits.
    completedHabit: (state, action: PayloadAction<string>) => {
      const habit = state.find((h) => h.id == action.payload);
      if (habit) {
        habit.habitCompleted = !habit.habitCompleted;
        localStorage.setItem("habits", JSON.stringify(state));
      }
    },
    // Handles updating a pre-existing habit by comparing id of habit selected and matching id found in habits, if Habit is truthy (not undefined or empty) it will update to the new name/value
    updateHabitName: (
      state,
      action: PayloadAction<{ id: string; habitName: string }>
    ) => {
      const habit = state.find((h) => h.id === action.payload.id);
      if (habit) {
        habit.habitName = action.payload.habitName;
        localStorage.setItem("habits", JSON.stringify(state)); // Update localStorage if needed
      }
    },
    // Handles removing selected habit by returning a new array that doesn't contain the habit passed in.
    deleteHabit: (state, action: PayloadAction<string>) => {
      const updatedState = state.filter((habit) => habit.id !== action.payload);
      localStorage.setItem("habits", JSON.stringify(updatedState)); // Update localStorage here
      return updatedState; // Return the updated state
    },
  },
});

// Export actions
export const {
  addHabit,
  setHabits,
  completedHabit,
  updateHabitName,
  deleteHabit,
} = habitCreationSlice.actions;

// Export reducer
export default habitCreationSlice.reducer;
