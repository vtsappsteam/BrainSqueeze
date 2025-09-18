<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { loginUser } from "../../services/Login/login.js";

const email = ref("");
const password = ref("");
const router = useRouter();
const error = ref("");

const handleLogin = async () => {
  if (!email.value || !password.value) {
    error.value = "Please enter both email and password.";
    return;
  }
  try {
    const response = await loginUser({
      email: email.value,
      password: password.value,
    });
    if (response.status === 200) {
      localStorage.setItem("userEmail", email.value);
      localStorage.setItem("firstName", response.data.firstName);
      localStorage.setItem("lastName", response.data.lastName);
      router.push("/questions");
    }
  } catch (err) {
    if (err.response && err.response.status === 403) {
      localStorage.setItem("userEmail", email.value);
      router.push("/register");
    } else {
      error.value = "An error occurred while logging in.";
    }
  }
};
</script>

<template>
  <div class="login-background">
    <div class="login-container">
      <div class="login-logo">
        <img
          class="sidebar__picture"
          src="@/assets/logo/BSQZlogo.png"
          alt="Brainsqeeze Logo"
        />
      </div>
      <form @submit.prevent="handleLogin">
        <div>
          <label for="email">Email:</label>
          <input id="email" v-model="email" type="email" required />
        </div>
        <div>
          <label for="password">Password:</label>
          <input id="password" v-model="password" type="password" required />
        </div>
        <button type="submit">Login</button>
        <div v-if="error" style="color: red; margin-top: 10px">{{ error }}</div>
      </form>
    </div>
  </div>
</template>
