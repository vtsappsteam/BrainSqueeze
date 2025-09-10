const pool = require("../db");
const { tableNames } = require("../db/tableNames");

const getQuestionDifficulties = async () => {
  const query = `SELECT * FROM ${tableNames.DIFFICULTY_TABLE} ORDER BY id`;
  return await pool.query(query);
};

const getQuestionDifficulty = async (questionDifficultyId) => {
  const questionDifficultyQuery = `SELECT * FROM ${tableNames.DIFFICULTY_TABLE} WHERE id = $1`;
  const dbresultsquestionDifficulty = await pool.query(
    questionDifficultyQuery,
    [questionDifficultyId]
  );
  return dbresultsquestionDifficulty.rows.length > 0
    ? dbresultsquestionDifficulty.rows[0]
    : null;
};

const getDifficultyIdByName = async (name, engName) => {
  const difficultyQuery = `SELECT * FROM ${tableNames.DIFFICULTY_TABLE} WHERE name = $1 OR eng_name = $2`;
  const dbresultsDifficulty = await pool.query(difficultyQuery, [
    name,
    engName,
  ]);
  return dbresultsDifficulty.rows.length > 0
    ? dbresultsDifficulty.rows[0].id
    : null;
};

const questionDifficultyExists = async (questionDifficultyId) =>
  (await getQuestionDifficulty(questionDifficultyId)) === null ? false : true;

const getDifficultiesByCategoryId = async (categoryId) => {
  const difficultyQuery = `
        SELECT d.id, d.name, COUNT(q.id) AS total 
        FROM ${tableNames.DIFFICULTY_TABLE} AS d, public.questions AS q
        WHERE q.difficulty_id = d.id AND q.category_id = $1
        GROUP BY d.id`;
  return await pool.query(difficultyQuery, [categoryId]);
};

const createQuestionDifficulty = async (
  name,
  engName,
  minThreshold,
  maxThreshold
) => {
  const query = `INSERT INTO ${tableNames.DIFFICULTY_TABLE} 
  (name, eng_name, min_threshold, max_threshold, total_questions) VALUES ($1, $2, $3, $4, $5)`;
  const values = [name, engName, minThreshold, maxThreshold, 0];
  await pool.query(query, values);
};

const updateQuestionDifficulty = async (
  questionDifficultyId,
  name,
  engName,
  minThreshold,
  maxThreshold
) => {
  const query = `UPDATE ${tableNames.DIFFICULTY_TABLE} 
  SET name=$2, eng_name=$3, min_threshold=$4, max_threshold=$5 WHERE id=$1`;
  const values = [
    questionDifficultyId,
    name,
    engName,
    minThreshold,
    maxThreshold,
  ];
  await pool.query(query, values);
};

const updateTotalQuestionsForDifficulty = async (
  questionDifficultyId,
  increment = 1
) => {
  const updateQuestionDifficultyQuery = `UPDATE ${tableNames.DIFFICULTY_TABLE}
  SET total_questions = total_questions + $2
  WHERE id = $1`;
  await pool.query(updateQuestionDifficultyQuery, [
    questionDifficultyId,
    increment,
  ]);
};

const deleteQuestionDifficulty = async (questionDifficultyId) => {
  const query = `DELETE FROM ${tableNames.DIFFICULTY_TABLE} WHERE id=$1`;
  await pool.query(query, [questionDifficultyId]);
};

module.exports = {
  getQuestionDifficulties,
  getQuestionDifficulty,
  getDifficultyIdByName,
  questionDifficultyExists,
  getDifficultiesByCategoryId,
  createQuestionDifficulty,
  updateQuestionDifficulty,
  deleteQuestionDifficulty,
  updateTotalQuestionsForDifficulty,
};
