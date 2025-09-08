<script setup>
import { ref } from "vue";
import EditIcon from "@/assets/icons/edit.svg";
import DeleteIcon from "@/assets/icons/delete.svg";

const limit = ref(100);
const page = ref(1);
const totalPages = ref(1);
const sortBy = ref("id");
const filterName = ref("");

const sortOrders = ref({
  id: "asc",
  categoryName: "asc",
  totalQuestions: "asc",
  totalQuestionsEasy: "asc",
  totalQuestionsMedium: "asc",
  totalQuestionsHard: "asc",
});

const props = defineProps({
  categories: {
    type: Array,
    required: true,
  },
});

const sort = (column) => {
  sortOrders.value[column] =
    sortOrders.value[column] === "asc" ? "desc" : "asc";
  sortBy.value = column;
  handleSearch();
};

const goToPage = (p) => {
  if (p >= 1 && p <= props.totalPages) {
    emit("go-to-page", p);
  }
};

const emit = defineEmits([
  "handle-edit-existing-category",
  "handle-delete-existing-category",
  "handle-search-category",
]);

const handleEditExistingCategory = (id) => {
  emit("handle-edit-existing-category", id);
};

const handleDeleteExistingCategory = (id) => {
  emit("handle-delete-existing-category", id);
};

const handleSearch = () => {
  emit(
    "handle-search-category",
    filterName.value,
    sortBy.value,
    sortOrders.value[sortBy.value]
  );
};
</script>

<template>
  <div class="section-container">
    <div class="table-container">
      <div class="section-header">
        <input
          class="search-input"
          type="text"
          placeholder="Pretraži kategoriju"
          v-model="filterName"
          @keyup.enter="handleSearch"
        />
        <button class="search-btn" @click="handleSearch">Pretraži</button>
      </div>
      <table class="section-table">
        <thead>
          <tr>
            <th @click="sort('id')">
              Br.
              <span class="sort-icon">
                <span v-if="sortOrders.id === 'asc'">▲</span>
                <span v-else>▼</span>
              </span>
            </th>
            <th @click="sort('categoryName')">
              Kategorija
              <span class="sort-icon">
                <span v-if="sortOrders.categoryName === 'asc'">▲</span>
                <span v-else>▼</span>
              </span>
            </th>
            <th @click="sort('totalQuestions')">
              <span class="dot dot-blue"></span>Ukupan br. pitanja
              <span class="sort-icon">
                <span v-if="sortOrders.totalQuestions === 'asc'">▲</span>
                <span v-else>▼</span>
              </span>
            </th>
            <th @click="sort('totalQuestionsEasy')">
              <span class="dot dot-green"></span>Br. lakih pitanja
              <span class="sort-icon">
                <span v-if="sortOrders.totalQuestionsEasy === 'asc'">▲</span>
                <span v-else>▼</span>
              </span>
            </th>
            <th @click="sort('totalQuestionsMedium')">
              <span class="dot dot-yellow"></span>Br. srednjih pitanja
              <span class="sort-icon">
                <span v-if="sortOrders.totalQuestionsMedium === 'asc'">▲</span>
                <span v-else>▼</span>
              </span>
            </th>
            <th @click="sort('totalQuestionsHard')">
              <span class="dot dot-red"></span>Br. teških pitanja
              <span class="sort-icon">
                <span v-if="sortOrders.totalQuestionsHard === 'asc'">▲</span>
                <span v-else>▼</span>
              </span>
            </th>
            <th>Akcije</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="category in categories" :key="category.id">
            <td>{{ category.id }}</td>
            <td>{{ category.categoryName }}</td>
            <td>{{ category.totalQuestions }}</td>
            <td>{{ category.totalQuestionsEasy }}</td>
            <td>{{ category.totalQuestionsMedium }}</td>
            <td>{{ category.totalQuestionsHard }}</td>
            <td class="actions-cell">
              <div class="actions-container">
                <button
                  type="button"
                  class="actions-container__btn-edit"
                  @click="handleEditExistingCategory(category.id)"
                >
                  <EditIcon />
                </button>
                <button
                  class="actions-container__btn-delete"
                  @click="handleDeleteExistingCategory(category.id)"
                >
                  <DeleteIcon />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
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
  </div>
</template>
<style scoped>
.table-container {
  max-height: 620px;
  overflow-y: auto;
}
.section-table {
  width: 100%;
  border-collapse: collapse;
}

.section-table td {
  padding: 0.75rem 1rem;
  text-align: left;
  border: 1px solid #e9ecef;
}

.section-table td.wrong-category-cell {
  text-align: center;
}

.wrong-category-cell span {
  font-size: 25px;
}

.section-table thead th {
  position: sticky;
  top: 0;
  background: #f6f7fa;
  font-weight: bold;
  z-index: 2;
  border: #e9ecef 1px solid;
  text-align: left;
  padding: 0.75rem 1rem;
  white-space: nowrap;
}

.difficulty-cell {
  min-width: 110px;
}

.actions-cell {
  width: 105px;
}
</style>
