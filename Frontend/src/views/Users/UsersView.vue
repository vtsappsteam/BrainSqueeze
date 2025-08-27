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

const goToPage = (p) => {
  if (p >= 1 && p <= totalPages.value) {
    page.value = p;
    fetchUsers();
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
    <div class="pagination">
      <button
        class="pagination-btn"
        :disabled="page === 1"
        @click="goToPage(page - 1)"
      >
        &laquo;
      </button>
      <button
        v-for="p in totalPages"
        :key="p"
        class="pagination-btn"
        :class="{ active: page === p }"
        @click="goToPage(p)"
      >
        {{ p }}
      </button>
      <button
        class="pagination-btn"
        :disabled="page === totalPages"
        @click="goToPage(page + 1)"
      >
        &raquo;
      </button>
    </div>
  </div>
</template>

<style scoped>
.pagination {
  display: flex;
  gap: 8px;
  justify-content: center;
  margin: 2rem 0;
}
.pagination-btn {
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 1rem;
  min-width: 40px;
  transition: background 0.2s;
}
.pagination-btn.active {
  background: #e6eeef;
  font-weight: bold;
  color: #1a2a32;
  border-color: #e6eeef;
}
.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
