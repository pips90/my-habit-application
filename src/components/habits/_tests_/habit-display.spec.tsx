import { Provider } from "react-redux";
import { store } from "../../../Redux/store";
import HabitList from "../habit-display";
import { render, screen } from "@testing-library/react";
import {
  completedHabit,
  deleteHabit,

  Habit,

  updateHabitName,
} from "../slices/habit-creation-slice";
import userEvent from "@testing-library/user-event";
import { useAppDispatch } from "../../../Redux/hooks";

// Mock useAppDispatch (jest.fn() creates a mock func which allows control over various ways it can behave.
jest.mock("../../../Redux/hooks", () => ({
  useAppDispatch: jest.fn(),
}));

describe("Should run tests for habit-display component", () => {
  // TODO: Put this somewhere else (maybe part of a custom render since this needs before ALL tests)
  beforeAll(() => {
    jest.spyOn(console, "error").mockImplementation((message) => {
      if (message.includes("ReactDOMTestUtils.act is deprecated")) {
        return;
      }
      console.error(message);
    });
  });

  it("Should display habits upon render if any", async () => {
    const habits: Habit[] = [
      { id: "1", habitName: "Drink Water", habitCompleted: false },
      { id: "2", habitName: "Exercise", habitCompleted: false },
      { id: "3", habitName: "Eat Lunch", habitCompleted: false },
    ];
    render(
      <Provider store={store}>
        <HabitList habits={habits} />
      </Provider>
    );

    const habitOne = await screen.findByText("Drink Water");
    const habitTwo = await screen.findByText("Exercise");
    const habitThree = await screen.findByText("Eat Lunch");

    expect(habitOne && habitTwo && habitThree).toBeVisible();
  });

  it('Should handle updating habitCompleted when habit is "checked"', async () => {
    const user = userEvent.setup();
    const mockDispatch = jest.fn(); // mock dispatch function
    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch); // Mock useAppDispatch to return the mockDispatch

    const habits: Habit[] = [
      { id: "1", habitName: "Drink Water", habitCompleted: false },
      { id: "2", habitName: "Exercise", habitCompleted: false },
      { id: "3", habitName: "Eat Lunch", habitCompleted: false },
    ];
    render(
      <Provider store={store}>
        <HabitList habits={habits} />
      </Provider>
    );

    const habitOne = await screen.getByLabelText("Drink Water");
    const habitTwo = await screen.getByLabelText("Exercise");
    const habitThree = await screen.getByLabelText("Eat Lunch");

    expect(habitOne && habitTwo && habitThree).not.toBeChecked();

    await user.click(habitTwo);

    expect(mockDispatch).toBeCalledWith(completedHabit("2"));
  });

  it("Should update habitList when habit is clicked and edited", async () => {
    const user = userEvent.setup();
    const mockDispatch = jest.fn();  // mock dispatch function
    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch); // Mock useAppDispatch to return the mockDispatch

    const habits: Habit[] = [
      { id: "1", habitName: "Drink Water", habitCompleted: false },
      { id: "2", habitName: "Exercise", habitCompleted: false },
      { id: "3", habitName: "Eat Lunch", habitCompleted: false },
    ];

    render(
      <Provider store={store}>
        <HabitList habits={habits} />
      </Provider>
    );

    const habitTwo = screen.getByText("Exercise");

    await user.click(habitTwo);

    const habitToEdit = screen.getByDisplayValue("Exercise");
    const editButton = screen.getByText("Save Habit");

    await user.clear(habitToEdit);
    await user.type(habitToEdit, "Go on a walk");
    await user.click(editButton);

    expect(mockDispatch).toHaveBeenCalledWith(
      updateHabitName({ id: "2", habitName: "Go on a walk" })
    );
  });

  it('Should handle deleting a habit when habit is clicked and "Delete Habit" is clicked', async () => {
    const user = userEvent.setup();
    const mockDispatch = jest.fn(); // mock dispatch function
    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch); // Mock useAppDispatch to return the mockDispatch

    const habits: Habit[] = [
      { id: "1", habitName: "Drink Water", habitCompleted: false },
      { id: "2", habitName: "Exercise", habitCompleted: false },
      { id: "3", habitName: "Eat Lunch", habitCompleted: false },
    ];
    render(
      <Provider store={store}>
        <HabitList habits={habits} />
      </Provider>
    );

    const habitTwo = screen.getByText("Exercise");

    await user.click(habitTwo);

    const habitToEdit = screen.getByDisplayValue("Exercise");
    const deleteButton = screen.getByText("Delete Habit");

    await user.click(deleteButton);

    expect(habitToEdit).toHaveValue("Exercise");
    expect(mockDispatch).toHaveBeenCalledWith(deleteHabit("2"));
  });
});
