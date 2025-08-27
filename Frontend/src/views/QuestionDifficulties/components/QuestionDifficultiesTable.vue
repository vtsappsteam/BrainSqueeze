<script setup>
import EditIcon from "@/assets/icons/edit.svg";
import DeleteIcon from "@/assets/icons/delete.svg";

const props = defineProps({
  questionDifficulties: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits([
  "handle-delete-existing-question-difficulty",
  "handle-edit-existing-question-difficulty",
]);

const handleEditExistingQuestionDifficulty = (id) => {
  emit("handle-edit-existing-question-difficulty", id);
};

const handleDeleteExistingQuestionDifficulty = (id) => {
  emit("handle-delete-existing-question-difficulty", id);
};
</script>

<template>
  <div class="table-container">
    <table>
      <thead>
        <tr>
          <th>Br.</th>
          <th>Težina</th>
          <th>Prag tačnih odgovora</th>
          <th>Br. pitanja</th>
          <th class="actions">Akcije</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="questionDifficulty in questionDifficulties"
          :key="questionDifficulty.id"
        >
          <td>{{ questionDifficulty.id }}</td>
          <td>{{ questionDifficulty.name }}</td>
          <td>
            {{ questionDifficulty?.minThreshold ?? "" }}-{{
              questionDifficulty?.maxThreshold ?? ""
            }}%
          </td>
          <td>{{ questionDifficulty.totalQuestions }}</td>
          <td class="actions-container">
            <button
              class="actions-container__btn-edit"
              @click="
                handleEditExistingQuestionDifficulty(questionDifficulty.id)
              "
            >
              <EditIcon />
            </button>
            <button
              class="actions-container__btn-delete"
              @click="
                handleDeleteExistingQuestionDifficulty(questionDifficulty.id)
              "
            >
              <DeleteIcon />
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
