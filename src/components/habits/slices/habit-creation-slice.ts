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
  },
});

// TODO: Uncomment this later.
// Export actions
// export const {} = habitCreationSlice.actions;

// Export reducer
export default habitCreationSlice.reducer;
