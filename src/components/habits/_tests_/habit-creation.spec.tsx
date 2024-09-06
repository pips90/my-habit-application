import { render, screen } from "@testing-library/react";

import userEvent from "@testing-library/user-event";
import HabitCreation from "../habit-creation";

describe('Should run tests for "habit-creation" component', () => {
  // TODO: Put this somewhere else (maybe part of a custom render since this needs before ALL tests)
  beforeAll(() => {
    jest.spyOn(console, "error").mockImplementation((message) => {
      if (message.includes("ReactDOMTestUtils.act is deprecated")) {
        return;
      }
      console.error(message);
    });
  });

  it('Should render "habit-creation" component', () => {
    const mockCreateHabit = jest.fn();
    render(<HabitCreation createHabit={mockCreateHabit} />);
    const habitHeading = screen.getByText("Habit Creation Screen");
    const habitInput = screen.getByPlaceholderText("Your Habit");
    const addHabitBtn = screen.getByText("Add Habit");

    expect(habitHeading && habitInput && addHabitBtn).toBeVisible();
  });

  it("Should test if user input is being properly tracked", async () => {
    const mockCreateHabit = jest.fn();

    render(<HabitCreation createHabit={mockCreateHabit} />);

    const habitInput = screen.getByPlaceholderText("Your Habit");

    await userEvent.type(habitInput, "Drink Water");

    expect(habitInput).toHaveValue("Drink Water");
  });

  it('Should test if "CreateHabit()" is being called with user input', async () => {
    // Mock the createHabit function
    const mockCreateHabit = jest.fn();

    render(<HabitCreation createHabit={mockCreateHabit} />);
    const habitInput = screen.getByPlaceholderText("Your Habit");
    const addHabitBtn = screen.getByText("Add Habit");

    await userEvent.type(habitInput, "Drink Water");
    await userEvent.click(addHabitBtn);

    expect(mockCreateHabit).toHaveBeenCalledWith({
      id: "1",
      habitName: "Drink Water",
    });
  });
});
