const pool=require("../config/db");

const Student={
    get: async(id)=>{
        let q=`select * from Users u, Student s where u.UserId=s.UserId and u.userId= ?`
        let [student]=await pool.query(q,[id]);
        return student;
    },
    getAll:async ()=>{
        let q=`SELECT CurrentClassId, FName, MInit, LName, u.UserId FROM Users u, Student s WHERE u.UserId=s.UserId`;
        let [students]=await pool.query(q);
        // console.log(students);
        return students;
    },
    getInClass:async (classId)=>{
        let q = `SELECT u.UserId, u.FName, u.MInit, u.LName, s.CurrentClassId 
                FROM Users u
                JOIN Student s ON u.UserId = s.UserId
                WHERE s.CurrentClassId = ?`;
        let [students] = await pool.query(q, [classId]);
        return students;
    }
}

module.exports=Student;