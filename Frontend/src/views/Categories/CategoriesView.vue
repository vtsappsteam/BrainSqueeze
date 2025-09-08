<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import {
  getAllCategoriesWithDifficulties,
  deleteCategory,
} from "@/services/Categories/categories";
import CategoriesSubHeader from "@/views/Categories/components/CategoriesSubHeader.vue";
import CategoriesTable from "@/views/Categories/components/CategoriesTable.vue";

const categories = ref([]);
const limit = ref(100);
const page = ref(1);
const totalPages = ref(1);

const router = useRouter();

const fetchCategories = async () => {
  try {
    const response = await getAllCategoriesWithDifficulties({
      page: page.value,
      limit: limit.value,
    });
    categories.value = response.content;
    totalPages.value = response.totalPages;
  } catch (error) {
    console.error(error);
  }
};

const handleAddNewCategory = () => {
  router.push(`/category`);
};

const handleEditExistingCategory = (id) => {
  router.push({ path: "/category", query: { id } });
};

const handleDeleteExistingCategory = async (id) => {
  if (
    window.confirm("Da li ste sigurni da želite da obrišete ovu kategoriju?")
  ) {
    try {
      await deleteCategory(id);
      await fetchCategories();
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  }
};

const handleSearch = async (filterName, sortBy, order) => {
  try {
    const response = await getAllCategoriesWithDifficulties({
      page: page.value,
      limit: limit.value,
      filterName: filterName,
      sortBy: sortBy,
      order: order,
    });
    categories.value = response.content;
    totalPages.value = response.totalPages;
    filterName = "";
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  fetchCategories();
});
</script>

<template>
  <div>
    <CategoriesSubHeader @handle-add-new-category="handleAddNewCategory" />
  </div>
  <div>
    <CategoriesTable
      :categories="categories"
      @handle-edit-existing-category="handleEditExistingCategory"
      @handle-delete-existing-category="handleDeleteExistingCategory"
      @handle-search-category="handleSearch"
    />
  </div>
</template>
