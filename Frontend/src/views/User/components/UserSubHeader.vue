<script setup>
import BackIcon from "@/assets/icons/arrow_back.svg";
import SaveIcon from "@/assets/icons/save.svg";

const emit = defineEmits(["handle-save-user", "handle-go-back"]);

const handleSaveUser = () => {
  emit("handle-save-user");
};

const handleGoBack = () => {
  emit("handle-go-back");
};
</script>

<template>
  <div class="page-subheader justify-between">
    <button class="page-subheader__btn-back" @click="handleGoBack">
      <BackIcon class="btn-icon" />
    </button>
    <button class="page-subheader__btn-save" @click="handleSaveUser">
      Sačuvaj izmene
      <SaveIcon class="btn-icon" />
    </button>
  </div>
</template>
