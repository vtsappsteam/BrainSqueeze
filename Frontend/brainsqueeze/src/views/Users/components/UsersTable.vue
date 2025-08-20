<script setup>
const props = defineProps({
  users: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits([
  "handle-edit-existing-user",
  "handle-delete-existing-user",
]);

const handleEditExistingUser = (id) => {
  emit("handle-edit-existing-user", id);
};

const handleDeleteExistingUser = (id) => {
  emit("handle-delete-existing-user", id);
};
</script>

<template>
  <div class="table-container">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Ime</th>
          <th>Prezime</th>
          <th>Email</th>
          <th class="actions">Akcije</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.firstName }}</td>
          <td>{{ user.lastName }}</td>
          <td>{{ user.email }}</td>
          <td class="actions-container">
            <button
              class="actions-container__btn-edit"
              @click="handleEditExistingUser(user.id)"
            >
              Uredi
            </button>
            <button
              class="actions-container__btn-delete"
              @click="handleDeleteExistingUser(user.id)"
            >
              Obriši
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="scss" scoped>
.table-container {
  padding: 0.5rem;

  table {
    width: 100%;
    border-collapse: collapse;
    background-color: #fff;

    thead {
      background-color: #f9fafb;
      text-align: left;
      font-size: 0.85rem;
      color: #4b5563;
    }

    th,
    td {
      padding: 0.75rem 1rem;
      font-size: 0.9rem;
      vertical-align: middle;
      border: 1px solid #e5e7eb;
    }

    th {
      font-weight: 600;
    }

    tbody tr {
      transition: background-color 0.2s ease-in-out;

      &:hover {
        background-color: #f3f4f6;
      }
    }

    td {
      color: #374151;
    }

    .actions {
      text-align: center;
      &-container {
        padding: 0.5rem 0;
        text-align: center;
        white-space: nowrap;

        &__btn-edit,
        &__btn-delete {
          padding: 0.5rem 1rem;
          background-color: #2c9dff;
          color: #fff;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        &__btn-edit {
          margin-right: 0.5rem;
        }

        &__btn-delete {
          background-color: #ff5252;
        }
      }
    }
  }
}
</style>
