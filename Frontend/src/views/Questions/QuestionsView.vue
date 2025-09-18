<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import {
  getAllQuestions,
  deleteQuestion,
  exportQuestions,
} from "@/services/Questions/questions";
import QuestionsSubHeader from "./components/QuestionsSubHeader.vue";
import QuestionsTable from "./components/QuestionsTable.vue";

const questions = ref([]);
const question = ref("");
const limit = ref(100);
const page = ref(1);
const totalPages = ref(1);
const router = useRouter();
const filterCategory = ref("");
const filterDifficulty = ref("");
const filterTimesViewedMin = ref("");
const filterTimesViewedMax = ref("");
const filterPercentAnsweredCorrectlyMin = ref("");
const filterPercentAnsweredCorrectlyMax = ref("");
const showConfirmModal = ref(false);
const confirmMessage = ref("");
const onConfirmDelete = ref(() => {});

const fetchQuestions = async () => {
  try {
    const response = await getAllQuestions({
      page: page.value,
      limit: limit.value,
      sortBy: "id",
      order: "desc",
    });
    questions.value = response.content;
    totalPages.value = response.totalPages;
  } catch (error) {
    console.error(error);
  }
};

const goToPage = (p) => {
  if (p >= 1 && p <= totalPages.value) {
    page.value = p;
    fetchQuestions();
  }
};

const handleAddNewQuestion = () => {
  router.push(`/question`);
};

const handleEditExistingQuestion = (id) => {
  router.push({ path: "/question", query: { id } });
};

const handleDeleteExistingQuestion = async (id) => {
  confirmMessage.value = "Da li ste sigurni da želite da obrišete korisnika?";
  showConfirmModal.value = true;
  onConfirmDelete.value = async () => {
    showConfirmModal.value = false;
    try {
      await deleteQuestion(id);
      await fetchQuestions();
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };
};

const handleFilter = async (
  filterName,
  filterCategoryParam,
  filterDifficultyParam,
  filterTimesViewedMinParam,
  filterTimesViewedMaxParam,
  filterPercentAnsweredCorrectlyMinParam,
  filterPercentAnsweredCorrectlyMaxParam,
  sortBy,
  order
) => {
  try {
    question.value = filterName;
    filterCategory.value = filterCategoryParam;
    filterDifficulty.value = filterDifficultyParam;
    filterTimesViewedMin.value = filterTimesViewedMinParam;
    filterTimesViewedMax.value = filterTimesViewedMaxParam;
    filterPercentAnsweredCorrectlyMin.value =
      filterPercentAnsweredCorrectlyMinParam;
    filterPercentAnsweredCorrectlyMax.value =
      filterPercentAnsweredCorrectlyMaxParam;
    const response = await getAllQuestions({
      page: page.value,
      limit: limit.value,
      question: filterName,
      categoryId: filterCategoryParam,
      difficultyId: filterDifficultyParam,
      timesViewedMin: filterTimesViewedMinParam,
      timesViewedMax: filterTimesViewedMaxParam,
      percentAnsweredCorrectlyMin: filterPercentAnsweredCorrectlyMinParam,
      percentAnsweredCorrectlyMax: filterPercentAnsweredCorrectlyMaxParam,
      sortBy: sortBy,
      order: order,
    });
    questions.value = response.content;
    totalPages.value = response.totalPages;
  } catch (error) {
    console.error(error);
  }
};

const handleExportQuestions = async () => {
  try {
    const response = await exportQuestions({
      question: question.value,
      categoryId: filterCategory.value,
      difficultyId: filterDifficulty.value,
      timesViewedMin: filterTimesViewedMin.value,
      timesViewedMax: filterTimesViewedMax.value,
      percentAnsweredCorrectlyMin: filterPercentAnsweredCorrectlyMin.value,
      percentAnsweredCorrectlyMax: filterPercentAnsweredCorrectlyMax.value,
    });
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const filename = `questionsExport_${timestamp}.xlsx`;
    const url = window.URL.createObjectURL(new Blob([response]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error exporting questions:", error);
  }
};

onMounted(() => {
  fetchQuestions();
});
</script>

<template>
  <div>
    <QuestionsSubHeader
      @handle-add-new-question="handleAddNewQuestion"
      @handle-export-questions="handleExportQuestions"
    />
    <QuestionsTable
      :questions="questions"
      :page="page"
      :totalPages="totalPages"
      @go-to-page="goToPage"
      @handle-edit-existing-question="handleEditExistingQuestion"
      @handle-delete-existing-question="handleDeleteExistingQuestion"
      @handle-filter-question="handleFilter"
    />
  </div>
  <div v-if="showConfirmModal" class="modal">
    <div class="modal-content">
      <p>{{ confirmMessage }}</p>
      <button class="modal-button" @click="onConfirmDelete">Potvrdi</button>
      <button
        class="modal-button-cancel"
        style="background: #ccc; color: #333"
        @click="showConfirmModal = false"
      >
        Otkaži
      </button>
    </div>
  </div>
</template>

<style scoped></style>
