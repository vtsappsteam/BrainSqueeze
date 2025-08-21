<script setup>
const emit = defineEmits(["handle-save-user", "handle-go-back"]);

const handleSaveUser = () => {
  emit("handle-save-user");
};

const handleGoBack = () => {
  emit("handle-go-back");
};
</script>

<template>
  <div class="header">
    <button class="header__btn-back" @click="handleGoBack"><</button>
    <button class="header__btn-add" @click="handleSaveUser">
      Sačuvaj izmene
    </button>
  </div>
</template>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem;
  border-bottom: 1px solid #ccc;

  &__btn-back {
    top: 99px;
    left: 300px;
    width: 36px;
    height: 36px;
    background: #1d90a8 0% 0% no-repeat padding-box;
    border-radius: 6px;
    opacity: 1;
    cursor: pointer;
  }

  &__btn-add {
    top: 99px;
    left: 1716px;
    width: 165px;
    height: 36px;
    padding: 0.5rem 1rem;
    background: #1d90a8 0% 0% no-repeat padding-box;
    border-radius: 6px;
    opacity: 1;
    cursor: pointer;
  }
}
</style>
