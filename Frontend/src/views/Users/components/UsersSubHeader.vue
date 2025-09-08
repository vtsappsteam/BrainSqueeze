<script setup>
const emit = defineEmits(["handle-add-new-user"]);

const handleAddNewUser = () => {
  emit("handle-add-new-user");
};
</script>

<template>
  <div class="page-subheader">
    <button class="page-subheader__btn-add" @click="handleAddNewUser">
      Novi nalog +
    </button>
  </div>
</template>

<style lang="scss"></style>
