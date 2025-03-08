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
        rows[0].Students=rows2;
        return rows[0];
    }
};

module.exports = Class;