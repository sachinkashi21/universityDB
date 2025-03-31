const pool = require("../config/db");

const Report = {
    addReports: async (reports) => {
        const query = `
            INSERT INTO REPORT (StudentId, SEEMarks, CIEMarks, Grade, Remark, CourseId, ClassId)
            VALUES ?
            ON DUPLICATE KEY UPDATE 
                SEEMarks = VALUES(SEEMarks), 
                CIEMarks = VALUES(CIEMarks), 
                Grade = VALUES(Grade), 
                Remark = VALUES(Remark);
        `;

        const values = reports.map((report) => [
            report.StudentId,
            report.SEEMarks,
            report.CIEMarks,
            report.Grade,
            report.Remark,
            report.CourseId,
            report.ClassId,
        ]);

        await pool.query(query, [values]);
    },
    getAllMarks:async (classId,studentId)=>{
        const q=`select * from report r where r.ClassId= ? and r.StudentId= ?`;
        const [row]=await pool.query(q,[classId,studentId]);
        return row;
    }
};

module.exports = Report;
