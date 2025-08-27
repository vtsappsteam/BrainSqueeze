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

const quillRef = ref(null);

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
  console.log(questionModel.value);
  const response = await getQuestionById(id);
  const data = response.content;
  question.value = data.question || "";
  correctAnswerInput.value = data.correctAnswer;
  wrongAnswer1Input.value = data.wrongAnswer1;
  wrongAnswer2Input.value = data.wrongAnswer2;
  wrongAnswer3Input.value = data.wrongAnswer3;
  selectedCategory.value = data.categoryId;
  selectedDifficulty.value = data.difficultyId;
  engQuestion.value = data.engQuestion || "";
  engCorrectAnswerInput.value = data.engCorrectAnswer;
  engWrongAnswer1Input.value = data.engWrongAnswer1;
  engWrongAnswer2Input.value = data.engWrongAnswer2;
  engWrongAnswer3Input.value = data.engWrongAnswer3;
};

const handleSaveQuestion = async () => {
  const payload = {
    categoryId: selectedCategory.value,
    questionDifficultyId: selectedDifficulty.value,
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
    console.error(error, payload);
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
  <div>
    <div>
      <button
        id="srbButton"
        :class="{ active: selectedLanguage === 'sr' }"
        @click="selectedLanguage = 'sr'"
      >
        SRPSKI
      </button>
      <button
        id="engButton"
        :class="{ active: selectedLanguage === 'en' }"
        @click="selectedLanguage = 'en'"
      >
        ENGLESKI
      </button>
    </div>
    <label :for="selectedLanguage === 'sr' ? 'question' : 'engQuestion'">
      {{ selectedLanguage === "sr" ? "Pitanje" : "Question" }}
    </label>

    <div id="serbianDropdownForm" v-if="selectedLanguage === 'sr'" class="app">
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
    <div id="englishDropdownForm" v-if="selectedLanguage === 'en'" class="app">
      <div>
        <label for="category">Category</label>
        <select id="category" :value="selectedCategory" disabled>
          <option v-if="selectedCategory" :value="selectedCategory">
            {{
              categories.find((cat) => cat.id === selectedCategory)?.engName ||
              ""
            }}
          </option>
        </select>
      </div>
      <div>
        <label for="difficulty">Difficulty</label>
        <select id="difficulty" :value="selectedDifficulty" disabled>
          <option v-if="selectedDifficulty" :value="selectedDifficulty">
            {{
              difficulties.find((diff) => diff.id === selectedDifficulty)
                ?.engName || ""
            }}
          </option>
        </select>
      </div>
    </div>
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
    <div>
      <div id="serbianForm" v-if="selectedLanguage === 'sr'" class="app">
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
    </div>
    <div id="englishForm" v-if="selectedLanguage === 'en'" class="app">
      <div>
        <div>
          <label for="engCorrectAnswerInput"> Correct answer </label>
          <input
            id="engCorrectAnswerInput"
            v-model="engCorrectAnswerInput"
            type="text"
            class="engCorrectAnswerInput"
            placeholder="Enter correct answer"
          />
        </div>

        <div>
          <label for="engWrongAnswer1Input"> Wrong answer 1 </label>
          <input
            id="engWrongAnswer1Input"
            v-model="engWrongAnswer1Input"
            type="text"
            class="engWrongAnswer1Input"
            placeholder="Enter wrong answer 1"
          />
        </div>
      </div>

      <div>
        <div>
          <label for="engWrongAnswer2Input"> Wrong answer 2 </label>
          <input
            id="engWrongAnswer2Input"
            v-model="engWrongAnswer2Input"
            type="text"
            class="engWrongAnswer2Input"
            placeholder="Enter wrong answer 2"
          />
        </div>

        <div>
          <label for="engWrongAnswer3Input"> Wrong answer 3 </label>
          <input
            id="engWrongAnswer3Input"
            v-model="engWrongAnswer3Input"
            type="text"
            class="engWrongAnswer3Input"
            placeholder="Enter wrong answer 3"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.active {
  background: #1976d2;
  color: #fff;
}
</style>
