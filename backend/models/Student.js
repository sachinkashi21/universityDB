const pool=require("../config/db");

const Student={
    getAll:async ()=>{
        let q=`SELECT CurrentClassId, FName, MInit, LName, u.UserId FROM Users u, Student s WHERE u.UserId=s.UserId`;
        let [students]=await pool.query(q);
        // console.log(students);
        return students;
    }
}

module.exports=Student;