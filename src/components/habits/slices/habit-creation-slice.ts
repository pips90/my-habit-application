import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define your slice state
export interface User {
  id: string;
  habits: Habit[];
}

export interface Habit {
  id: string;
  habitName: string;
}

export const initialState: User = {
  id: "",
  habits: [],
};

// Create a slice
const habitCreationSlice = createSlice({
  name: "CreateHabit", // Slice name
  initialState,
  reducers: {
    // put your reducers here
    addHabit: (state, action: PayloadAction<Habit>) => {
      state.habits.push(action.payload); // Push the new habit to the user's habits array
      localStorage.setItem('habits', JSON.stringify(state.habits))
    },
     // Create a new reducer to fetch habits from localStorage
     setHabits: (state, action: PayloadAction<Habit[]>) => {
      state.habits = action.payload;
    }
  },
});

// TODO: Uncomment this later.
// Export actions
export const {addHabit, setHabits} = habitCreationSlice.actions;

// Export reducer
export default habitCreationSlice.reducer;
