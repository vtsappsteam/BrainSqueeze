const { convertKeys } = require("../helpers/helpers");
const {
  categoryExists,
  updateTotalQuestionsForCategory,
} = require("../services/categoryService");
const {
  questionDifficultyExists,
  updateTotalQuestionsForDifficulty,
} = require("../services/questionDifficultyService");
const {
  getQuestions,
  totalQuestionsCount,
  getQuestion,
  createQuestion,
  updateQuestion,
  questionExists,
  deleteQuestion,
  insertQuizResults,
  getSrbQuestions,
  getEngQuestions,
} = require("../services/questionService");

const getAllQuestionsEndpoint = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  try {
    const totalCountResult = await totalQuestionsCount();
    const totalCount = parseInt(totalCountResult.rows[0].count);
    const totalPages = Math.ceil(totalCount / limit);
    const questions = await getQuestions(limit, offset);
    const data = convertKeys(questions, "camel");

    res.status(200).json({
      page,
      limit,
      totalPages,
      totalQuestions: totalCount,
      content: data,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error while retreiving data!" });
  }
};

const getQuestionByIdEndpoint = async (req, res) => {
  try {
    const question = await getQuestion(req.params.id);
    if (!question) {
      res.status(404).json({
        error: "Question not found!",
      });
    }
    const data = convertKeys([question], "camel");
    res.status(200).json({ content: data[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error while retreiving data!" });
  }
};

const createQuestionEndpoint = async (req, res) => {
  const timesViewed = 0;
  const answeredCorrectly = 0;

  try {
    if (!(await categoryExists(req.body.categoryId))) {
      return res.status(400).json({ status: 400, error: "Category not found" });
    }
    if (!(await questionDifficultyExists(req.body.questionDifficultyId))) {
      return res
        .status(400)
        .json({ status: 400, error: "Question difficulty category not found" });
    }

    await updateTotalQuestionsForCategory(req.body.categoryId);
    await updateTotalQuestionsForDifficulty(req.body.questionDifficultyId);
    await createQuestion(
      req.body.question,
      req.body.correctAnswer,
      req.body.wrongAnswer1,
      req.body.wrongAnswer2,
      req.body.wrongAnswer3,
      req.body.engQuestion,
      req.body.engCorrectAnswer,
      req.body.engWrongAnswer1,
      req.body.engWrongAnswer2,
      req.body.engWrongAnswer3,
      req.body.categoryId,
      req.body.questionDifficultyId,
      timesViewed,
      answeredCorrectly
    );

    let apires = {
      status: 200,
      message: "Successfully created new Question.",
    };
    res.status(200).json(apires);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error while creating new Question!" });
  }
};

const updateQuestionEndpoint = async (req, res) => {
  try {
    if (!(await questionExists(req.params.id))) {
      return res.status(404).json({ status: 404, error: "Question not found" });
    }
    if (!(await categoryExists(req.body.categoryId))) {
      return res.status(400).json({ status: 400, error: "Category not found" });
    }
    if (!(await questionDifficultyExists(req.body.questionDifficultyId))) {
      return res
        .status(400)
        .json({ status: 400, error: "Question difficulty category not found" });
    }

    const values = [
      req.params.id,
      req.body.question,
      req.body.correctAnswer,
      req.body.wrongAnswer1,
      req.body.wrongAnswer2,
      req.body.wrongAnswer3,
      req.body.engQuestion,
      req.body.engCorrectAnswer,
      req.body.engWrongAnswer1,
      req.body.engWrongAnswer2,
      req.body.engWrongAnswer3,
      req.body.categoryId,
      req.body.questionDifficultyId,
    ];
    await updateQuestion(...values);
    let apires = {
      status: 200,
      message: "Successfully updated Question.",
    };
    res.status(200).json(apires);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error while updating Question!" });
  }
};

const deleteQuestionEndpoint = async (req, res) => {
  try {
    await deleteQuestion(req.params.id);
    let apires = {
      status: 200,
      message: "Successfully deleted Question.",
    };
    res.status(200).json(apires);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error while deleting Question!" });
  }
};

const insertQuizResultsEndpoint = async (req, res) => {
  try {
    const input = req.body;
    if (!Array.isArray(input)) {
      return res
        .status(400)
        .json({ error: "Request must contain an array of objects" });
    }

    const map = new Map();
    let i = 0;
    for (const { questionId, answeredCorrectly } of input) {
      if (!questionId || typeof answeredCorrectly !== "boolean") {
        return res.status(400).json({ error: `Invalid object at index ${i} ` });
      }
      if (!map.has(questionId)) {
        map.set(questionId, { timesViewed: 0, answeredCorrectly: 0 });
      }
      const entry = map.get(questionId);
      entry.answeredCorrectly += answeredCorrectly ? 1 : 0;
      entry.timesViewed += 1;
      i++;
    }

    for (const [key, value] of map) {
      await insertQuizResults(key, value.timesViewed, value.answeredCorrectly);
    }

    let apires = {
      status: 200,
      message: "Successfully inserted quiz results.",
    };
    res.status(200).json(apires);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error while inserting Quiz results!" });
  }
};

const getSrbQuestionsEndpoint = async (req, res) => {
  try {
    const totalCountResult = await totalQuestionsCount();
    const totalQuestions = parseInt(totalCountResult.rows[0].count);
    const questions = await getSrbQuestions();
    const data = convertKeys(questions, "camel");

    res.status(200).json({
      totalQuestions,
      content: data,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error while retreiving data!" });
  }
};

const getEngQuestionsEndpoint = async (req, res) => {
  try {
    const totalCountResult = await totalQuestionsCount();
    const totalQuestions = parseInt(totalCountResult.rows[0].count);
    const questions = await getEngQuestions();
    const data = convertKeys(questions, "camel");

    res.status(200).json({
      totalQuestions,
      content: data,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error while retreiving data!" });
  }
};

module.exports = {
  getAllQuestionsEndpoint,
  getQuestionByIdEndpoint,
  createQuestionEndpoint,
  updateQuestionEndpoint,
  deleteQuestionEndpoint,
  insertQuizResultsEndpoint,
  getSrbQuestionsEndpoint,
  getEngQuestionsEndpoint,
};
