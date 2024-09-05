import { render, screen } from "@testing-library/react"
import HabitCreation from "../habit-creation"

describe('Should run tests for "habit-creation" component', () => {
    it('Should render "habit-creation" component', () => {
        render(<HabitCreation />)
        const habitHeading = screen.getByText('Habit Creation Screen')
        const habitInput = screen.getByPlaceholderText('Your Habit')
        const addHabitBtn = screen.getByText('Add Habit')

        expect(habitHeading && habitInput && addHabitBtn).toBeVisible()
    })
})