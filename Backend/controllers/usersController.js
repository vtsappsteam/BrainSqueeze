const { convertKeys } = require("../helpers/helpers");
const { userSortKeys, allowedOrders } = require("../helpers/sortKeys");
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  emailExists,
} = require("../services/userService");
const bcrypt = require("bcrypt");

const getAllUsersEndpoint = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;
  const filterName = req.query.filterName || null;
  const sortBy = req.query.sortBy;
  const order = req.query.order || "asc";

  if (
    sortBy &&
    (!userSortKeys.includes(sortBy) || !allowedOrders.includes(order))
  ) {
    return res.status(400).json({ error: "Invalid sort parameters!" });
  }
  try {
    const users = await getUsers(filterName, limit, offset, sortBy, order);
    const totalCount =
      users.rows.length > 0 ? parseInt(users.rows[0].total_count) : 0;
    const totalPages = Math.ceil(totalCount / limit);
    const data = convertKeys(users.rows, "camel");

    res.json({
      page,
      limit,
      totalPages,
      totalUsers: totalCount,
      content: data,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error while retreiving data!" });
  }
};

const getUserByIdEndpoint = async (req, res) => {
  try {
    const user = await getUserById(req.params.id);
    if (!user) {
      res.status(404).json({
        error: "User not found!",
      });
    }
    const data = convertKeys([user], "camel");

    res.json({
      content: data[0],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error while retreiving data!" });
  }
};

const createUserEndpoint = async (req, res) => {
  try {
    const userExists = await emailExists(req.body.email);
    if (userExists) {
      return res.status(400).json({ error: "Email already exists!" });
    }

    const passwordHash = await bcrypt.hash(req.body.password, 10);
    await createUser(
      req.body.firstName,
      req.body.lastName,
      req.body.email,
      passwordHash
    );
    let apires = {
      status: 200,
      message: "Successfully created User.",
    };
    res.status(200).json(apires);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error while creating a User!" });
  }
};

const updateUserEndpoint = async (req, res) => {
  try {
    await updateUser(
      req.params.id,
      req.body.firstName,
      req.body.lastName,
      req.body.email
    );
    let apires = {
      status: 200,
      message: "Successfully updated User.",
    };
    res.status(200).json(apires);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error while updating a User!" });
  }
};

const deleteUserEndpoint = async (req, res) => {
  try {
    await deleteUser(req.params.id);
    let apires = {
      status: 200,
      message: "Successfully deleted User.",
    };
    res.status(200).json(apires);
  } catch (err) {
    console.error(err);
    res.status(err.status || 500).json({
      error: err.message || "Error while deleting a User!",
    });
  }
};

module.exports = {
  getAllUsersEndpoint,
  getUserByIdEndpoint,
  createUserEndpoint,
  updateUserEndpoint,
  deleteUserEndpoint,
};
