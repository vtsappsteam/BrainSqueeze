const pool = require("../db");
const { tableNames } = require("../db/tableNames");

const totalUsersCount = async () => {
  return await pool.query(`SELECT COUNT(*) FROM ${tableNames.USERS_TABLE}`);
};
const getUsers = async (limit, offset) => {
  return await pool.query(
    `SELECT * FROM ${tableNames.USERS_TABLE} ORDER BY id LIMIT $1 OFFSET $2`,
    [limit, offset]
  );
};

const getUserById = async (userId) => {
  const query = `SELECT * FROM ${tableNames.USERS_TABLE} WHERE id =$1`;
  const dbresultsUser = await pool.query(query, [userId]);
  return dbresultsUser.rows.length > 0 ? dbresultsUser.rows[0] : null;
};

const createUser = async (firstName, lastName, email, roleId) => {
  const query = `INSERT INTO ${tableNames.USERS_TABLE} (first_name, last_name, email, role_id) VALUES ($1, $2, $3, $4)`;
  const values = [firstName, lastName, email, roleId];
  await pool.query(query, values);
};

const updateUser = async (userId, firstName, lastName, email, roleId) => {
  const query = `UPDATE ${tableNames.USERS_TABLE} SET first_name=$2, last_name=$3, email=$4, role_id=$5 WHERE id=$1`;
  const values = [userId, firstName, lastName, email, roleId];
  await pool.query(query, values);
};

const deleteUser = async (userId) => {
  const query = `DELETE FROM ${tableNames.USERS_TABLE} WHERE id=$1`;
  await pool.query(query, [userId]);
};

module.exports = {
  getUsers,
  totalUsersCount,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
