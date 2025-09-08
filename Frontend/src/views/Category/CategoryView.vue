<script setup>
import { useRoute, useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import CategorySubHeader from "./components/CategorySubHeader.vue";
import {
  createCategory,
  updateCategory,
  getCategoryById,
} from "@/services/Categories/categories";

const route = useRoute();
const router = useRouter();

const selectedLanguage = ref("sr");

const categoryNameInput = ref("");
const categoryEngNameInput = ref("");

const fetchCategory = async (id) => {
  const response = await getCategoryById(id);
  const data = response.content;
  categoryNameInput.value = data.name;
  categoryEngNameInput.value = data.engName;
};

const handleSaveCategory = async () => {
  if (!categoryNameInput.value || !categoryEngNameInput.value) {
    alert("Morate popuniti sva polja.");
    return;
  }
  const payload = {
    name: categoryNameInput.value,
    engName: categoryEngNameInput.value,
  };
  try {
    if (route.query.id) {
      await updateCategory(route.query.id, payload);
    } else {
      await createCategory(payload);
    }
    router.push("/categories");
  } catch (error) {
    console.error(error, payload);
  }
};

const handleGoBack = () => {
  router.push("/categories");
};

onMounted(() => {
  if (route.query.id) {
    fetchCategory(route.query.id);
  }
});
</script>

<template>
  <CategorySubHeader
    @handle-save-category="handleSaveCategory"
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
    <div id="serbianCategoryNameForm" v-if="selectedLanguage === 'sr'">
      <div class="inputs-row">
        <div class="form-group">
          <label for="categoryNameInput"> Naziv kategorije </label>
          <input
            class="input-category"
            id="categoryNameInput"
            v-model="categoryNameInput"
            type="text"
            placeholder="Unesite novu kategoriju"
          />
        </div>
      </div>
    </div>
    <div id="engCategoryNameForm" v-if="selectedLanguage === 'en'">
      <div class="inputs-row">
        <div class="form-group">
          <label for="categoryEngNameInput"> Category name </label>
          <input
            class="input-category"
            id="categoryEngNameInput"
            v-model="categoryEngNameInput"
            type="text"
            placeholder="Enter new category"
          />
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

.input-category {
  width: 250px;
}
</style>
