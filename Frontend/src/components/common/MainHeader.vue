<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import { logoutUser } from "../../services/Login/login";

const router = useRouter();
const dropdownOpen = ref(false);
const avatarWrapperRef = ref(null);
const email = ref("");
const firstName = ref("");
const lastName = ref("");

const handleClickOutside = (event) => {
  if (
    dropdownOpen.value &&
    avatarWrapperRef.value &&
    !avatarWrapperRef.value.contains(event.target)
  ) {
    dropdownOpen.value = false;
  }
};

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

onMounted(() => {
  email.value = localStorage.getItem("userEmail") || "";
  firstName.value = localStorage.getItem("firstName") || "";
  lastName.value = localStorage.getItem("lastName") || "";
  document.addEventListener("mousedown", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("mousedown", handleClickOutside);
});
</script>

<template>
  <header class="main-header">
    <div class="main-header__user">
      <span class="main-header__username">{{ firstName }} {{ lastName }}</span>
      <div
        class="main-header__avatar-wrapper"
        ref="avatarWrapperRef"
        @click="toggleDropdown"
      >
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
