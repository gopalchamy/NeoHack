import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ManagerDashboard = () => {
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchUsersAndCourses = async () => {
      const usersResponse = await axios.get('http://localhost:3001/users'); // Fetch all users
      const coursesResponse = await axios.get('http://localhost:3001/courses'); // Fetch all courses
      setUsers(usersResponse.data);
      setCourses(coursesResponse.data);
    };

    fetchUsersAndCourses();
  }, []);

  const handleAssignCourse = async (userId, courseId) => {
    // Logic to assign course to user
    await axios.post('http://localhost:3001/user/assign-course', { userId, courseId });
    alert('Course assigned successfully');
  };

  return (
    <div>
      <h2>Manager Dashboard</h2>
      <h3>Assign Courses</h3>
      {users.map(user => (
        <div key={user._id}>
          <h4>{user.username}</h4>
          {courses.map(course => (
            <button key={course._id} onClick={() => handleAssignCourse(user._id, course._id)}>
              Assign {course.title}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ManagerDashboard;
