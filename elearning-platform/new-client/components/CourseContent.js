import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CourseContent = ({ courseId }) => {
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      const response = await axios.get(`http://localhost:3001/courses/${courseId}`);
      setCourse(response.data);
    };

    fetchCourse();
  }, [courseId]);

  const handleTestSubmit = (e) => {
    e.preventDefault();
    // Logic to submit test answers and complete the course
  };

  if (!course) return <div>Loading...</div>;

  return (
    <div>
      <h2>{course.title}</h2>
      <video src={course.videoUrl} controls />
      <h3>Reference Materials</h3>
      <ul>
        {course.referenceMaterials.map((material, index) => (
          <li key={index}>
            <a href={material} target="_blank" rel="noopener noreferrer">{material}</a>
          </li>
        ))}
      </ul>
      <h3>Test</h3>
      <form onSubmit={handleTestSubmit}>
        {course.tests.map((test, index) => (
          <div key={index}>
            <p>{test.question}</p>
            {test.options.map((option, idx) => (
              <div key={idx}>
                <input type="radio" name={`question${index}`} value={option} />
                <label>{option}</label>
              </div>
            ))}
          </div>
        ))}
        <button type="submit">Submit Test</button>
      </form>
    </div>
  );
};

export default CourseContent;
