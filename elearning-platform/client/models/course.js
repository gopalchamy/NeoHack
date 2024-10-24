// server/models/course.js
const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  instructor: { type: String, required: true },
  videoUrl: { type: String, required: true },
  referenceMaterials: [{ type: String }],
});

module.exports = mongoose.model('Course', courseSchema);
