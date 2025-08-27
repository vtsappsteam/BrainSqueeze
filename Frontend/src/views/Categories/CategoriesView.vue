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

const goToPage = (p) => {
  if (p >= 1 && p <= totalPages.value) {
    page.value = p;
    fetchCategories();
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
      console.log(`Delete category with id: ${id}`);
      await fetchCategories();
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  }
};

onMounted(() => {
  fetchCategories();
});
</script>

<template>
  <div>
    <CategoriesSubHeader @handle-add-new-category="handleAddNewCategory" />
    <CategoriesTable
      :categories="categories"
      @handle-edit-existing-category="handleEditExistingCategory"
      @handle-delete-existing-category="handleDeleteExistingCategory"
    />
  </div>
  <div class="pagination">
    <button
      class="pagination-btn"
      :disabled="page === 1"
      @click="goToPage(page - 1)"
    >
      &laquo;
    </button>
    <button
      v-for="p in totalPages"
      :key="p"
      class="pagination-btn"
      :class="{ active: page === p }"
      @click="goToPage(p)"
    >
      {{ p }}
    </button>
    <button
      class="pagination-btn"
      :disabled="page === totalPages"
      @click="goToPage(page + 1)"
    >
      &raquo;
    </button>
  </div>
</template>

<style scoped>
.pagination {
  display: flex;
  gap: 8px;
  justify-content: center;
  margin: 2rem 0;
}
.pagination-btn {
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 1rem;
  min-width: 40px;
  transition: background 0.2s;
}
.pagination-btn.active {
  background: #e6eeef;
  font-weight: bold;
  color: #1a2a32;
  border-color: #e6eeef;
}
.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
