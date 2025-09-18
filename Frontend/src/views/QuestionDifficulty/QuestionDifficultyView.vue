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
const selectedLanguage = ref("sr");

const questionDifficultyNameInput = ref("");
const engQuestionDifficultyNameInput = ref("");
const questionDifficultyMinThresholdInput = ref("");
const questionDifficultyMaxThresholdInput = ref("");

const errorMessage = ref("");
const showErrorModal = ref(false);

const fetchQuestionDifficulty = async (id) => {
  const response = await getQuestionDifficultyById(id);
  const data = response.content;
  questionDifficultyNameInput.value = data.name;
  engQuestionDifficultyNameInput.value = data.engName;
  questionDifficultyMinThresholdInput.value = data.minThreshold;
  questionDifficultyMaxThresholdInput.value = data.maxThreshold;
};

const handleSaveQuestionDifficulty = async () => {
  if (
    !questionDifficultyNameInput.value ||
    !engQuestionDifficultyNameInput.value ||
    !questionDifficultyMinThresholdInput.value ||
    !questionDifficultyMaxThresholdInput.value
  ) {
    errorMessage.value = "Sva polja su obavezna!";
    showErrorModal.value = true;
    return;
  }
  const payload = {
    name: questionDifficultyNameInput.value,
    engName: engQuestionDifficultyNameInput.value,
    minThreshold: questionDifficultyMinThresholdInput.value,
    maxThreshold: questionDifficultyMaxThresholdInput.value,
  };
  try {
    if (route.query.id) {
      await updateQuestionDifficulty(route.query.id, payload);
    } else {
      await createQuestionDifficulty(payload);
    }
    router.push("/difficulties");
  } catch (error) {
    console.error(error, payload);
  }
};

const handleGoBack = () => {
  router.push("/difficulties");
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
    <div class="language-buttons-bar">
      <p
        :class="{ active: selectedLanguage === 'sr' }"
        @click="selectedLanguage = 'sr'"
      >
        SRPSKI
      </p>
      <p
        :class="{ active: selectedLanguage === 'en' }"
        @click="selectedLanguage = 'en'"
      >
        ENGLESKI
      </p>
    </div>
    <div class="section-container">
      <div id="serbianForm" v-if="selectedLanguage === 'sr'">
        <div>
          <label for="questionDifficultyNameInput"> Težina pitanja </label>
          <input
            class="disabled"
            id="questionDifficultyNameInput"
            v-model="questionDifficultyNameInput"
            type="text"
            disabled
          />
        </div>
        <div>
          <label for="questionDifficultyMinThresholdInput">
            Minimalna granica težine pitanja
          </label>
          <input
            id="questionDifficultyMinThresholdInput"
            v-model="questionDifficultyMinThresholdInput"
            type="number"
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
            type="number"
            placeholder="Unesite maksimalnu granicu težine pitanja"
          />
        </div>
      </div>
      <div id="englishForm" v-if="selectedLanguage === 'en'">
        <div>
          <label for="questionDifficultyNameInput"> Question Difficulty </label>
          <input
            class="disabled"
            id="questionDifficultyNameInput"
            v-model="engQuestionDifficultyNameInput"
            type="text"
            disabled
          />
        </div>
        <div>
          <label for="questionDifficultyMinThresholdInput">
            Minimum threshold
          </label>
          <input
            id="questionDifficultyMinThresholdInput"
            v-model="questionDifficultyMinThresholdInput"
            type="number"
            placeholder="Unesite minimalnu granicu težine pitanja"
          />
        </div>
        <div>
          <label for="questionDifficultyMaxThresholdInput">
            Maximum threshold
          </label>
          <input
            id="questionDifficultyMaxThresholdInput"
            v-model="questionDifficultyMaxThresholdInput"
            type="number"
            placeholder="Unesite maksimalnu granicu težine pitanja"
          />
        </div>
      </div>
    </div>
  </div>
  <div v-if="showErrorModal" class="modal">
    <div class="modal-content">
      <p>{{ errorMessage }}</p>
      <button class="modal-button" @click="showErrorModal = false">
        Zatvori
      </button>
    </div>
  </div>
</template>

<style>
input {
  width: 300px;
  padding: 10px;
  margin: 5px 0;
  box-sizing: border-box;
  border-radius: 0px;
}

.disabled {
  color: #9e9e9e;
  background-color: #f6f7fa;
  cursor: not-allowed;
}

.active {
  background: #1976d2;
  font-weight: bold;
  font-family: "DMSans", sans-serif;
  background-color: #fff;
  color: #2c9dff;
  border: none;
  letter-spacing: -0.32px;
}
</style>
