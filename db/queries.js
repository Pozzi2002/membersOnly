const pool = require('../db/pool');
const bcrypt = require('bcryptjs');

exports.signUpQueryDB = async (firstName, lastName, nickName, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query(`INSERT INTO users (firstname, lastname, nickname, password)
                      VALUES ($1, $2, $3, $4)`, [firstName, lastName, nickName, hashedPassword]);
};
