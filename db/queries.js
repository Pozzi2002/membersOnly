const pool = require('../db/pool');
const bcrypt = require('bcryptjs');

exports.signUpQueryDB = async (firstName, lastName, nickName, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query(`INSERT INTO users (firstname, lastname, nickname, password, admin)
                      VALUES ($1, $2, $3, $4, $5)`, [firstName, lastName, nickName, hashedPassword, false]);
};

exports.checkUsernameDB = async (nickname) => {
  const { rows } = await pool.query('SELECT * FROM users WHERE nickname = $1', [nickname])
  return rows
};

exports.makeAnAdmin = async (nickname) => {
    await pool.query('UPDATE users SET admin = $2 WHERE nickname = $1', [nickname, true])
};

exports.addMessage = async (nickname, message) => {
  await pool.query('INSERT INTO messages (nickname, message, date) VALUES ($1, $2, $3)', [nickname, message, new Date().toISOString()])
};

exports.allMessagesDB = async () => {
  const { rows } = await pool.query('SELECT * FROM messages');
  return rows
};

exports.deleteMsgDB = async (id) => {
  await pool.query('DELETE FROM messages WHERE id = $1', [id])
};