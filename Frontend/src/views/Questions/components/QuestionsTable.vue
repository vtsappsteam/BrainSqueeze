<script setup>
import { ref, onMounted } from "vue";
import EditIcon from "@/assets/icons/edit.svg";
import DeleteIcon from "@/assets/icons/delete.svg";
import ResetIcon from "@/assets/icons/reset.svg";
import { getAllCategories } from "@/services/Categories/categories";
import { getAllQuestionDifficulties } from "@/services/QuestionDifficulties/questionDifficulties";
import Vue3Select from "vue3-select";
import "vue3-select/dist/vue3-select.css";

const filterName = ref("");
const filterCategory = ref("");
const filterDifficulty = ref("");
const categories = ref([]);
const difficulties = ref([]);
const filterTimesViewedMin = ref("");
const filterTimesViewedMax = ref("");
const filterPercentAnsweredCorrectlyMin = ref("");
const filterPercentAnsweredCorrectlyMax = ref("");
const sortBy = ref("id");

const sortOrders = ref({
  id: "desc",
  timesViewed: "asc",
  percentCorrect: "asc",
  categoryName: "asc",
  difficultyName: "asc",
});

const props = defineProps({
  questions: {
    type: Array,
    required: true,
  },
  page: {
    type: Number,
    required: true,
  },
  totalPages: {
    type: Number,
    required: true,
  },
});

const sort = (column) => {
  sortOrders.value[column] =
    sortOrders.value[column] === "asc" ? "desc" : "asc";
  sortBy.value = column;
  handleFilter();
};

const fetchCategories = async () => {
  try {
    const response = await getAllCategories({
      page: 0,
      limit: 100,
    });
    categories.value = response.content;
  } catch (error) {
    console.error(error);
  }
};

const fetchQuestionDifficulties = async () => {
  try {
    const response = await getAllQuestionDifficulties({
      page: 0,
      limit: 100,
    });
    difficulties.value = response.content;
  } catch (error) {
    console.error(error);
  }
};

const goToPage = (p) => {
  if (p >= 1 && p <= props.totalPages) {
    emit("go-to-page", p);
  }
};

const emit = defineEmits([
  "handle-edit-existing-question",
  "handle-delete-existing-question",
  "handle-filter-question",
  "go-to-page",
]);

const handleEditExistingQuestion = (id) => {
  emit("handle-edit-existing-question", id);
};

const handleDeleteExistingQuestion = (id) => {
  emit("handle-delete-existing-question", id);
};

const handleFilter = async () => {
  emit(
    "handle-filter-question",
    filterName.value,
    filterCategory.value && filterCategory.value.id
      ? filterCategory.value.id
      : "",
    filterDifficulty.value && filterDifficulty.value.id
      ? filterDifficulty.value.id
      : "",
    filterTimesViewedMin.value,
    filterTimesViewedMax.value,
    filterPercentAnsweredCorrectlyMin.value,
    filterPercentAnsweredCorrectlyMax.value,
    sortBy.value,
    sortOrders.value[sortBy.value]
  );
};

const resetAllFilters = () => {
  filterName.value = "";
  filterCategory.value = "";
  filterDifficulty.value = "";
  filterTimesViewedMin.value = "";
  filterTimesViewedMax.value = "";
  filterPercentAnsweredCorrectlyMin.value = "";
  filterPercentAnsweredCorrectlyMax.value = "";
  handleFilter();
};

onMounted(() => {
  fetchCategories();
  fetchQuestionDifficulties();
});
</script>

<template>
  <div class="section-container">
    <div class="table-container">
      <div class="section-header">
        <input
          class="search-input"
          type="text"
          placeholder="Pretraži po nazivu"
          v-model="filterName"
          @keyup.enter="handleFilter"
        />
        <Vue3Select
          v-model="filterDifficulty"
          :get-option-label="(option) => option.name"
          :get-option-value="(option) => option.id"
          :options="difficulties"
          placeholder="Težina"
        />
        <Vue3Select
          v-model="filterCategory"
          :get-option-label="(option) => option.name"
          :get-option-value="(option) => option.id"
          :options="categories"
          placeholder="Kategorije"
        />
        <input
          class="number-input"
          type="number"
          v-model="filterTimesViewedMin"
          placeholder="Min br. prikaza"
        />
        <input
          class="number-input"
          type="number"
          v-model="filterTimesViewedMax"
          placeholder="Max br. prikaza"
        />
        <input
          class="percentage-input"
          type="number"
          v-model="filterPercentAnsweredCorrectlyMin"
          placeholder="Min %"
          min="0"
          max="100"
        />
        <input
          class="percentage-input"
          type="number"
          v-model="filterPercentAnsweredCorrectlyMax"
          placeholder="Max %"
          min="0"
          max="100"
        />

        <button class="search-btn" @click="handleFilter">
          Primeni filtere
        </button>
        <button
          class="reset-all-filters-btn"
          @click="resetAllFilters"
          type="button"
        >
          <ResetIcon />
        </button>
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
            <th>Pitanje</th>
            <th>Tačan odgovor</th>
            <th @click="sort('timesViewed')">
              Br. prikazivanja
              <span class="sort-icon">
                <span v-if="sortOrders.timesViewed === 'asc'">▲</span>
                <span v-else>▼</span>
              </span>
            </th>
            <th @click="sort('percentCorrect')">
              Tačni odgovori (%)
              <span class="sort-icon">
                <span v-if="sortOrders.percentCorrect === 'asc'">▲</span>
                <span v-else>▼</span>
              </span>
            </th>
            <th @click="sort('difficultyName')">
              Težina
              <span class="sort-icon">
                <span v-if="sortOrders.difficultyName === 'asc'">▲</span>
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
            <th>Odstupanje</th>
            <th>Akcije</th>
          </tr>
        </thead>
        <tbody class="questions-table-body">
          <tr v-for="question in questions" :key="question.id">
            <td>{{ question.id }}</td>
            <td v-html="question.question"></td>
            <td>{{ question.correctAnswer }}</td>
            <td>{{ question.timesViewed }}</td>
            <td>
              {{
                question.timesViewed > 0
                  ? Math.round(
                      (question.answeredCorrectly / question.timesViewed) * 100
                    )
                  : "0"
              }}
              ({{ question.answeredCorrectly }}/{{ question.timesViewed }})
            </td>
            <td class="difficulty-cell">
              <span
                class="dot"
                :class="{
                  'dot-green': question.difficultyName === 'Lako',
                  'dot-yellow': question.difficultyName === 'Srednje',
                  'dot-red': question.difficultyName === 'Teško',
                }"
              ></span>
              {{ question.difficultyName }}
            </td>
            <td>{{ question.categoryName }}</td>
            <td class="wrong-category-cell">
              <span v-if="question.wrongCategory === true">❗</span>
            </td>
            <td class="actions-cell">
              <div class="actions-container">
                <button
                  type="button"
                  class="actions-container__btn-edit"
                  @click="handleEditExistingQuestion(question.id)"
                >
                  <EditIcon />
                </button>
                <button
                  class="actions-container__btn-delete"
                  @click="handleDeleteExistingQuestion(question.id)"
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

input::placeholder {
  color: #132038;
}
</style>
