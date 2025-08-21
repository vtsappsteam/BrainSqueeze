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

const categoryNameInput = ref("");

const fetchCategory = async (id) => {
  const response = await getCategoryById(id);
  const data = response.content;
  categoryNameInput.value = data.name;
  console.log(response);
};

const handleSaveCategory = async () => {
  const payload = {
    name: categoryNameInput.value,
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
          <label for="categoryNameInput"> Naziv kategorije </label>
          <input
            id="categoryNameInput"
            v-model="categoryNameInput"
            type="text"
            placeholder="Unesite naziv nove kategorije"
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
</style>
