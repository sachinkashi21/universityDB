const pool=require('../config/db');

const Course={
    getAll:async()=>{
        const query=`SELECT * FROM COURSE`;
        const [rows]=await pool.query(query);
        return rows;
    },
    getAllExcludingInClass:async(cls)=>{
        const query=`SELECT * FROM COURSE WHERE CourseCode NOT IN (SELECT CourseId FROM CURRICULUM WHERE ClassId=?)`;
        const [rows]=await pool.query(query,[cls]);
        return rows;
    }
}

module.exports=Course;