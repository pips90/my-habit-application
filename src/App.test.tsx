import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "./Redux/store";

import AppRoutes from "./routes/Routes";
describe("Should run tests for App component", () => {
  // TODO: Put this somewhere else (maybe part of a custom render since this needs before ALL tests)
  beforeAll(() => {
    jest.spyOn(console, "error").mockImplementation((message) => {
      if (message.includes("ReactDOMTestUtils.act is deprecated")) {
        return;
      }
      console.error(message);
    });
  });

  test("renders learn react link", () => {
    render(
      <Provider store={store}>
        <AppRoutes />
      </Provider>
    );
    const heading = screen.getByText("Welcome to the Habit Tracker");

    expect(heading).toBeVisible();
  });
});
