import React, { useState,useContext  } from 'react';
import './EmployeeDashboard.css';

import { EmployeeContext  } from './EmployeeContext'; // Import the context

const EmployeeDashboard = ({ employeeId }) => {
  const { employees } = useContext(EmployeeContext);
  const employeeData = employees.find(emp => emp.id === employeeId); // Get the employee data based on ID

  // ... rest of your employee dashboard code


// ... rest of your employee code



  const [selectedTab, setSelectedTab] = useState('myCourses');

  return (
    <div className="employee-dashboard">
      <h1>Welcome, {employeeData.name}</h1>

      <div className="tabs">
        <button
          className={`tab-button ${selectedTab === 'myCourses' ? 'active' : ''}`}
          onClick={() => setSelectedTab('myCourses')}
        >
          My Courses
        </button>
        <button
          className={`tab-button ${selectedTab === 'progress' ? 'active' : ''}`}
          onClick={() => setSelectedTab('progress')}
        >
          Progress
        </button>
      </div>

      {selectedTab === 'myCourses' && (
        <div className="tab-content">
          <h3>Courses Assigned to You:</h3>
          <ul>
            {employeeData.courses.map(course => (
              <li key={course}>
                {course} - Progress: {employeeData.progress[course]}%
              </li>
            ))}
          </ul>
        </div>
      )}

      {selectedTab === 'progress' && (
        <div className="tab-content">
          <h3>Progress Overview</h3>
          <ul>
            {employeeData.courses.map(course => (
              <li key={course}>
                {course} - Progress: {employeeData.progress[course]}%
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default EmployeeDashboard;
