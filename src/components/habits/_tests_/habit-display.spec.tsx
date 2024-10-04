import { Provider } from "react-redux";
import { store } from "../../../Redux/store";
import HabitList from "../habit-display";
import { getByRole, render, screen } from "@testing-library/react";
import { completedHabit } from "../slices/habit-creation-slice";
import userEvent from "@testing-library/user-event";

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
    const habits = [
      { id: "1", habitName: "Drink Water", habitCompleted: false },
      { id: "2", habitName: "Exercise", habitCompleted: false },
      { id: "3", habitName: "Eat Lunch", habitCompleted: false },
    ];
    render(
      <Provider store={store}>
        <HabitList habits={habits} handleCompletionCheck={() => {}} />
      </Provider>
    );

    const habitOne = await screen.findByText("Drink Water");
    const habitTwo = await screen.findByText("Exercise");
    const habitThree = await screen.findByText("Eat Lunch");

    expect(habitOne && habitTwo && habitThree).toBeVisible();
  });

  it('Should handle updating habitCompleted when habit is "checked"', async () => {
    const user = userEvent.setup();
    const handleCompletionCheck = jest.fn(); // Mock function
    
    const habits = [
      { id: "1", habitName: "Drink Water", habitCompleted: false },
      { id: "2", habitName: "Exercise", habitCompleted: false },
      { id: "3", habitName: "Eat Lunch", habitCompleted: false },
    ];
    render(
      <Provider store={store}>
        <HabitList habits={habits} handleCompletionCheck={handleCompletionCheck} />
      </Provider>
    );

    const habitOne = await screen.getByLabelText('Drink Water')
    const habitTwo = await screen.getByLabelText('Exercise');
    const habitThree = await screen.getByLabelText('Eat Lunch');

    expect(habitOne && habitTwo && habitThree).not.toBeChecked();

    await user.click(habitTwo)

    expect(handleCompletionCheck).toBeCalledWith('2')

  });

});
