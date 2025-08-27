<script setup>
import { useRoute, useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import QuestionDifficultySubHeader from "./components/QuestionDifficultySubHeader.vue";
import {
  createQuestionDifficulty,
  getQuestionDifficultyById,
  updateQuestionDifficulty,
} from "@/services/QuestionDifficulties/questionDifficulties";

const route = useRoute();
const router = useRouter();

const questionDifficultyNameInput = ref("");
const questionDifficultyMinThresholdInput = ref("");
const questionDifficultyMaxThresholdInput = ref("");

const fetchQuestionDifficulty = async (id) => {
  const response = await getQuestionDifficultyById(id);
  const data = response.content;
  questionDifficultyNameInput.value = data.name;
  questionDifficultyMinThresholdInput.value = data.minThreshold;
  questionDifficultyMaxThresholdInput.value = data.maxThreshold;
};

const handleSaveQuestionDifficulty = async () => {
  const payload = {
    name: questionDifficultyNameInput.value,
    minThreshold: questionDifficultyMinThresholdInput.value,
    maxThreshold: questionDifficultyMaxThresholdInput.value,
  };
  try {
    if (route.query.id) {
      await updateQuestionDifficulty(route.query.id, payload);
    } else {
      await createQuestionDifficulty(payload);
    }
    router.push("/question-difficulties");
  } catch (error) {
    console.error(error, payload);
  }
};

const handleGoBack = () => {
  router.push("/question-difficulties");
};

onMounted(() => {
  if (route.query.id) {
    fetchQuestionDifficulty(route.query.id);
  }
});
</script>

<template>
  <QuestionDifficultySubHeader
    @handle-save-question-difficulty="handleSaveQuestionDifficulty"
    @handle-go-back="handleGoBack"
  />
  <div>
    <div class="app">
      <div>
        <button>SRPSKI</button>
        <button>ENGLESKI</button>
      </div>
    </div>
    <div>
      <div>
        <div>
          <label for="questionDifficultyNameInput"> Težina pitanja </label>
          <input
            id="questionDifficultyNameInput"
            v-model="questionDifficultyNameInput"
            type="text"
            placeholder="Unesite naziv nove težine pitanja"
          />
        </div>
        <div>
          <label for="questionDifficultyMinThresholdInput">
            Minimalna granica težine pitanja
          </label>
          <input
            id="questionDifficultyMinThresholdInput"
            v-model="questionDifficultyMinThresholdInput"
            type="text"
            placeholder="Unesite minimalnu granicu težine pitanja"
          />
        </div>
        <div>
          <label for="questionDifficultyMaxThresholdInput">
            Maksimalna granica težine pitanja
          </label>
          <input
            id="questionDifficultyMaxThresholdInput"
            v-model="questionDifficultyMaxThresholdInput"
            type="text"
            placeholder="Unesite maksimalnu granicu težine pitanja"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
