<script setup>
import { useRoute, useRouter } from "vue-router";
import QuestionSubHeader from "./components/QuestionSubHeader.vue";
import { ref, onMounted } from "vue";
import { getAllCategories } from "@/services/Categories/categories";
import { getAllQuestionDifficulties } from "@/services/QuestionDifficulties/questionDifficulties";
import {
  createQuestion,
  getQuestionById,
  updateQuestion,
} from "../../services/Questions/questions";

const route = useRoute();
const router = useRouter();

const categories = ref([]);
const difficulties = ref([]);
const selectedCategory = ref();
const selectedDifficulty = ref();
const question = ref();
const correctAnswerInput = ref("");
const wrongAnswer1Input = ref("");
const wrongAnswer2Input = ref("");
const wrongAnswer3Input = ref("");

const fetchCategories = async () => {
  try {
    const response = await getAllCategories({
      page: 0,
      limit: 100,
    });
    categories.value = response.content;
    console.log(response);
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
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};

const fetchQuestion = async (id) => {
  const response = await getQuestionById(id);
  const data = response.content;
  question.value = data.question;
  correctAnswerInput.value = data.correctAnswer;
  wrongAnswer1Input.value = data.wrongAnswer1;
  wrongAnswer2Input.value = data.wrongAnswer2;
  wrongAnswer3Input.value = data.wrongAnswer3;
  selectedCategory.value = data.categoryId;
  selectedDifficulty.value = data.difficultyId;
  console.log(response);
};

const handleSaveQuestion = async () => {
  const payload = {
    question: question.value,
    correctAnswer: correctAnswerInput.value,
    wrongAnswer1: wrongAnswer1Input.value,
    wrongAnswer2: wrongAnswer2Input.value,
    wrongAnswer3: wrongAnswer3Input.value,
    categoryId: selectedCategory.value,
    questionDifficultyId: selectedDifficulty.value,
  };
  try {
    if (route.query.id) {
      await updateQuestion(route.query.id, payload);
    } else {
      await createQuestion(payload);
    }
    router.push("/questions");
  } catch (error) {
    console.error(error, payload);
  }
};

const handleGoBack = () => {
  router.push("/questions");
};

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
  <div>
    <div class="app">
      <div>
        <button>SRPSKI</button>
        <button>ENGLESKI</button>
      </div>

      <div>
        <label for="category">Kategorija</label>
        <select id="category" v-model="selectedCategory">
          <option
            v-for="category in categories"
            :key="category.id"
            :value="category.id"
          >
            {{ category.name }}
          </option>
        </select>
      </div>
      <div>
        <label for="difficulty">Težina</label>
        <select id="difficulty" v-model="selectedDifficulty">
          <option
            v-for="difficulty in difficulties"
            :key="difficulty.id"
            :value="difficulty.id"
          >
            {{ difficulty.name }}
          </option>
        </select>
      </div>
    </div>
    <label for="question">Pitanje</label>
    <textarea
      id="question"
      v-model="question"
      placeholder="Unesite vaše pitanje..."
    ></textarea>
    <div>
      <div>
        <div>
          <label for="correctAnswerInput"> Tačan odgovor </label>
          <input
            id="correctAnswerInput"
            v-model="correctAnswerInput"
            type="text"
            class="correctAnswerInput"
            placeholder="Unesite tačan odgovor"
          />
        </div>

        <div>
          <label for="wrongAnswer1Input"> Netačan odgovor 1 </label>
          <input
            id="wrongAnswer1Input"
            v-model="wrongAnswer1Input"
            type="text"
            class="wrongAnswer1Input"
            placeholder="Unesite netačan odgovor 1"
          />
        </div>
      </div>

      <div>
        <div>
          <label for="wrongAnswer2Input"> Netačan odgovor 2 </label>
          <input
            id="wrongAnswer2Input"
            v-model="wrongAnswer2Input"
            type="text"
            class="wrongAnswer2Input"
            placeholder="Unesite netačan odgovor 2"
          />
        </div>

        <div>
          <label for="wrongAnswer3Input"> Netačan odgovor 3 </label>
          <input
            id="wrongAnswer3Input"
            v-model="wrongAnswer3Input"
            type="text"
            class="wrongAnswer3Input"
            placeholder="Unesite netačan odgovor 3"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.app {
  font: DM Sans 14pt;
}
.textarea {
  width: 100%;
  height: 60px;
}
</style>
