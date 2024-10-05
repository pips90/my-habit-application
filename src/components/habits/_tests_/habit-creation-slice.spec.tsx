import habitCreationReducer, {
  addHabit,
  completedHabit,
  Habit,
  updateHabitName,
} from "../slices/habit-creation-slice";

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

    // Mock the setItem method of localStorage
    jest.spyOn(Storage.prototype, "setItem").mockImplementation(() => {});
    // Mock the getItem method of localStorage
    jest.spyOn(Storage.prototype, "getItem").mockImplementation(() => null);
    // Mock the clear method of localStorage
    jest.spyOn(Storage.prototype, "clear").mockImplementation(() => {});
    // Clear previous calls to the mocks
    jest.clearAllMocks();
  });

  it("Should test initial state", () => {
    expect(
      habitCreationReducer(undefined, {
        type: undefined,
      })
    ).toEqual(initialEmptyState);
  });

  it("Should test if a habit is being successfully saved", () => {
    const initialState: Habit[] = [
      { id: "1", habitName: "Drink Water", habitCompleted: false,}
    ];
    const newCreatedHabit = habitCreationReducer(
      initialEmptyState,
      addHabit(initialState[0])
    );

    expect(newCreatedHabit).toHaveLength(1);
    expect(newCreatedHabit[0]).toEqual(initialState[0]);
  });

  it("Should test if habitCompleted is updated when checked or unchecked", () => {
    const initialState: Habit[] = [
      { id: "1", habitName: "Drink Water", habitCompleted: false },
      { id: "2", habitName: "Exercise", habitCompleted: false },
      { id: "3", habitName: "Eat Lunch", habitCompleted: false },
    ];

    // Action to complete the habit with id '2'
    let action = completedHabit("2");

    // Call the reducer with the initial state and action
    let updatedState = habitCreationReducer(initialState, action);

    expect(updatedState).toEqual([
      { id: "1", habitName: "Drink Water", habitCompleted: false },
      { id: "2", habitName: "Exercise", habitCompleted: true },
      { id: "3", habitName: "Eat Lunch", habitCompleted: false },
    ]);

    // Optionally, check if the localStorage has the correct value (this might require mocking localStorage)
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "habits",
      JSON.stringify(updatedState)
    );

    action = completedHabit("2");
    updatedState = habitCreationReducer(updatedState, action);

    expect(updatedState).toEqual([
      { id: "1", habitName: "Drink Water", habitCompleted: false },
      { id: "2", habitName: "Exercise", habitCompleted: false },
      { id: "3", habitName: "Eat Lunch", habitCompleted: false },
    ]);

    expect(localStorage.setItem).toHaveBeenCalledWith(
      "habits",
      JSON.stringify(updatedState)
    );
  });

  it('Should test if newly edited habit is being save to local storage', () => {
    const initialState: Habit[] = [
      { id: "1", habitName: "Drink Water", habitCompleted: false },
      { id: "2", habitName: "Exercise", habitCompleted: false },
      { id: "3", habitName: "Eat Lunch", habitCompleted: false },
    ];

     // Action to complete the habit with id '2'
     let action = updateHabitName({id: '2', habitName: 'Go on a walk'});

     // Call the reducer with the initial state and action
     let updatedState = habitCreationReducer(initialState, action);

     expect(updatedState).toEqual([
      { id: "1", habitName: "Drink Water", habitCompleted: false },
      { id: "2", habitName: "Go on a walk", habitCompleted: false },
      { id: "3", habitName: "Eat Lunch", habitCompleted: false },
    ]);

    expect(localStorage.setItem).toHaveBeenCalledWith(
      "habits",
      JSON.stringify(updatedState)
    );
  })
});
