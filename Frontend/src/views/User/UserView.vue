<script setup>
import { useRoute, useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import UserSubHeader from "./components/UserSubHeader.vue";
import { createUser, updateUser, getUserById } from "@/services/Users/users";

const route = useRoute();
const router = useRouter();

const firstNameInput = ref("");
const lastNameInput = ref("");
const emailInput = ref("");
const passwordInput = ref("");

const errorMessage = ref("");
const showErrorModal = ref(false);

const fetchUser = async (id) => {
  const response = await getUserById(id);
  const data = response.content;
  firstNameInput.value = data.firstName;
  lastNameInput.value = data.lastName;
  emailInput.value = data.email;
};

const handleSaveUser = async () => {
  if (
    !firstNameInput.value ||
    !lastNameInput.value ||
    !emailInput.value ||
    (!route.query.id && !passwordInput.value)
  ) {
    errorMessage.value = "Sva polja su obavezna!";
    showErrorModal.value = true;
    return;
  }

  const payload = {
    firstName: firstNameInput.value,
    lastName: lastNameInput.value,
    email: emailInput.value,
    password: passwordInput.value,
  };
  try {
    if (route.query.id) {
      await updateUser(route.query.id, payload);
    } else {
      await createUser(payload);
    }
    router.push("/users");
  } catch (error) {
    console.error(error, payload);
  }
};

const handleGoBack = () => {
  router.push("/users");
};

onMounted(() => {
  if (route.query.id) {
    fetchUser(route.query.id);
  }
});
</script>

<template>
  <UserSubHeader
    @handle-save-user="handleSaveUser"
    @handle-go-back="handleGoBack"
  />
  <div class="section-container">
    <div class="inputs-column">
      <div class="form-group">
        <label for="firstNameInput"> Ime </label>
        <input
          id="firstNameInput"
          v-model="firstNameInput"
          type="text"
          class="firstNameInput"
          placeholder="Unesite ime korisnika"
          required
        />
      </div>
      <div class="form-group">
        <label for="lastNameInput"> Prezime </label>
        <input
          id="lastNameInput"
          v-model="lastNameInput"
          type="text"
          class="lastNameInput"
          placeholder="Unesite prezime korisnika"
          required
        />
      </div>
      <div class="form-group">
        <label for="emailInput"> Email </label>
        <input
          id="emailInput"
          v-model="emailInput"
          type="email"
          placeholder="Unesite email korisnika"
          required
          :disabled="
            route.query.id == 1 && emailInput === 'admin@vtsappstim.edu.rs'
          "
        />
      </div>
      <div v-if="!route.query.id" class="form-group">
        <label for="passwordInput"> Password </label>
        <input
          id="passwordInput"
          v-model="passwordInput"
          type="password"
          placeholder="Unesite password korisnika"
          required
        />
      </div>
    </div>
  </div>
  <div v-if="showErrorModal" class="modal">
    <div class="modal-content">
      <p>{{ errorMessage }}</p>
      <button class="modal-button" @click="showErrorModal = false">
        Zatvori
      </button>
    </div>
  </div>
</template>

<style scoped>
input {
  width: 300px;
  padding: 10px;
  margin: 5px 0;
  box-sizing: border-box;
  border-radius: 0px;
}
</style>
