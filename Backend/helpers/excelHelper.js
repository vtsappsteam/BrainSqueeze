const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const excelHeaders = [
  "question",
  "correct_answer",
  "wrong_answer_1",
  "wrong_answer_2",
  "wrong_answer_3",
  "category_name",
  "category_eng_name",
  "difficulty_name",
  "difficulty_eng_name",
  "eng_question",
  "eng_correct_answer",
  "eng_wrong_answer_1",
  "eng_wrong_answer_2",
  "eng_wrong_answer_3",
];

const upload = multer({ storage });
module.exports = { upload, excelHeaders };
