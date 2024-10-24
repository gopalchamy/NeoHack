const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  instructor: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  videoUrl: {
    type: String, // URL to the video content
    required: true,
  },
  referenceMaterials: [String], // Array of URLs for reference materials
  tests: [{
    question: String,
    options: [String],
    correctAnswer: String,
  }],
  enrolledUsers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  certificate: {
    title: String,
    issuedBy: String,
  }
});

module.exports = mongoose.model('Course', courseSchema);
