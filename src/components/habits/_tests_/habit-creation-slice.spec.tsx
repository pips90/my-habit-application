import habitCreationReducer, { User } from "../slices/habit-creation-slice";

describe('Should run tests for "create-habit-slice" Slice', () => {
  const initialState: User = {
    id: "",
    habits: [],
  };
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
    expect(habitCreationReducer(undefined, { type: "unknown" })).toEqual({
      id: "",
      habits: [],
    });
  });
});
