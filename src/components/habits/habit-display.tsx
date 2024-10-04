import { Habit } from "./slices/habit-creation-slice";
import styles from "../styles/habit-display-styleSheet.module.css";

interface HabitListProps {
  habits: Habit[];
  handleCompletionCheck: (id: string) => void;
}

const HabitList: React.FC<HabitListProps> = ({ habits, handleCompletionCheck }) => {
  return (
     <div className={styles.habitContainer}>
      <h2>Your Habits</h2>
      <ul>
        {habits.map((habit) => (
          <li key={habit.id}>
            <input
              type="checkbox"
              id={habit.id} // Unique ID for the checkbox
              checked={habit.habitCompleted}
              onChange={() => handleCompletionCheck(habit.id)}
            />
            <label htmlFor={habit.id}>{habit.habitName}</label> 
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HabitList;
