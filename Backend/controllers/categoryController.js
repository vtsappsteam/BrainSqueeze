const { convertKeys } = require("../helpers/helpers");
const { categorySortKeys, allowedOrders } = require("../helpers/sortKeys");
const {
  getCategories,
  getCategory,
  deleteCategory,
  updateCategory,
  createCategory,
} = require("../services/categoryService");
const {
  getDifficultiesByCategoryId,
} = require("../services/questionDifficultyService");

const getAllCategoriesEndpoint = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;
  const filterName = req.query.filterName || null;
  const sortBy = "name";
  const order = "asc";

  try {
    console.log(sortBy, order);
    const categories = await getCategories(
      filterName,
      limit,
      offset,
      sortBy,
      order
    );
    const totalCount =
      categories.rows.length > 0 ? parseInt(categories.rows[0].total_count) : 0;
    const totalPages = Math.ceil(totalCount / limit);
    const data = convertKeys(categories.rows, "camel");

    res.json({
      page,
      limit,
      totalPages,
      totalCategories: totalCount,
      content: data,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error while retreiving data!" });
  }
};

const getAllCategoriesWithDifficultiesEndpoint = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;
  const filterName = req.query.filterName || null;
  const sortBy = req.query.sortBy;
  const order = req.query.order || "asc";
  if (
    sortBy &&
    (!categorySortKeys.includes(sortBy) || !allowedOrders.includes(order))
  ) {
    return res.status(400).json({ error: "Invalid sort parameters!" });
  }
  try {
    const categories = await getCategories(
      filterName,
      limit,
      offset,
      sortBy,
      order
    );
    const totalCount =
      categories.rows.length > 0 ? parseInt(categories.rows[0].total_count) : 0;
    const totalPages = Math.ceil(totalCount / limit);
    const transformedData = [];

    for (const category of categories.rows) {
      const difficultyResults = await getDifficultiesByCategoryId(category.id);

      transformedData.push({
        id: category.id,
        categoryName: category.name,
        totalQuestions: category.total_questions,
        totalQuestionsEasy:
          difficultyResults.rows?.find((x) => x.id === "1")?.total ?? "0",
        totalQuestionsMedium:
          difficultyResults.rows?.find((x) => x.id === "2")?.total ?? "0",
        totalQuestionsHard:
          difficultyResults.rows?.find((x) => x.id === "3")?.total ?? "0",
      });

      if (sortBy === "totalQuestionsEasy") {
        transformedData.sort((a, b) => {
          if (order === "asc") {
            return a.totalQuestionsEasy - b.totalQuestionsEasy;
          } else {
            return b.totalQuestionsEasy - a.totalQuestionsEasy;
          }
        });
      }
      if (sortBy === "totalQuestionsMedium") {
        transformedData.sort((a, b) => {
          if (order === "asc") {
            return a.totalQuestionsMedium - b.totalQuestionsMedium;
          } else {
            return b.totalQuestionsMedium - a.totalQuestionsMedium;
          }
        });
      }
      if (sortBy === "totalQuestionsHard") {
        transformedData.sort((a, b) => {
          if (order === "asc") {
            return a.totalQuestionsHard - b.totalQuestionsHard;
          } else {
            return b.totalQuestionsHard - a.totalQuestionsHard;
          }
        });
      }
    }

    res.json({
      page,
      limit,
      totalPages,
      totalCategories: totalCount,
      content: transformedData,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error while retrieving data!" });
  }
};

const getCategoryByIdEndpoint = async (req, res) => {
  try {
    const category = await getCategory(req.params.id);
    if (!category) {
      res.status(404).json({
        error: "Category not found!",
      });
    }
    const data = convertKeys([category], "camel");

    res.json({
      content: data[0],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error while retreiving data!" });
  }
};

const createCategoryEndpoint = async (req, res) => {
  try {
    await createCategory(req.body.name, req.body.engName);
    let apires = {
      status: 200,
      message: "Successfully created Category.",
    };
    res.status(200).json(apires);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error while creating category!" });
  }
};

const deleteCategoryEndpoint = async (req, res) => {
  try {
    await deleteCategory(req.params.id);
    let apires = {
      status: 200,
      message: "Successfully deleted Category.",
    };
    res.status(200).json(apires);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error while deleting category!" });
  }
};

const updateCategoryEndpoint = async (req, res) => {
  try {
    await updateCategory(req.params.id, req.body.name, req.body.engName);
    let apires = {
      status: 200,
      message: "Successfully updated Category.",
    };
    res.status(200).json(apires);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error while updating category!" });
  }
};

module.exports = {
  getAllCategoriesEndpoint,
  getAllCategoriesWithDifficultiesEndpoint,
  getCategoryByIdEndpoint,
  createCategoryEndpoint,
  deleteCategoryEndpoint,
  updateCategoryEndpoint,
};
