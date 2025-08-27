<script setup>
import PlusIcon from "@/assets/icons/plus.svg";
const emit = defineEmits(["handle-add-new-category"]);

const handleAddNewCategory = () => {
  emit("handle-add-new-category");
};
</script>

<template>
  <div class="header">
    <button class="header__btn-add" @click="handleAddNewCategory">
      Nova kategorija
      <PlusIcon />
    </button>
  </div>
</template>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0.5rem;
  border-bottom: 1px solid #ccc;

  &__btn-add {
    padding: 0.5rem 1rem;
    background: #1d90a8 0% 0% no-repeat padding-box;
    color: #fff;
    border: none;
    border-radius: 4px;
    opacity: 1;
    cursor: pointer;
  }
}
</style>
