// src/components/CourseManager.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CourseManager = () => {
  const [courses, setCourses] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [instructor, setInstructor] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [referenceMaterials, setReferenceMaterials] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      const response = await axios.get('http://localhost:3001/api/courses');
      setCourses(response.data);
    };
    fetchCourses();
  }, []);

  const handleAddCourse = async () => {
    await axios.post('http://localhost:3001/api/courses', {
      title,
      description,
      instructor,
      videoUrl,
      referenceMaterials: referenceMaterials.split(','),
    });
    // Clear the input fields
    setTitle('');
    setDescription('');
    setInstructor('');
    setVideoUrl('');
    setReferenceMaterials('');
    // Refresh the course list
    const response = await axios.get('http://localhost:3001/api/courses');
    setCourses(response.data);
  };

  return (
    <div>
      <h1>Course Management</h1>
      <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
      <input type="text" placeholder="Instructor" value={instructor} onChange={(e) => setInstructor(e.target.value)} />
      <input type="text" placeholder="Video URL" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} />
      <input type="text" placeholder="Reference Materials (comma separated)" value={referenceMaterials} onChange={(e) => setReferenceMaterials(e.target.value)} />
      <button onClick={handleAddCourse}>Add Course</button>

      <h2>Course List</h2>
      {courses.map(course => (
        <div key={course._id}>
          <h3>{course.title}</h3>
          <p>{course.description}</p>
          <a href={course.videoUrl} target="_blank" rel="noopener noreferrer">Watch Video</a>
          <h4>Reference Materials</h4>
          <ul>
            {course.referenceMaterials.map((material, index) => (
              <li key={index}><a href={material} target="_blank" rel="noopener noreferrer">{material}</a></li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default CourseManager;
