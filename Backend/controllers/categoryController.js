const { convertKeys } = require("../helpers/helpers");
const {
  getCategories,
  getCategory,
  deleteCategory,
  updateCategory,
  createCategory,
  totalCategoriesCount,
} = require("../services/categoryService");
const {
  getDifficultiesByCategoryId,
} = require("../services/questionDifficultyService");

const getAllCategoriesEndpoint = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;
  try {
    const totalCountResult = await totalCategoriesCount();
    const totalCount = parseInt(totalCountResult.rows[0].count);
    const totalPages = Math.ceil(totalCount / limit);

    const categories = await getCategories(limit, offset);
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
  try {
    const totalCountResult = await totalCategoriesCount();
    const totalCount = parseInt(totalCountResult.rows[0].count);
    const totalPages = Math.ceil(totalCount / limit);

    const categories = await getCategories(limit, offset);
    const transformedData = [];

    for (const category of categories.rows) {
      const difficultyResults = await getDifficultiesByCategoryId(category.id);
      if (difficultyResults.rows.length !== 0) {
        console.log(difficultyResults.rows);
        const difficulties = [];
        difficultyResults.rows.forEach((difficulty) => {
          difficulties.push({
            id: difficulty.id,
            name: difficulty.name,
            totalQuestions: difficulty.total,
          });
        });
        transformedData.push({
          id: category.id,
          categoryName: category.name,
          difficulties,
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
    await createCategory(req.body.name);
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
    await updateCategory(req.params.id, req.body.name);
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
