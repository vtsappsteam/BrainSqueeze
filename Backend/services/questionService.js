const pool = require("../db");
const { tableNames } = require("../db/tableNames");
const format = require("pg-format");

const totalQuestionsCount = async () => {
  return await pool.query(`SELECT COUNT(*) FROM ${tableNames.QUESTION_TABLE}`);
};

const addFilters = (filters) => {
  let filterQuery = "";
  if (filters) {
    if (filters.categoryId) {
      filterQuery += ` AND q.category_id = ${filters.categoryId} `;
    }
    if (filters.difficultyId) {
      filterQuery += ` AND q.difficulty_id = ${filters.difficultyId} `;
    }
    if (filters.question) {
      filterQuery += ` AND (q.question ILIKE '%${filters.question}%' OR q.eng_question ILIKE '%${filters.question}%') `;
    }
    if (filters.timesViewedMin || filters.timesViewedMax) {
      const min = filters.timesViewedMin ? filters.timesViewedMin : 0;
      const max = filters.timesViewedMax ? filters.timesViewedMax : 1000000;
      filterQuery += ` AND q.times_viewed >= ${min} AND q.times_viewed <= ${max} `;
    }
    if (
      filters.percentAnsweredCorrectlyMin ||
      filters.percentAnsweredCorrectlyMax
    ) {
      const min = filters.percentAnsweredCorrectlyMin
        ? filters.percentAnsweredCorrectlyMin
        : 0;
      const max = filters.percentAnsweredCorrectlyMax
        ? filters.percentAnsweredCorrectlyMax
        : 100;
      filterQuery += ` AND (CASE WHEN q.times_viewed = 0 THEN 0 ELSE (q.answered_correctly::float / q.times_viewed::float) * 100 END) >= ${min} AND (CASE WHEN q.times_viewed = 0 THEN 0 ELSE (q.answered_correctly::float / q.times_viewed::float) * 100 END) <= ${max} `;
    }
  }
  return filterQuery;
};

const calculateWrongCategory = (
  answeredCorrectly,
  timesViewed,
  minThreshold,
  maxThreshold
) => {
  const threshold = Math.round(
    (parseInt(answeredCorrectly) / parseInt(timesViewed)) * 100
  );

  return (
    threshold < parseInt(minThreshold) * 0.8 ||
    threshold > parseInt(maxThreshold) * 1.2
  );
};

const getRawQuestions = async (filters) => {
  let filterQuery = `SELECT 
  question,
  correct_answer, 
  wrong_answer_1,
  wrong_answer_2,
  wrong_answer_3,
  c.name as category_name,
  c.eng_name as category_eng_name,
  qd.name as difficulty_name,
  qd.eng_name as difficulty_eng_name,
  eng_question,
  eng_correct_answer,
  eng_wrong_answer_1,
  eng_wrong_answer_2,
  eng_wrong_answer_3
  FROM ${tableNames.QUESTION_TABLE} AS q, ${tableNames.CATEGORY_TABLE} AS c, ${tableNames.DIFFICULTY_TABLE} AS qd
  WHERE q.category_id = c.id AND q.difficulty_id = qd.id`;

  filterQuery += addFilters(filters);
  filterQuery += ` ORDER BY q.created_at DESC`;
  const questions = await pool.query(filterQuery);
  return questions.rows;
};

const getQuestions = async (
  limit,
  offset,
  filters,
  sortBy = "created_at",
  order = "desc"
) => {
  let filterQuery = `SELECT q.id, question, correct_answer, times_viewed, answered_correctly, c.name as category_name, qd.name AS difficulty_name, qd.min_threshold, qd.max_threshold, COUNT(*) OVER() as total_count
  FROM ${tableNames.QUESTION_TABLE} AS q, ${tableNames.CATEGORY_TABLE} AS c, ${tableNames.DIFFICULTY_TABLE} AS qd
  WHERE q.category_id = c.id AND q.difficulty_id = qd.id`;

  let sortByMap = sortBy;
  switch (sortBy) {
    case "id":
      sortByMap = "q.id";
      break;
    case "categoryName":
      sortByMap = "c.name";
      break;
    case "difficultyName":
      sortByMap = "qd.name";
      break;
    case "percentCorrect":
      sortByMap =
        "(CASE WHEN q.times_viewed = 0 THEN 0 ELSE (q.answered_correctly::float / q.times_viewed::float) END)";
      break;
    case "timesViewed":
      sortByMap = "q.times_viewed";
      break;
    default:
      sortByMap = "q.created_at";
      break;
  }
  filterQuery += addFilters(filters);
  filterQuery += ` ORDER BY ${sortByMap} ${order} LIMIT $1 OFFSET $2`;
  console.log(filterQuery);
  const questions = await pool.query(filterQuery, [limit, offset]);
  const rows = questions.rows.map((row) => {
    return {
      ...row,
      wrongCategory: calculateWrongCategory(
        row.answered_correctly,
        row.times_viewed,
        row.min_threshold,
        row.max_threshold
      ),
    };
  });
  return rows;
};

const getSrbQuestions = async () => {
  const questions = await pool.query(
    `SELECT q.id, question, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, c.name as category_name, qd.name AS difficulty_name
        FROM ${tableNames.QUESTION_TABLE} AS q, ${tableNames.CATEGORY_TABLE} AS c, ${tableNames.DIFFICULTY_TABLE} AS qd
        WHERE q.category_id = c.id AND q.difficulty_id = qd.id
        ORDER BY created_at`
  );
  return questions.rows;
};

const getEngQuestions = async () => {
  const questions = await pool.query(
    `SELECT q.id, eng_question, eng_correct_answer, eng_wrong_answer_1, eng_wrong_answer_2, eng_wrong_answer_3, c.eng_name as category_name, qd.eng_name AS difficulty_name
        FROM ${tableNames.QUESTION_TABLE} AS q, ${tableNames.CATEGORY_TABLE} AS c, ${tableNames.DIFFICULTY_TABLE} AS qd
        WHERE q.category_id = c.id AND q.difficulty_id = qd.id
        ORDER BY created_at`
  );
  return questions.rows;
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
  engQuestion,
  engCorrectAnswer,
  engWrongAnswer1,
  engWrongAnswer2,
  engWrongAnswer3,
  categoryId,
  difficultyId,
  timesViewed = 0,
  answeredCorrectly = 0
) => {
  const query = `INSERT INTO ${tableNames.QUESTION_TABLE}
    (question, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3,
    eng_question, eng_correct_answer, eng_wrong_answer_1, eng_wrong_answer_2, eng_wrong_answer_3,
       category_id, difficulty_id, times_viewed, answered_correctly, created_at)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)`;

  const values = [
    question,
    correctAnswer,
    wrongAnswer1,
    wrongAnswer2,
    wrongAnswer3,
    engQuestion,
    engCorrectAnswer,
    engWrongAnswer1,
    engWrongAnswer2,
    engWrongAnswer3,
    categoryId,
    difficultyId,
    timesViewed,
    answeredCorrectly,
    new Date().toISOString(),
  ];

  await pool.query(query, values);
};

const bulkCreateQuestions = async (questions) => {
  const query = format(
    `INSERT INTO ${tableNames.QUESTION_TABLE}
    (question, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3,
    eng_question, eng_correct_answer, eng_wrong_answer_1, eng_wrong_answer_2, eng_wrong_answer_3,
       category_id, difficulty_id, times_viewed, answered_correctly)
    VALUES %L`,
    questions
  );
  await pool.query(query);
};

const updateQuestion = async (
  questionId,
  question,
  correctAnswer,
  wrongAnswer1,
  wrongAnswer2,
  wrongAnswer3,
  engQuestion,
  engCorrectAnswer,
  engWrongAnswer1,
  engWrongAnswer2,
  engWrongAnswer3,
  categoryId,
  difficultyId
) => {
  const query = `UPDATE ${tableNames.QUESTION_TABLE} 
    SET question = $2, 
        correct_answer = $3, 
        wrong_answer_1 = $4, 
        wrong_answer_2 = $5, 
        wrong_answer_3 = $6, 
        eng_question = $7,
        eng_correct_answer = $8,
        eng_wrong_answer_1 = $9,
        eng_wrong_answer_2 = $10,
        eng_wrong_answer_3 = $11,
        category_id = $12, 
        difficulty_id = $13 
    WHERE id = $1`;

  const values = [
    questionId,
    question,
    correctAnswer,
    wrongAnswer1,
    wrongAnswer2,
    wrongAnswer3,
    engQuestion,
    engCorrectAnswer,
    engWrongAnswer1,
    engWrongAnswer2,
    engWrongAnswer3,
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
  getSrbQuestions,
  getEngQuestions,
  bulkCreateQuestions,
  getRawQuestions,
};
