import React, { createContext, useState } from 'react';

// Create the context
export const EmployeeContext = createContext();

// Create a provider component
export const EmployeeProvider = ({ children }) => {
  const [employees, setEmployees] = useState([
    { id: 1, name: 'John Doe', courses: [], progress: {} },
    { id: 2, name: 'Jane Smith', courses: [], progress: {} },
  ]);

  const addEmployee = (name) => {
    const newEmployee = {
      id: employees.length + 1,
      name,
      courses: [],
      progress: {},
    };
    setEmployees([...employees, newEmployee]);
  };

  const updateEmployeeCourses = (id, courseName) => {
    setEmployees((prev) => 
      prev.map((emp) =>
        emp.id === id 
          ? {
              ...emp,
              courses: [...emp.courses, courseName],
              progress: { ...emp.progress, [courseName]: 0 }, // Initialize progress
            }
          : emp
      )
    );
  };

  // Add more functions for updating employees, deleting courses, etc.

  return (
    <EmployeeContext.Provider value={{ employees, setEmployees, addEmployee, updateEmployeeCourses }}>
      {children}
    </EmployeeContext.Provider>
  );
};
