<script setup>
import ImportIcon from "@/assets/icons/import.svg";
import ExportIcon from "@/assets/icons/export.svg";
import PlusIcon from "@/assets/icons/plus.svg";
import { importQuestions } from "@/services/Questions/questions";
import { ref } from "vue";

const importFileInput = ref(null);

const onFileSelected = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append("file", file);
  try {
    await importQuestions(formData);
  } catch (error) {
    console.error("Error importing questions:", error);
  }
};

const emit = defineEmits([
  "handle-add-new-question",
  "handle-export-questions",
]);

const handleAddNewQuestion = () => {
  emit("handle-add-new-question", "");
};

const handleImportQuestions = () => {
  importFileInput.value.click();
};

const handleExportQuestions = () => {
  emit("handle-export-questions");
};
</script>

<template>
  <div class="page-subheader">
    <input
      type="file"
      ref="importFileInput"
      accept=".xlsx,.xls,.csv"
      style="display: none"
      @change="onFileSelected"
    />
    <button class="page-subheader__btn-import" @click="handleImportQuestions">
      Import<ImportIcon class="btn-icon" />
    </button>
    <button class="page-subheader__btn-export" @click="handleExportQuestions">
      Export<ExportIcon class="btn-icon" />
    </button>
    <button class="page-subheader__btn-add" @click="handleAddNewQuestion">
      Novo pitanje <PlusIcon class="btn-icon" />
    </button>
  </div>
</template>
