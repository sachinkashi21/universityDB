const pool = require('../config/db');

const Lecture = {
  AddNew: async ({ topic, date, time, duration, roomNo, meetLink, classId, courseId }) => {
    const q = `
      INSERT INTO LECTURE (Topic, Date, Time, Duration, RoomNo, MeetLink, ClassId, CourseId)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    await pool.query(q, [topic, date, time, duration, roomNo, meetLink, classId, courseId]);
  },

  saveAttendance: async ({ attendance, lectId }) => {
    // Query to insert or update attendance for students
    const q = `
      INSERT INTO ATTENDANCE (Status, StudentId, LectureId)
      VALUES (?, ?, ?)
      ON DUPLICATE KEY UPDATE Status = VALUES(Status)
    `;

    // Loop through attendance and save each student's record
    const promises = Object.entries(attendance).map(([studentId, status]) =>
      pool.query(q, [status, studentId, lectId])
    );

    await Promise.all(promises);
  }
};

module.exports = Lecture;
