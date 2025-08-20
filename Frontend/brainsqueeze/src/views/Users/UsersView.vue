<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { getAllUsers, deleteUser } from "@/services/Users/users";
import UsersSubHeader from "@/views/Users/components/UsersSubHeader.vue";
import UsersTable from "@/views/Users/components/UsersTable.vue";

const users = ref([]);
const limit = ref(10);
const page = ref(0);

const router = useRouter();

const fetchUsers = async () => {
  try {
    const response = await getAllUsers({
      page: page.value,
      limit: limit.value,
    });
    users.value = response.content;
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};

const handleAddNewUser = () => {
  router.push(`/user`);
};

const handleEditExistingUser = (id) => {
  router.push({ path: "/user", query: { id } });
};

const handleDeleteExistingUser = async (id) => {
  if (
    window.confirm("Da li ste sigurni da želite da obrišete ovog korisnika?")
  ) {
    try {
      await deleteUser(id);
      console.log(`Delete user with id: ${id}`);
      await fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  }
};

onMounted(() => {
  fetchUsers();
});
</script>

<template>
  <div>
    <UsersSubHeader @handle-add-new-user="handleAddNewUser" />
    <UsersTable
      :users="users"
      @handle-edit-existing-user="handleEditExistingUser"
      @handle-delete-existing-user="handleDeleteExistingUser"
    />
  </div>
</template>
