const categorySortKeys = [
  "id",
  "categoryName",
  "engName",
  "totalQuestions",
  "totalQuestionsEasy",
  "totalQuestionsMedium",
  "totalQuestionsHard",
];

const questionSortKeys = [
  "id",
  "timesViewed",
  "percentCorrect",
  "categoryName",
  "difficultyName",
];

const userSortKeys = ["id", "firstName", "lastName", "email"];

const allowedOrders = ["asc", "desc"];

module.exports = {
  categorySortKeys,
  questionSortKeys,
  userSortKeys,
  allowedOrders,
};
