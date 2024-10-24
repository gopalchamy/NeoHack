const express = require('express');
const User = require('../models/user');
const Course = require('../models/course');
const router = express.Router();

// Get user enrolled courses
router.get('/user/:id/courses', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('enrolledCourses');
    res.json(user.enrolledCourses);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Assign course to user
router.post('/user/assign-course', async (req, res) => {
  const { userId, courseId } = req.body;

  try {
    const user = await User.findById(userId);
    const course = await Course.findById(courseId);

    if (!user || !course) {
      return res.status(404).json({ message: 'User or course not found' });
    }

    user.enrolledCourses.push(courseId);
    course.enrolledUsers.push(userId);

    await user.save();
    await course.save();

    res.json({ message: 'Course assigned to user' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Complete course and issue certificate
router.post('/user/complete-course', async (req, res) => {
  const { userId, courseId } = req.body;

  try {
    const user = await User.findById(userId);
    const course = await Course.findById(courseId);

    if (!user || !course) {
      return res.status(404).json({ message: 'User or course not found' });
    }

    user.completedCourses.push(courseId);
    await user.save();

    // Generate a certificate (basic example)
    const certificate = {
      title: `Certificate of Completion for ${course.title}`,
      issuedBy: 'Your Company',
    };

    res.json({ message: 'Course completed', certificate });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
