import React from 'react';
import './App.css';
import AddEmployeeForm from './components/AddEmployeeForm'; // Adjusted path to the components folder

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Add New Employee</h1> {/* Title for the form */}
        <AddEmployeeForm /> {/* Render the AddEmployeeForm component */}
      </header>
    </div>
  );
}

export default App;
