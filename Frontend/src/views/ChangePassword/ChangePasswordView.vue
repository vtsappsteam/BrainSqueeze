<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { changePassword } from "../../services/Login/login.js";

const email = ref("");
const oldPassword = ref("");
const newPassword = ref("");
const router = useRouter();
const error = ref("");

const handleChangePassword = async () => {
  if (!email.value || !oldPassword.value || !newPassword.value) {
    error.value = "Please enter email, current password and new password.";
    return;
  }
  try {
    const response = await changePassword({
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
  <div class="change-password-container">
    <h2>Change Password</h2>
    <form @submit.prevent="handleChangePassword">
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
      <button type="submit">Save</button>
      <div v-if="error" style="color: red; margin-top: 10px">{{ error }}</div>
    </form>
  </div>
</template>

<style scoped>
.change-password-container {
  max-width: 400px;
  margin: 40px auto;
  padding: 24px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background: #fff;
}
.change-password-container h2 {
  text-align: center;
  margin-bottom: 24px;
}
.change-password-container form > div {
  margin-bottom: 16px;
}
.change-password-container label {
  display: block;
  margin-bottom: 6px;
}
.change-password-container input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}
.change-password-container button {
  width: 100%;
  padding: 10px;
  background: #1976d2;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.change-password-container button:hover {
  background: #1565c0;
}
</style>
