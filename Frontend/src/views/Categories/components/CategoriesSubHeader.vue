<script setup>
import PlusIcon from "@/assets/icons/plus.svg";
const emit = defineEmits(["handle-add-new-category"]);

const handleAddNewCategory = () => {
  emit("handle-add-new-category");
};
</script>

<template>
  <div class="page-subheader">
    <button class="page-subheader__btn-add" @click="handleAddNewCategory">
      Nova kategorija
      <PlusIcon class="btn-icon" />
    </button>
  </div>
</template>

<style lang="scss"></style>
