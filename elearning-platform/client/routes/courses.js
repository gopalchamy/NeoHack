// server/routes/courses.js
const express = require('express');
const Course = require('../models/course');
const router = express.Router();

// Get all courses
router.get('/', async (req, res) => {
  const courses = await Course.find();
  res.json(courses);
});

// Add a new course
router.post('/', async (req, res) => {
  const newCourse = new Course(req.body);
  await newCourse.save();
  res.status(201).json(newCourse);
});

module.exports = router;
