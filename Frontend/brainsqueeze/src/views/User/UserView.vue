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

const fetchUser = async (id) => {
  const response = await getUserById(id);
  const data = response.content;
  firstNameInput.value = data.firstName;
  lastNameInput.value = data.lastName;
  emailInput.value = data.email;
  console.log(response);
};

const handleSaveUser = async () => {
  const payload = {
    firstName: firstNameInput.value,
    lastName: lastNameInput.value,
    email: emailInput.value,
    roleId: 1,
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
  <div>
    <div class="app">
      <div>
        <button>SRPSKI</button>
        <button>ENGLESKI</button>
      </div>
    </div>
    <div>
      <div>
        <label for="firstNameInput"> Ime </label>
        <input
          id="firstNameInput"
          v-model="firstNameInput"
          type="text"
          class="firstNameInput"
          placeholder="Unesite ime korisnika"
        />
      </div>
      <div>
        <label for="lastNameInput"> Ime </label>
        <input
          id="lastNameInput"
          v-model="lastNameInput"
          type="text"
          class="lastNameInput"
          placeholder="Unesite prezime korisnika"
        />
      </div>
      <div>
        <label for="emailInput"> Email </label>
        <input
          id="emailInput"
          v-model="emailInput"
          type="text"
          class="emailInput"
          placeholder="Unesite email korisnika"
        />
      </div>
    </div>
  </div>
</template>

<style>
.app {
  font: DM Sans 14pt;
}
</style>
