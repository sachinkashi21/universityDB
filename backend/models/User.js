const pool = require("../config/db");
let bcrypt=require('bcrypt');
const saltRounds = 10;

const User = {
  createUser: async ({ fname, minit, lname, role, phone, email, password, dob }) => {
    const query1 = `SELECT * FROM USERS WHERE Email = ?`;
    const [rows] = await pool.query(query1, [email]);
    if (rows.length !== 0) {
      return { error: "User already exists" };
    }
    const hash = bcrypt.hashSync(password, saltRounds);
    const query = `
      INSERT INTO USERS (FName, MInit, LName, Role, Phone, Email, Password, dob)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const [result] = await pool.query(query, [fname, minit, lname, role, phone, email, hash, dob]);
    if(role=="Student"){
      const q1=`INSERT INTO STUDENT (UserId) VALUES (?)`
      await pool.query(q1,[result.insertId]);
    } else if(role="Teacher"){
      const q2=`INSERT INTO TEACHER (UserId) VALUES (?)`
      await pool.query(q2,[result.insertId]);
    }
    return { userId: result.insertId };
  },

  login: async ({ email, password }) => {
    const query = `SELECT * FROM USERS WHERE Email = ?`;
    const [rows] = await pool.query(query, [email]);
    if (rows.length === 0) {
      return { error: "User does not exist" };
    }
    const user = rows[0];
    if (bcrypt.compareSync(password, user.Password)) {
      return { email, role: user.Role };
    }
    return { error: "Bad Credentials" };
  },

  changePassword: async (userId, { oldPassword, newPassword }) => {
    const query = `SELECT * FROM USERS WHERE UserId = ?`;
    const [rows] = await pool.query(query, [userId]);
    if (rows.length === 0) {
      return { error: "User does not exist" };
    }
    const user = rows[0];
    if (bcrypt.compareSync(oldPassword, user.Password)) {
      const hash = bcrypt.hashSync(newPassword, saltRounds);
      const query = `UPDATE USERS SET Password = ? WHERE UserId = ?`;
      await pool.query(query, [hash, userId]);
      return { success: true };
    }
    return { error: "Bad Credentials" };
  },

  getById: async (userId) => {
    const query = `SELECT * FROM USERS WHERE UserId = ?`;
    const [rows] = await pool.query(query, [userId]);
    return rows[0];
  },

  getAll: async () => {
    const query = `SELECT * FROM USERS`;
    const [rows] = await pool.query(query);
    return rows;
  },
};

module.exports = User;