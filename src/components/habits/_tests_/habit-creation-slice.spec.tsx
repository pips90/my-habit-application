import habitCreationReducer, { addHabit, Habit } from "../slices/habit-creation-slice";

describe('Should run tests for "create-habit-slice" Slice', () => {
  const initialEmptyState: Habit[] = []; // Empty initial state
  
  // TODO: Put this somewhere else (maybe part of a custom render since this needs before ALL tests)
  beforeAll(() => {
    jest.spyOn(console, "error").mockImplementation((message) => {
      if (message.includes("ReactDOMTestUtils.act is deprecated")) {
        return;
      }
      console.error(message);
    });
  });

  it("Should test initial state", () => {
    expect(habitCreationReducer(undefined, {
      type: undefined
    })).toEqual(initialEmptyState);
  });

  it("Should test if a habit is being successfully saved", () => {
    const newHabit: Habit = {
      id: "1", habitName: "Drink Water",
      habitCompleted: false
    }
    const newCreatedHabit = habitCreationReducer(initialEmptyState, addHabit(newHabit))

    expect(newCreatedHabit).toHaveLength(1)
    expect(newCreatedHabit[0]).toEqual(newHabit)
  })
});
