<script setup>
import { useRoute, useRouter } from "vue-router";
import QuestionSubHeader from "./components/QuestionSubHeader.vue";
import { ref, onMounted, computed } from "vue";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import { getAllCategories } from "@/services/Categories/categories";
import { getAllQuestionDifficulties } from "@/services/QuestionDifficulties/questionDifficulties";
import {
  createQuestion,
  getQuestionById,
  updateQuestion,
} from "../../services/Questions/questions";
import Vue3Select from "vue3-select";
import "vue3-select/dist/vue3-select.css";

const route = useRoute();
const router = useRouter();

const selectedLanguage = ref("sr");

const categories = ref([]);
const difficulties = ref([]);
const selectedCategory = ref();
const selectedDifficulty = ref();

const question = ref("");
const correctAnswerInput = ref("");
const wrongAnswer1Input = ref("");
const wrongAnswer2Input = ref("");
const wrongAnswer3Input = ref("");

const engQuestion = ref("");
const engCorrectAnswerInput = ref("");
const engWrongAnswer1Input = ref("");
const engWrongAnswer2Input = ref("");
const engWrongAnswer3Input = ref("");

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

const fetchQuestion = async (id) => {
  const response = await getQuestionById(id);
  const data = response.content;
  question.value = data.question || "";
  correctAnswerInput.value = data.correctAnswer;
  wrongAnswer1Input.value = data.wrongAnswer1;
  wrongAnswer2Input.value = data.wrongAnswer2;
  wrongAnswer3Input.value = data.wrongAnswer3;
  selectedCategory.value =
    categories.value.find((cat) => cat.id === data.categoryId) || null;
  selectedDifficulty.value =
    difficulties.value.find((diff) => diff.id === data.difficultyId) || null;
  engQuestion.value = data.engQuestion || "";
  engCorrectAnswerInput.value = data.engCorrectAnswer;
  engWrongAnswer1Input.value = data.engWrongAnswer1;
  engWrongAnswer2Input.value = data.engWrongAnswer2;
  engWrongAnswer3Input.value = data.engWrongAnswer3;
};

const handleSaveQuestion = async () => {
  if (!selectedCategory.value || !selectedDifficulty.value) {
    alert("Morate izabrati kategoriju i težinu pitanja.");
    return;
  }
  const payload = {
    categoryId: selectedCategory.value.id,
    questionDifficultyId: selectedDifficulty.value.id,
    question: question.value,
    correctAnswer: correctAnswerInput.value,
    wrongAnswer1: wrongAnswer1Input.value,
    wrongAnswer2: wrongAnswer2Input.value,
    wrongAnswer3: wrongAnswer3Input.value,
    engQuestion: engQuestion.value,
    engCorrectAnswer: engCorrectAnswerInput.value,
    engWrongAnswer1: engWrongAnswer1Input.value,
    engWrongAnswer2: engWrongAnswer2Input.value,
    engWrongAnswer3: engWrongAnswer3Input.value,
  };
  try {
    if (route.query.id) {
      await updateQuestion(route.query.id, payload);
    } else {
      await createQuestion(payload);
    }
    router.push("/questions");
  } catch (error) {
    alert(
      error.response?.data?.error || error.message || "Došlo je do greške."
    );
  }
};

const handleGoBack = () => {
  router.push("/questions");
};

const questionModel = computed({
  get: () =>
    selectedLanguage.value === "sr" ? question.value : engQuestion.value,
  set: (val) => {
    if (selectedLanguage.value === "sr") {
      question.value = val;
    } else {
      engQuestion.value = val;
    }
  },
});

onMounted(() => {
  fetchCategories();
  fetchQuestionDifficulties();
  if (route.query.id) {
    fetchQuestion(route.query.id);
  }
});
</script>

<template>
  <QuestionSubHeader
    @handle-save-question="handleSaveQuestion"
    @handle-go-back="handleGoBack"
  />
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
    <div class="input-form">
      <div
        id="serbianDropdownForm"
        v-if="selectedLanguage === 'sr'"
        class="select-row"
      >
        <div>
          <label for="category">Kategorija</label>
          <Vue3Select
            id="category"
            v-model="selectedCategory"
            :options="categories"
            label="name"
            value-by="id"
            placeholder="Kategorija"
            class="category-select"
          />
        </div>
        <div>
          <label for="difficulty">Težina</label>
          <Vue3Select
            id="difficulty"
            v-model="selectedDifficulty"
            :options="difficulties"
            label="name"
            value-by="id"
            placeholder="Težina"
            class="difficulty-select"
          />
        </div>
      </div>
      <div
        id="englishDropdownForm"
        v-if="selectedLanguage === 'en'"
        class="select-row"
      >
        <div>
          <label for="category">Category</label>
          <Vue3Select
            id="category"
            v-model="selectedCategory"
            :options="categories"
            :get-option-label="(option) => option.engName"
            :get-option-value="(option) => option.id"
            placeholder="Category"
            :disabled="true"
            class="category-select"
          />
        </div>
        <div>
          <label for="difficulty">Difficulty</label>
          <Vue3Select
            id="difficulty"
            v-model="selectedDifficulty"
            :options="difficulties"
            :get-option-label="(option) => option.engName"
            :get-option-value="(option) => option.id"
            placeholder="Difficulty"
            :disabled="true"
            class="difficulty-select"
          />
        </div>
      </div>
      <label :for="selectedLanguage === 'sr' ? 'question' : 'engQuestion'">
        {{ selectedLanguage === "sr" ? "Pitanje" : "Question" }}
      </label>
      <div>
        <QuillEditor
          v-model:content="questionModel"
          content-type="html"
          :key="selectedLanguage"
          :toolbar="[
            ['bold', 'italic'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link'],
          ]"
          :placeholder="
            selectedLanguage === 'sr'
              ? 'Unesite vaše pitanje...'
              : 'Enter the question...'
          "
          style="height: 150px"
        />
      </div>
      <div id="serbianForm" v-if="selectedLanguage === 'sr'" class="app">
        <div class="inputs-row">
          <div class="form-group">
            <label for="correctAnswerInput"
              ><span>✅</span> Tačan odgovor
            </label>
            <input
              id="correctAnswerInput"
              v-model="correctAnswerInput"
              type="text"
              placeholder="Unesite tačan odgovor"
            />
          </div>
          <div class="form-group">
            <label for="wrongAnswer1Input">
              <span>❌</span> Netačan odgovor 1
            </label>
            <input
              id="wrongAnswer1Input"
              v-model="wrongAnswer1Input"
              type="text"
              placeholder="Unesite netačan odgovor 1"
            />
          </div>
        </div>

        <div class="inputs-row">
          <div class="form-group">
            <label for="wrongAnswer2Input">
              <span>❌</span> Netačan odgovor 2
            </label>
            <input
              id="wrongAnswer2Input"
              v-model="wrongAnswer2Input"
              type="text"
              placeholder="Unesite netačan odgovor 2"
            />
          </div>
          <div class="form-group">
            <label for="wrongAnswer3Input">
              <span>❌</span> Netačan odgovor 3
            </label>
            <input
              id="wrongAnswer3Input"
              v-model="wrongAnswer3Input"
              type="text"
              placeholder="Unesite netačan odgovor 3"
            />
          </div>
        </div>
      </div>
      <div id="englishForm" v-if="selectedLanguage === 'en'" class="app">
        <div class="inputs-row">
          <div class="form-group">
            <label for="engCorrectAnswerInput">
              <span>✅</span> Correct answer
            </label>
            <input
              id="engCorrectAnswerInput"
              v-model="engCorrectAnswerInput"
              type="text"
              placeholder="Enter correct answer"
            />
          </div>

          <div class="form-group">
            <label for="engWrongAnswer1Input">
              <span>❌</span> Wrong answer 1
            </label>
            <input
              id="engWrongAnswer1Input"
              v-model="engWrongAnswer1Input"
              type="text"
              placeholder="Enter wrong answer 1"
            />
          </div>
        </div>

        <div class="inputs-row">
          <div class="form-group">
            <label for="engWrongAnswer2Input"
              ><span>❌</span> Wrong answer 2
            </label>
            <input
              id="engWrongAnswer2Input"
              v-model="engWrongAnswer2Input"
              type="text"
              placeholder="Enter wrong answer 2"
            />
          </div>

          <div class="form-group">
            <label for="engWrongAnswer3Input"
              ><span>❌</span> Wrong answer 3
            </label>
            <input
              id="engWrongAnswer3Input"
              v-model="engWrongAnswer3Input"
              type="text"
              placeholder="Enter wrong answer 3"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.active {
  background: #1976d2;
  font-weight: bold;
  font-family: "DMSans", sans-serif;
  background-color: #fff;
  color: #2c9dff;
  border: none;
  letter-spacing: -0.32px;
}

.select-row {
  display: flex;
  gap: 13px;
  padding: 14px 0;
  justify-content: flex-start;
  width: 100%;
}
</style>
