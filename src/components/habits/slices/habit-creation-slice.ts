import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define your slice state
// export interface User {
//   id: string;
//   habits: Habit[];
// }

export interface Habit {
  id: string;
  habitName: string;
}


const storedHabits = localStorage.getItem('habits');

export const initialState: Habit[] = storedHabits ? JSON.parse(storedHabits) : [];

// Create a slice
const habitCreationSlice = createSlice({
  name: "CreateHabit", // Slice name
  initialState,
  reducers: {
    // put your reducers here
    addHabit: (state, action: PayloadAction<Habit>) => {
      state.push(action.payload); // Push the new habit to the user's habits array
      localStorage.setItem('habits', JSON.stringify(state))
    },
     // Create a new reducer to fetch habits from localStorage
     setHabits: (state, action: PayloadAction<Habit[]>) => {
      return action.payload;
    }
  },
});

// TODO: Uncomment this later.
// Export actions
export const {addHabit, setHabits} = habitCreationSlice.actions;

// Export reducer
export default habitCreationSlice.reducer;
