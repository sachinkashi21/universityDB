const pool = require("../config/db");

const User = {
  create: async ({ name, role, phone, address, email }) => {
    const query = `
      INSERT INTO USERS (Name, Role, Phone, Address, Email)
      VALUES (?, ?, ?, ?, ?)
    `;
    const [result] = await pool.query(query, [name, role, phone, address, email]);
return result.insertId;
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

  update: async (userId, { name, phone, address, email }) => {
    const query = `
      UPDATE USERS 
      SET Name = ?, Phone = ?, Address = ?, Email = ?
      WHERE UserId = ?
    `;
    const [result] = await pool.query(query, [name, phone, address, email, userId]);
return result.affectedRows > 0;
  },

  delete: async (userId) => {
    const query = `DELETE FROM USERS WHERE UserId = ?`;
    const [result] = await pool.query(query, [userId]);
return result.affectedRows > 0;
  }
};

module.exports = User;