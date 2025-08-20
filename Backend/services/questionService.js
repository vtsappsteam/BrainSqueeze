const pool = require("../db");
const { tableNames } = require("../db/tableNames");

const totalQuestionsCount = async () => {
  return await pool.query(`SELECT COUNT(*) FROM ${tableNames.QUESTION_TABLE}`);
};

const getQuestions = async (limit, offset) => {
  return await pool.query(
    `SELECT q.id, question, correct_answer, times_viewed, answered_correctly, c.name as category_name, qd.name as difficulty_name
        FROM ${tableNames.QUESTION_TABLE} AS q, ${tableNames.CATEGORY_TABLE} AS c, ${tableNames.DIFFICULTY_TABLE} AS qd
        WHERE q.category_id = c.id AND q.difficulty_id = qd.id
        ORDER BY id LIMIT $1 OFFSET $2`,
    [limit, offset]
  );
};

const getQuestion = async (questionId) => {
  const query = `SELECT * FROM ${tableNames.QUESTION_TABLE} WHERE id = $1`;
  const dbresults = await pool.query(query, [questionId]);
  return dbresults.rows.length > 0 ? dbresults.rows[0] : null;
};

const questionExists = async (questionId) =>
  (await getQuestion(questionId)) === null ? false : true;

const createQuestion = async (
  question,
  correctAnswer,
  wrongAnswer1,
  wrongAnswer2,
  wrongAnswer3,
  categoryId,
  difficultyId,
  timesViewed = 0,
  answeredCorrectly = 0
) => {
  const query = `INSERT INTO ${tableNames.QUESTION_TABLE}
    (question, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, category_id, difficulty_id, times_viewed, answered_correctly)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`;

  const values = [
    question,
    correctAnswer,
    wrongAnswer1,
    wrongAnswer2,
    wrongAnswer3,
    categoryId,
    difficultyId,
    timesViewed,
    answeredCorrectly,
  ];

  await pool.query(query, values);
};

const updateQuestion = async (
  questionId,
  question,
  correctAnswer,
  wrongAnswer1,
  wrongAnswer2,
  wrongAnswer3,
  categoryId,
  difficultyId
) => {
  const query = `UPDATE ${tableNames.QUESTION_TABLE} 
    SET question = $2, 
        correct_answer = $3, 
        wrong_answer_1 = $4, 
        wrong_answer_2 = $5, 
        wrong_answer_3 = $6, 
        category_id = $7, 
        difficulty_id = $8 
    WHERE id = $1`;

  const values = [
    questionId,
    question,
    correctAnswer,
    wrongAnswer1,
    wrongAnswer2,
    wrongAnswer3,
    categoryId,
    difficultyId,
  ];

  await pool.query(query, values);
};

const deleteQuestion = async (questionId) => {
  const query = `DELETE FROM ${tableNames.QUESTION_TABLE} WHERE id = $1`;
  await pool.query(query, [questionId]);
};

const insertQuizResults = async (
  questionId,
  timesViewed,
  answeredCorrectly
) => {
  const query = `UPDATE ${tableNames.QUESTION_TABLE} 
        SET times_viewed = times_viewed + $2, answered_correctly = answered_correctly + $3 WHERE id = $1`;
  await pool.query(query, [questionId, timesViewed, answeredCorrectly]);
};

module.exports = {
  totalQuestionsCount,
  getQuestions,
  getQuestion,
  questionExists,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  insertQuizResults,
};
