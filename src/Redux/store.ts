import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import habitCreationReducer from "../components/habits/slices/habit-creation-slice";

export const store = configureStore({
  reducer: {
    habitCreation: habitCreationReducer,
  },
});

// // Subscribe to store changes to persist Redux state to localStorage
// store.subscribe(() => {
//   const state = store.getState().habitCreation.habits;
//   localStorage.setItem('habits', JSON.stringify(state));
// });

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
