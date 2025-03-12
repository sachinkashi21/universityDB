const pool=require("../config/db");

const Teacher={
    getAll:async()=>{
        const q=`SELECT * from Teacher t, Users u WHERE t.UserId=u.UserId`;
        const [rows]=await pool.query(q);
        return rows;
    }
}

module.exports=Teacher;