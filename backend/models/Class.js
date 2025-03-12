const pool = require("../config/db");

const Class = {
    getAll: async () => {
        const query = `SELECT * FROM CLASS`;
        const [rows] = await pool.query(query);
        return rows;
    },
    getById: async (classId) => {
        const query = `SELECT * FROM CLASS WHERE ClassId = ?`;
        const [rows] = await pool.query(query, [classId]); 
        const query2=`SELECT * FROM STUDENT s, USERS u WHERE s.UserId=u.userId and CurrentClassId=?`;
        const [rows2]=await pool.query(query2,[classId]);
        const query3=`SELECT co.CourseCode, co.Name, t.UserId, t.FName, t.LName, t.MInit 
        FROM CURRICULUM c, COURSE co, USERS t 
        WHERE c.CourseId=co.CourseCode and c.AssignedTeacherId=t.UserId and ClassId=?`;
        const [rows3]=await pool.query(query3,[classId]);
        rows[0].Courses=rows3;
        rows[0].Students=rows2;
        return rows[0];
    },
    create: async (newClass) => {
        const query = `INSERT INTO CLASS (Sem, Branch, StartDate, EndDate, Degree) VALUES (?, ?, ?, ?, ?)`;
        const [result] = await pool.query(query, [newClass.sem, newClass.branch, newClass.startDate, newClass.endDate, newClass.degree]);
        // console.log(result);
        return result.insertId;
    },
    addCourse: async (classId, courseCode, teacherId) => {
        const query = `INSERT INTO CURRICULUM (ClassId, CourseId, AssignedTeacherId) VALUES (?, ?, ?)`;
        const [result] = await pool.query(query, [classId,courseCode,teacherId]);
        return result;
    }
};

module.exports = Class;