<template>
  <header class="main-header">
    <div class="main-header__user">
      <span class="main-header__username">Super Admin</span>
      <img
        src="https://i.pravatar.cc/40"
        alt="avatar"
        class="main-header__avatar"
      />
    </div>
  </header>
</template>

<script>
export default {
  name: "MainHeader",
};
</script>

<style lang="scss" scoped>
.main-header {
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  &__user {
    margin-right: 2rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  &__username {
    color: #4b5563;
    font-size: 0.875rem;
  }

  &__avatar {
    width: 2rem;
    height: 2rem;
    border-radius: 9999px;
    object-fit: cover;
  }
}
</style>
