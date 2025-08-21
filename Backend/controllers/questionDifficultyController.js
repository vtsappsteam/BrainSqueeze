const { convertKeys } = require("../helpers/helpers");
const {
  getQuestionDifficulties,
  getQuestionDifficulty,
  createQuestionDifficulty,
  updateQuestionDifficulty,
  deleteQuestionDifficulty,
} = require("../services/questionDifficultyService");

const getAllQuestionDifficultiesEndpoint = async (req, res) => {
  try {
    const difficulties = await getQuestionDifficulties();
    const data = convertKeys(difficulties.rows, "camel");

    res.json({
      content: data,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error while retreiving data!" });
  }
};

const getQuestionDifficultyByIdEndpoint = async (req, res) => {
  try {
    const difficulty = await getQuestionDifficulty(req.params.id);
    if (!difficulty) {
      res.status(404).json({
        error: "Question difficulty not found!",
      });
    }
    const data = convertKeys([difficulty], "camel");

    res.json({
      content: data[0],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error while retreiving data!" });
  }
};

const createQuestionDifficultyEndpoint = async (req, res) => {
  try {
    await createQuestionDifficulty(
      req.body.name,
      req.body.engName,
      req.body.minThreshold,
      req.body.maxThreshold
    );

    let apires = {
      status: 200,
      message: "Successfully created new Question difficulty category.",
    };
    res.status(200).json(apires);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Error while creating new Question difficulty category!",
    });
  }
};

const updateQuestionDifficultyEndpoint = async (req, res) => {
  try {
    await updateQuestionDifficulty(
      req.params.id,
      req.body.name,
      req.body.engName,
      req.body.minThreshold,
      req.body.maxThreshold
    );

    let apires = {
      status: 200,
      message: "Successfully updated Question difficulty category.",
    };
    res.status(200).json(apires);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Error while updating Question difficulty category!" });
  }
};

const deleteQuestionDifficultyEndpoint = async (req, res) => {
  try {
    await deleteQuestionDifficulty(req.params.id);
    let apires = {
      status: 200,
      message: "Successfully deleted Question difficulty category.",
    };
    res.status(200).json(apires);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Error while deleting Question difficulty category!" });
  }
};

module.exports = {
  getAllQuestionDifficultiesEndpoint,
  getQuestionDifficultyByIdEndpoint,
  createQuestionDifficultyEndpoint,
  updateQuestionDifficultyEndpoint,
  deleteQuestionDifficultyEndpoint,
};
