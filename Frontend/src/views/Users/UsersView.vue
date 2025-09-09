<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { getAllUsers, deleteUser } from "@/services/Users/users";
import UsersSubHeader from "@/views/Users/components/UsersSubHeader.vue";
import UsersTable from "@/views/Users/components/UsersTable.vue";

const users = ref([]);
const limit = ref(100);
const page = ref(1);
const totalPages = ref(1);
const router = useRouter();
const filterName = ref("");
const showConfirmModal = ref(false);
const confirmMessage = ref("");
const onConfirmDelete = ref(() => {});

const fetchUsers = async () => {
  try {
    const response = await getAllUsers({
      page: page.value,
      limit: limit.value,
    });
    users.value = response.content;
    totalPages.value = response.totalPages;
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
  confirmMessage.value = "Da li ste sigurni da želite da obrišete korisnika?";
  showConfirmModal.value = true;
  onConfirmDelete.value = async () => {
    showConfirmModal.value = false;
    try {
      await deleteUser(id);
      await fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };
};

const goToPage = (p) => {
  if (p >= 1 && p <= totalPages.value) {
    page.value = p;
    fetchUsers();
  }
};

const handleSearch = async (filterName) => {
  try {
    const response = await getAllUsers({
      page: page.value,
      limit: limit.value,
      filterName: filterName,
    });
    users.value = response.content;
    totalPages.value = response.totalPages;
    filterName = "";
  } catch (error) {
    console.error(error);
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
      @handle-search-user="handleSearch"
    />
  </div>
  <div v-if="showConfirmModal" class="modal">
    <div class="modal-content">
      <p>{{ confirmMessage }}</p>
      <button class="modal-button" @click="onConfirmDelete">Potvrdi</button>
      <button
        class="modal-button-cancel"
        style="background: #ccc; color: #333"
        @click="showConfirmModal = false"
      >
        Otkaži
      </button>
    </div>
  </div>
</template>
