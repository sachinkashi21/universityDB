const pool = require("../config/db");

const Teacher = {
  getId: async (classId,courseId)=>{
    const q=`select AssignedTeacherId from Curriculum where ClassId= ? and CourseId= ?`
    const [teacherId]= await pool.query(q,[classId,courseId]);
    // console.log(teacherId);
    return teacherId[0].AssignedTeacherId;
  },
  // Get all teachers
  getAll: async () => {
    const q = `SELECT t.*, u.FName, u.LName, u.Email 
               FROM TEACHER t
               JOIN USERS u ON t.UserId = u.UserId`;
    const [rows] = await pool.query(q);
    return rows;
  },

  // Get a specific teacher's details, curriculum, and lectures
  get: async (userId) => {
    const q1 = `SELECT t.*, u.FName, u.LName, u.Email, u.Role 
                FROM TEACHER t
                JOIN USERS u ON t.UserId = u.UserId
                WHERE t.UserId = ?`;

    const q2 = `SELECT c.*, cl.*, co.*
                FROM CURRICULUM c
                JOIN CLASS cl ON c.ClassId = cl.ClassId
                JOIN COURSE co ON c.CourseId = co.CourseCode
                WHERE c.AssignedTeacherId = ?`;

    const q3 = `SELECT l.LectureId, l.Date, l.Time, l.Duration, l.Topic, l.RoomNo, l.MeetLink, co.Name AS CourseName, cl.Sem, cl.Branch
                FROM LECTURE l
                JOIN CURRICULUM c ON l.ClassId = c.ClassId AND l.CourseId = c.CourseId
                JOIN CLASS cl ON c.ClassId = cl.ClassId
                JOIN COURSE co ON c.CourseId = co.CourseCode
                WHERE c.AssignedTeacherId = ? AND (l.Date > CURDATE() OR 
                (l.Date = CURDATE() AND ADDTIME(l.Time, SEC_TO_TIME(l.Duration * 60 + 600)) > CURTIME()))
                ORDER BY l.Date ASC;`;

    const [teacherData] = await pool.query(q1, [userId]);
    const [curriculumData] = await pool.query(q2, [userId]);
    const [lectureData] = await pool.query(q3, [userId]);

    return {
      teacher: teacherData.length > 0 ? teacherData[0] : null,
      curriculum: curriculumData,
      lectures: lectureData,
    };
  },

  // Get lectures for a specific class and course
  getLectures: async (classId, courseId) => {
    const q = `SELECT l.LectureId, l.Date, l.Time, l.Duration, l.Topic, l.RoomNo, l.MeetLink
               FROM LECTURE l
               WHERE l.ClassId = ? AND l.CourseId = ?
               ORDER BY l.Date ASC`;
    const [rows] = await pool.query(q, [classId, courseId]);
    return rows;
  },

  // Get assignments for a specific class and course
  getAssignments: async (classId, courseId) => {
    const q = `SELECT a.AssignmentId, a.Title, a.Description, a.GivenOn, a.Deadline
               FROM ASSIGNMENT a
               WHERE a.ClassId = ? AND a.CourseId = ?
               ORDER BY a.GivenOn DESC`;
    const [rows] = await pool.query(q, [classId, courseId]);
    return rows;
  },

  // Get students for a specific class
  getStudents: async (classId) => {
    const q = `SELECT u.UserId, u.FName, u.LName, u.Email
               FROM USERS u
               JOIN STUDENT s ON u.UserId = s.UserId
               WHERE s.CurrentClassId = ?`;
    const [rows] = await pool.query(q, [classId]);
    return rows;
  },

  // Get attendance records for a specific lecture
  getAttendance: async (classId,courseId) => {
    const q = `SELECT a.Status, u.UserId, u.FName, u.LName
               FROM ATTENDANCE a
               JOIN USERS u ON a.StudentId = u.UserId
               JOIN LECTURE l ON l.LectureId=a.LectureId
               WHERE l.ClassId= ? and l.CourseId= ?`;
    const [rows] = await pool.query(q, [classId, courseId]);
    return rows;
  },
};

module.exports = Teacher;
