<script setup>
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import {
  getAllQuestionDifficulties,
  deleteQuestionDifficulty,
} from "@/services/QuestionDifficulties/questionDifficulties";
import QuestionDifficultiesSubHeader from "@/views/QuestionDifficulties/components/QuestionDifficultiesSubHeader.vue";
import QuestionDifficultiesTable from "@/views/QuestionDifficulties/components/QuestionDifficultiesTable.vue";

const route = useRouter();

const questionDifficulties = ref([]);

const fetchQuestionDifficulties = async () => {
  try {
    const response = await getAllQuestionDifficulties({});
    questionDifficulties.value = response.content;
  } catch (error) {
    console.error(error);
  }
};

const handleAddNewQuestionDifficulty = () => {
  route.push("/question-difficulty");
};

const handleEditExistingQuestionDifficulty = (id) => {
  route.push({ path: "/question-difficulty", query: { id } });
};

const handleDeleteExistingQuestionDifficulty = async (id) => {
  if (
    window.confirm(
      "Da li ste sigurni da želite da obrišete ovu težinu pitanja?"
    )
  ) {
    try {
      await deleteQuestionDifficulty(id);
      console.log(`Delete question difficulty with id: ${id}`);
      await fetchQuestionDifficulties();
    } catch (error) {
      console.error("Error deleting question difficulty:", error);
    }
  }
};

onMounted(() => {
  fetchQuestionDifficulties();
});
</script>

<template>
  <div>
    <QuestionDifficultiesSubHeader
      @handle-add-new-question-difficulty="handleAddNewQuestionDifficulty"
    />
    <QuestionDifficultiesTable
      :questionDifficulties="questionDifficulties"
      @handle-edit-existing-question-difficulty="
        handleEditExistingQuestionDifficulty
      "
      @handle-delete-existing-question-difficulty="
        handleDeleteExistingQuestionDifficulty
      "
    />
  </div>
</template>

<style scoped></style>
