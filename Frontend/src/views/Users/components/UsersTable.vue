<script setup>
import { ref } from "vue";
import EditIcon from "@/assets/icons/edit.svg";
import DeleteIcon from "@/assets/icons/delete.svg";

const filterName = ref("");
const limit = ref(100);
const page = ref(1);
const totalPages = ref(1);

const props = defineProps({
  users: {
    type: Array,
    required: true,
  },
});

const goToPage = (p) => {
  if (p >= 1 && p <= props.totalPages) {
    emit("go-to-page", p);
  }
};

const emit = defineEmits([
  "handle-edit-existing-user",
  "handle-delete-existing-user",
  "handle-search-user",
]);

const handleEditExistingUser = (id) => {
  emit("handle-edit-existing-user", id);
};

const handleDeleteExistingUser = (id) => {
  emit("handle-delete-existing-user", id);
};

const handleSearch = async () => {
  emit("handle-search-user", filterName.value);
};
</script>

<template>
  <div class="section-container">
    <div class="table-container">
      <div class="section-header">
        <input
          class="search-input"
          type="text"
          placeholder="Pretraži korisnika"
          v-model="filterName"
          @keyup.enter="handleSearch"
        />
        <button class="search-btn" @click="handleSearch">Pretraži</button>
      </div>
      <table class="section-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Ime</th>
            <th>Prezime</th>
            <th>Email</th>
            <th>Akcije</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.firstName }}</td>
            <td>{{ user.lastName }}</td>
            <td>{{ user.email }}</td>
            <td class="actions-cell">
              <div class="actions-container">
                <button
                  type="button"
                  class="actions-container__btn-edit"
                  @click="handleEditExistingUser(user.id)"
                >
                  <EditIcon />
                </button>
                <button
                  class="actions-container__btn-delete"
                  @click="handleDeleteExistingUser(user.id)"
                  :disabled="user.email === 'admin@vtsapstim.edu.rs'"
                >
                  <DeleteIcon />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
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
.table-container {
  max-height: 620px;
  overflow-y: auto;
}
.section-table {
  width: 100%;
  border-collapse: collapse;
}

.section-table td {
  padding: 0.75rem 1rem;
  text-align: left;
  border: 1px solid #e9ecef;
}

.section-table td.wrong-category-cell {
  text-align: center;
}

.wrong-category-cell span {
  font-size: 25px;
}

.section-table thead th {
  position: sticky;
  top: 0;
  background: #f6f7fa;
  font-weight: bold;
  z-index: 2;
  border: #e9ecef 1px solid;
  text-align: left;
  padding: 0.75rem 1rem;
  white-space: nowrap;
}

.difficulty-cell {
  min-width: 110px;
}

.actions-cell {
  width: 105px;
}
</style>
