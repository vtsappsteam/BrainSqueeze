<template>
  <header class="main-header">
    <div class="main-header__user">
      <span class="main-header__username">{{ firstName }} {{ lastName }}</span>
      <div class="main-header__avatar-wrapper" @click="toggleDropdown">
        <span class="main-header__avatar-text">
          {{ initialsAvatar }}
        </span>
        <div v-if="dropdownOpen" class="main-header__dropdown">
          <button @click="goToChangePassword">Change Password</button>
          <button @click="handleLogout">Logout</button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { logoutUser } from "../../services/Login/login";

const router = useRouter();
const dropdownOpen = ref(false);
const email = ref("");
const firstName = ref("");
const lastName = ref("");

onMounted(() => {
  email.value = localStorage.getItem("userEmail") || "";
  firstName.value = localStorage.getItem("firstName") || "";
  lastName.value = localStorage.getItem("lastName") || "";
});

const initialsAvatar = computed(() => {
  const firstInitial = firstName.value.charAt(0).toUpperCase();
  const lastInitial = lastName.value.charAt(0).toUpperCase();
  return `${firstInitial}${lastInitial}`;
});

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value;
};

const goToChangePassword = () => {
  dropdownOpen.value = false;
  router.push("/changePassword");
};
const handleLogout = async () => {
  await logoutUser();
  dropdownOpen.value = false;
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
    position: relative;
  }

  &__username {
    color: #4b5563;
    font-size: 0.875rem;
  }

  &__avatar-wrapper {
    width: 2rem;
    height: 2rem;
    border-radius: 9999px;
    background: #1976d2;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    position: relative;
    user-select: none;
  }

  &__avatar-text {
    font-size: 1.1rem;
    font-weight: bold;
  }

  &__dropdown {
    position: absolute;
    top: 2.5rem;
    right: 0;
    background: #fff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    border-radius: 0.5rem;
    padding: 0.5rem 0;
    min-width: 140px;
    z-index: 10;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  &__dropdown button {
    background: none;
    border: none;
    padding: 0.5rem 1rem;
    text-align: left;
    width: 100%;
    cursor: pointer;
    font-size: 0.95rem;
    color: #1976d2;
    border-radius: 0.25rem;

    &:hover {
      background: #f0f4fa;
    }
  }
}
</style>
