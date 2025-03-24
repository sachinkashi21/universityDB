const router = require('express').Router();
const asyncFn = require('../middleware/asyncWrapper');
const Lecture = require('../models/Lecture');

// Endpoint to add a new lecture
router.post('/:classId/:courseId', asyncFn(async (req, res) => {
  const { classId, courseId } = req.params;
  const { topic, date, time, duration, roomNo, meetLink } = req.body;

  await Lecture.AddNew({ ...req.body, ...req.params });
  res.json({ message: 'Lecture successfully scheduled' });
}));

// Endpoint to save attendance
router.post('/attendance/:classId/:lectId', asyncFn(async (req, res) => {
  const { classId, lectId } = req.params;
  const { attendance } = req.body;

  // Validate that attendance is provided and is an object
  if (!attendance || typeof attendance !== 'object') {
    return res.status(400).json({ error: 'Invalid attendance data' });
  }

  await Lecture.saveAttendance({ attendance, lectId });
  res.json({ message: 'Attendance successfully saved' });
}));

module.exports = router;
