const pool = require("../db");
const { tableNames } = require("../db/tableNames");

const totalCategoriesCount = async () => {
  return await pool.query(`SELECT COUNT(*) FROM ${tableNames.CATEGORY_TABLE}`);
};

const getCategory = async (categoryId) => {
  const categoryQuery = `SELECT * FROM ${tableNames.CATEGORY_TABLE} WHERE id = $1`;
  const dbresultsCategory = await pool.query(categoryQuery, [categoryId]);
  return dbresultsCategory.rows.length > 0 ? dbresultsCategory.rows[0] : null;
};

const categoryExists = async (categoryId) =>
  (await getCategory(categoryId)) === null ? false : true;

const getCategories = async (
  filterName,
  limit,
  offset,
  sortBy = "id",
  order = "ASC"
) => {
  let sortByMap = sortBy;
  switch (sortBy) {
    case "id":
      sortByMap = "id";
      break;
    case "categoryName":
      sortByMap = "name";
      break;
    case "engName":
      sortByMap = "eng_name";
      break;
    case "totalQuestions":
      sortByMap = "total_questions";
      break;
    default:
      sortByMap = "id";
      break;
  }
  let filterQuery = `SELECT c.*, COUNT(*) OVER() as total_count FROM ${tableNames.CATEGORY_TABLE} AS c `;
  if (filterName) {
    filterQuery += `WHERE name ILIKE '${filterName}%' OR eng_name ILIKE '${filterName}%' `;
  }
  filterQuery += ` ORDER BY ${sortByMap} ${order} LIMIT $1 OFFSET $2`;
  console.log(filterQuery);
  return await pool.query(filterQuery, [limit, offset]);
};

const getCategoryIdByName = async (name, engName) => {
  const categoryQuery = `SELECT * FROM ${tableNames.CATEGORY_TABLE} WHERE name = $1 OR eng_name = $2`;
  const dbresultsCategory = await pool.query(categoryQuery, [name, engName]);
  return dbresultsCategory.rows.length > 0
    ? dbresultsCategory.rows[0].id
    : null;
};

const createCategory = async (name, engName) => {
  const query = `INSERT INTO ${tableNames.CATEGORY_TABLE}
  (name, eng_name, total_questions) VALUES ($1, $2, $3)`;
  await pool.query(query, [name, engName, 0]);
};

const updateCategory = async (categoryId, name, engName) => {
  const query = `UPDATE ${tableNames.CATEGORY_TABLE} SET name=$2, eng_name=$3 WHERE id=$1`;
  await pool.query(query, [categoryId, name, engName]);
};

const updateTotalQuestionsForCategory = async (categoryId, increment = 1) => {
  const updateCategoryQuery = `UPDATE ${tableNames.CATEGORY_TABLE} 
  SET total_questions = total_questions + $2 
  WHERE id = $1`;
  await pool.query(updateCategoryQuery, [categoryId, increment]);
};

const deleteCategory = async (categoryId) => {
  const query = `DELETE FROM ${tableNames.CATEGORY_TABLE}  WHERE id=$1`;
  await pool.query(query, [categoryId]);
};

module.exports = {
  getCategory,
  getCategoryIdByName,
  categoryExists,
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  updateTotalQuestionsForCategory,
  totalCategoriesCount,
};
