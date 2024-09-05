import habitCreationReducer, { User } from "../slices/habit-creation-slice";

describe('Should run tests for "create-habit-slice" Slice', () => {
  const initialState: User = {
    id: "",
    habits: [],
  };

  it("Should test initial state", () => {
    expect(habitCreationReducer(undefined, { type: "unknown" })).toEqual({
      id: "",
      habits: [],
    });
  });
});
