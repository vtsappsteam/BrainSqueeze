const { convertKeys } = require("../helpers/helpers");
const ExcelJS = require("exceljs");
const path = require("path");
const fs = require("fs");
const { excelHeaders } = require("../helpers/excelHelper");

const {
  categoryExists,
  updateTotalQuestionsForCategory,
  getCategoryIdByName,
} = require("../services/categoryService");
const {
  questionDifficultyExists,
  updateTotalQuestionsForDifficulty,
  getDifficultyIdByName,
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
  bulkCreateQuestions,
  getRawQuestions,
} = require("../services/questionService");
const { questionSortKeys, allowedOrders } = require("../helpers/sortKeys");

const getAllQuestionsEndpoint = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;
  const sortBy = req.query.sortBy;
  const order = req.query.order || "asc";
  if (
    sortBy &&
    (!questionSortKeys.includes(sortBy) || !allowedOrders.includes(order))
  ) {
    return res.status(400).json({ error: "Invalid sort parameters!" });
  }
  try {
    const questions = await getQuestions(
      limit,
      offset,
      req.query,
      sortBy,
      order
    );
    const totalCount =
      questions.length > 0 ? parseInt(questions[0].total_count, 10) : 0;

    const totalPages = Math.ceil(totalCount / limit);
    console.log(req.query);
    const data = convertKeys(questions, "camel");

    res.json({
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
    const question = await getQuestion(req.params.id);
    if (!question) {
      return res.status(404).json({ status: 404, error: "Question not found" });
    }
    if (question.category_id) {
      await updateTotalQuestionsForCategory(question.category_id, -1);
    }
    if (question.difficulty_id) {
      await updateTotalQuestionsForDifficulty(question.difficulty_id, -1);
    }
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

const exportQuestionsEndpoint = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const questions = await getQuestions(limit, offset, req.query);

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Questions");

    worksheet.columns = [
      { header: "ID", key: "id", width: 7 },
      { header: "Question", key: "question", width: 30 },
      { header: "Correct answer", key: "correct_answer", width: 30 },
      { header: "Correct answer %", key: "correctAnswerPercent", width: 20 },
      { header: "Category", key: "category_name", width: 20 },
      { header: "Question difficulty", key: "difficulty_name", width: 20 },
      { header: "Wrong category", key: "wrongCategory", width: 17 },
    ];

    worksheet.getRow(1).eachCell((cell) => {
      cell.font = { bold: true, size: 12 };
      cell.alignment = { vertical: "middle", horizontal: "left" };
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFDDDDDD" },
      };
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
    });

    questions.forEach((item) => {
      const correctAnswerPercent = (
        item.times_viewed === "0"
          ? 0
          : (item.answered_correctly / item.times_viewed) * 100
      ).toFixed(2);
      console.log(item, correctAnswerPercent);
      worksheet.addRow({
        ...item,
        wrongCategory: item.wrongCategory ? "Yes" : "No",
        correctAnswerPercent: `${correctAnswerPercent}% (${item.answered_correctly}/${item.times_viewed})`,
      });
    });
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=Questions-${Date.now()}.xlsx`
    );

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error(error);
    res.status(500).send("Error exporting file");
  }
};

const exportRawEndpoint = async (req, res) => {
  try {
    const questions = await getRawQuestions(req.query);

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Questions");

    worksheet.columns = excelHeaders.map((x) => {
      return {
        header: x,
        key: x,
        width: 30,
      };
    });

    worksheet.getRow(1).eachCell((cell) => {
      cell.font = { bold: true, size: 12 };
      cell.alignment = { vertical: "middle", horizontal: "left" };
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFDDDDDD" },
      };
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
    });
    worksheet.addRows(questions);

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=Questions-${Date.now()}.xlsx`
    );

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error(error);
    res.status(500).send("Error exporting file");
  }
};

const importQuestionsEndpoint = async (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded");
  }

  try {
    const workbook = new ExcelJS.Workbook();
    const filePath = req.file.path;
    const ext = path.extname(filePath).toLowerCase();
    console.log(ext);
    if (ext === ".xlsx" || ext === ".xls") {
      await workbook.xlsx.readFile(filePath);
    } else if (ext === ".csv") {
      await workbook.csv.readFile(filePath);
    } else {
      fs.unlink(filePath, () => {});
      return res.status(400).json({
        message: "Invalid file format",
        expected: ".xlsx, .xls or .csv",
      });
    }

    const worksheet = workbook.worksheets[0];
    const rows = [];
    const notImportedRows = [];
    const categoriesMap = new Map();
    const difficultiesMap = new Map();

    const row = worksheet.getRow(1);
    const actualHeaders = row.values.slice(1).map((x) => String(x).trim());
    if (excelHeaders.join(",") !== actualHeaders.join(",")) {
      fs.unlink(filePath, () => {});
      return res.status(400).json({
        message: "Invalid columns format",
        expected: excelHeaders,
        received: actualHeaders,
      });
    }

    for (let i = 2; i <= worksheet.rowCount; i++) {
      const row = worksheet.getRow(i);
      const categoryName = row.getCell(6).value;
      const categoryEngName = row.getCell(7).value;
      const difficultyName = row.getCell(8).value;
      const difficultyEngName = row.getCell(9).value;
      const categoryId = await getCategoryIdByName(
        categoryName,
        categoryEngName
      );
      const questionDifficultyId = await getDifficultyIdByName(
        difficultyName,
        difficultyEngName
      );
      if (!categoryId || !questionDifficultyId) {
        notImportedRows.push(i);
        continue;
      }

      if (!categoriesMap.has(categoryId)) {
        categoriesMap.set(categoryId, { totalQuestions: 0 });
      }
      const categoryEntry = categoriesMap.get(categoryId);
      categoryEntry.totalQuestions += 1;

      if (!difficultiesMap.has(questionDifficultyId)) {
        difficultiesMap.set(questionDifficultyId, { totalQuestions: 0 });
      }
      const difficultyEntry = difficultiesMap.get(questionDifficultyId);
      difficultyEntry.totalQuestions += 1;

      const newQuestion = [
        ...row.values.slice(1, 6),
        ...row.values.slice(10),
        categoryId,
        questionDifficultyId,
        0,
        0,
      ];
      rows.push(newQuestion);
    }
    await bulkCreateQuestions(rows);

    for (const [key, value] of categoriesMap) {
      await updateTotalQuestionsForCategory(key, value.totalQuestions);
    }
    for (const [key, value] of difficultiesMap) {
      await updateTotalQuestionsForDifficulty(key, value.totalQuestions);
    }

    fs.unlink(filePath, () => {});
    res.json({
      message: "File imported successfully",
      data: rows,
      notImportedRows: notImportedRows,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error processing file");
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
  exportQuestionsEndpoint,
  exportRawEndpoint,
  importQuestionsEndpoint,
};
