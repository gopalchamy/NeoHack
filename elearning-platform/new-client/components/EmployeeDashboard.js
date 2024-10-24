import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EmployeeDashboard = ({ userId }) => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const response = await axios.get(`http://localhost:3001/user/${userId}/courses`);
      setCourses(response.data);
    };

    fetchCourses();
  }, [userId]);

  const handleCourseClick = (course) => {
    // Redirect to the course content page
    // Use React Router's useHistory() or <Link> to navigate to the CourseContent component
    console.log('Course clicked:', course);
  };

  return (
    <div>
      <h2>Your Courses</h2>
      <ul>
        {courses.map(course => (
          <li key={course._id} onClick={() => handleCourseClick(course)}>
            <h3>{course.title}</h3>
            <p>{course.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeDashboard;
