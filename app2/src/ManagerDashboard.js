import React, { useState } from 'react';
import './ManagerDashboard.css';

const ManagerDashboard = ({ employees, onAddCourse }) => {
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const [courseName, setCourseName] = useState('');

  const handleAddCourse = () => {
    if (selectedEmployeeId && courseName) {
      onAddCourse(selectedEmployeeId, courseName); // Update the employee's courses via the handler passed from App.js
      setCourseName(''); // Clear the input
    }
  };

  return (
    <div className="manager-dashboard">
      <h1>Manager: Assign Courses</h1>

      {/* Select an employee */}
      <select
        value={selectedEmployeeId || ''}
        onChange={e => setSelectedEmployeeId(Number(e.target.value))}
      >
        <option value="" disabled>Select Employee</option>
        {employees.map(employee => (
          <option key={employee.id} value={employee.id}>
            {employee.name}
          </option>
        ))}
      </select>

      {/* Input for adding a new course */}
      <input
        type="text"
        value={courseName}
        onChange={(e) => setCourseName(e.target.value)}
        placeholder="Enter new course"
      />
      <button onClick={handleAddCourse}>Add Course</button>
    </div>
  );
};

export default ManagerDashboard;
