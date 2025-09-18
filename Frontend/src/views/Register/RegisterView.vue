<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { registerUser } from "../../services/Login/login.js";

const email = ref("");
const oldPassword = ref("");
const newPassword = ref("");
const confirmPassword = ref("");
const router = useRouter();
const error = ref("");

const handleRegister = async () => {
  if (
    !email.value ||
    !oldPassword.value ||
    !newPassword.value ||
    !confirmPassword.value
  ) {
    error.value =
      "Please enter email, current password, new password and confirm password.";
    return;
  }
  if (newPassword.value !== confirmPassword.value) {
    error.value = "Passwords do not match.";
    return;
  }
  try {
    const response = await registerUser({
      email: email.value,
      oldPassword: oldPassword.value,
      newPassword: newPassword.value,
    });
    router.push("/questions");
  } catch (err) {
    error.value = "An error occurred while changing the password.";
  }
};

onMounted(() => {
  const storedEmail = localStorage.getItem("userEmail");
  if (storedEmail) {
    email.value = storedEmail;
  }
});
</script>

<template>
  <div class="register-container">
    <h2>Register</h2>
    <form @submit.prevent="handleRegister">
      <div>
        <label for="email">Email:</label>
        <input id="email" v-model="email" type="email" required />
      </div>
      <div>
        <label for="oldPassword">Current password:</label>
        <input
          id="oldPassword"
          v-model="oldPassword"
          type="password"
          required
        />
      </div>
      <div>
        <label for="newPassword">New password:</label>
        <input
          id="newPassword"
          v-model="newPassword"
          type="password"
          required
        />
      </div>
      <div>
        <label for="confirmPassword">Confirm password:</label>
        <input
          id="confirmPassword"
          v-model="confirmPassword"
          type="password"
          required
        />
      </div>
      <button type="submit">Save</button>
      <div v-if="error" style="color: red; margin-top: 10px">{{ error }}</div>
    </form>
  </div>
</template>

<style scoped>
.register-container {
  max-width: 400px;
  margin: 40px auto;
  padding: 24px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background: #fff;
}
.register-container h2 {
  text-align: center;
  margin-bottom: 24px;
}
.register-container form > div {
  margin-bottom: 16px;
}
.register-container label {
  display: block;
  margin-bottom: 6px;
}
.register-container input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}
.register-container button {
  width: 100%;
  padding: 10px;
  background: #1976d2;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.register-container button:hover {
  background: #1565c0;
}
</style>
