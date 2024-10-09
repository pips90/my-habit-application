import React from "react";
import { Link } from "react-router-dom";

const HomePage: React.FC = () => {
  console.log('this app is running')
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      textAlign: 'center',
      backgroundColor: '#f4f4f4',
    }}>
      <h2 style={{ fontSize: '2.5rem', color: '#333', marginBottom: '20px' }}>Welcome to the Habit Tracker</h2>
      <Link to="/habit-creation" style={{
          fontSize: '1.25rem',
          color: '#007bff',
          textDecoration: 'none',
          border: '1px solid #007bff',
          padding: '10px 20px',
          borderRadius: '5px',
          transition: 'background-color 0.3s ease, color 0.3s ease',
        }}>Go to Your Habits</Link>
    </div>
  );
};

export default HomePage;
