import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Habit {
  id: string;
  habitName: string;
  habitCompleted: boolean;
}

const storedHabits = localStorage.getItem("habits");

export const initialState: Habit[] = storedHabits
  ? JSON.parse(storedHabits)
  : [];

// Create a slice
const habitCreationSlice = createSlice({
  name: "CreateHabit", // Slice name
  initialState,
  reducers: {
    // put your reducers here
    addHabit: (state, action: PayloadAction<Habit>) => {
      state.push(action.payload); // Push the new habit to the user's habits array
      localStorage.setItem("habits", JSON.stringify(state));
    },
    // Create a new reducer to fetch habits from localStorage
    setHabits: (state, action: PayloadAction<Habit[]>) => {
      return action.payload;
    },
    completedHabit: (state, action: PayloadAction<string>) => {
      const habit = state.find((h) => h.id == action.payload);
      if (habit) {
        habit.habitCompleted = !habit.habitCompleted;
        localStorage.setItem("habits", JSON.stringify(state));
      }
    },
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
  },
});

// Export actions
export const { addHabit, setHabits, completedHabit, updateHabitName } =
  habitCreationSlice.actions;

// Export reducer
export default habitCreationSlice.reducer;
