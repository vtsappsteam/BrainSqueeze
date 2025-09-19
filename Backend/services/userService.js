const pool = require("../db");
const { tableNames } = require("../db/tableNames");

const totalUsersCount = async () => {
  return await pool.query(`SELECT COUNT(*) FROM ${tableNames.USERS_TABLE}`);
};

const emailExists = async (email) => {
  const query = `SELECT * FROM ${tableNames.USERS_TABLE} WHERE email = $1`;
  const result = await pool.query(query, [email]);
  return result.rows.length > 0;
};

const getUsers = async (filterName, limit, offset, sortBy, order) => {
  const filter = filterName?.split(" ");
  console.log("Filter array:", filter);
  let filterQuery = "";
  if (filter?.length === 1) {
    filterQuery += `WHERE first_name ILIKE '${filter[0]}%' OR last_name ILIKE '${filter[0]}%'`;
  } else if (filter?.length === 2) {
    filterQuery += `WHERE first_name ILIKE '${filter[0]}%' AND last_name ILIKE '${filter[1]}%'`;
  }

  let sortByMap = sortBy;
  switch (sortBy) {
    case "id":
      sortByMap = "id";
      break;
    case "firstName":
      sortByMap = "first_name";
      break;
    case "lastName":
      sortByMap = "last_name";
      break;
    case "email":
      sortByMap = "email";
      break;
    default:
      sortByMap = "id";
      break;
  }
  let query = `SELECT id, first_name, last_name, email, COUNT(*) OVER() as total_count FROM ${tableNames.USERS_TABLE} ${filterQuery} ORDER BY ${sortByMap} ${order} LIMIT $1 OFFSET $2`;
  return await pool.query(query, [limit, offset]);
};

const getUserById = async (userId) => {
  const query = `SELECT id, first_name, last_name, email FROM ${tableNames.USERS_TABLE} WHERE id =$1`;
  const dbresultsUser = await pool.query(query, [userId]);
  return dbresultsUser.rows.length > 0 ? dbresultsUser.rows[0] : null;
};

const getUserPasswordByEmail = async (email) => {
  const query = `SELECT id, first_name, last_name, email, password, password_change_needed FROM ${tableNames.USERS_TABLE} WHERE email =$1`;
  const dbresultsUser = await pool.query(query, [email]);
  return dbresultsUser.rows.length > 0 ? dbresultsUser.rows[0] : null;
};

const createUser = async (firstName, lastName, email, password) => {
  const query = `INSERT INTO ${tableNames.USERS_TABLE} (first_name, last_name, email, password, password_change_needed) VALUES ($1, $2, $3, $4, $5)`;
  const values = [firstName, lastName, email, password, true];
  await pool.query(query, values);
};

const updateUser = async (userId, firstName, lastName, email) => {
  const query = `UPDATE ${tableNames.USERS_TABLE} SET first_name=$2, last_name=$3, email=$4 WHERE id=$1`;
  const values = [userId, firstName, lastName, email];
  await pool.query(query, values);
};

const deleteUser = async (userId) => {
  const queryGet = `SELECT email FROM ${tableNames.USERS_TABLE} WHERE id=$1`;
  const result = await pool.query(queryGet, [userId]);
  if (result.rows.length === 0) {
    throw new Error("User not found");
  }
  if (result.rows[0].email === "admin@vtsappstim.edu.rs") {
    const err = new Error("The user with this email cannot be deleted");
    err.status = 403;
    throw err;
  }
  const queryDelete = `DELETE FROM ${tableNames.USERS_TABLE} WHERE id=$1`;
  await pool.query(queryDelete, [userId]);
};

const changePassword = async (userId, newPassword) => {
  const query = `UPDATE ${tableNames.USERS_TABLE} SET password=$2, password_change_needed=false WHERE id=$1`;
  const values = [userId, newPassword];
  await pool.query(query, values);
};

const saveRefreshToken = async (userId, refreshToken) => {
  const query = `UPDATE ${tableNames.USERS_TABLE} SET refresh_token=$2 WHERE id=$1`;
  const values = [userId, refreshToken];
  await pool.query(query, values);
};

const getRefreshToken = async (id) => {
  const query = `SELECT * FROM ${tableNames.USERS_TABLE} WHERE id=$1`;
  const result = await pool.query(query, [id]);
  return result.rows.length > 0 ? result.rows[0] : null;
};

module.exports = {
  getUsers,
  emailExists,
  totalUsersCount,
  getUserById,
  getUserPasswordByEmail,
  createUser,
  updateUser,
  deleteUser,
  changePassword,
  saveRefreshToken,
  getRefreshToken,
};
