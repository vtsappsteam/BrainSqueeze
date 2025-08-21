<script setup>
const props = defineProps({
  questions: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits([
  "handle-edit-existing-question",
  "handle-delete-existing-question",
]);

const handleEditExistingQuestion = (id) => {
  emit("handle-edit-existing-question", id);
};

const handleDeleteExistingQuestion = (id) => {
  emit("handle-delete-existing-question", id);
};
</script>

<template>
  <div class="table-container">
    <table>
      <thead>
        <tr>
          <th>Br.</th>
          <th>Pitanje</th>
          <th>Tačan odgovor</th>
          <th>Br. prikazivanja</th>
          <th>Tačni odgovori (%)</th>
          <th>Težina</th>
          <th>Kategorija</th>
          <th class="actions">Akcije</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="question in questions" :key="question.id">
          <td>{{ question.id }}</td>
          <td>{{ question.question }}</td>
          <td>{{ question.correctAnswer }}</td>
          <td>{{ question.timesViewed }}</td>
          <td>
            {{
              question.timesViewed > 0
                ? Math.round(
                    (question.answeredCorrectly / question.timesViewed) * 100
                  )
                : "0"
            }}
            ({{ question.answeredCorrectly }}/{{ question.timesViewed }})
          </td>
          <td>{{ question.difficultyName }}</td>
          <td>{{ question.categoryName }}</td>
          <td class="actions-container">
            <button
              type="button"
              class="actions-container__btn-edit"
              @click="handleEditExistingQuestion(question.id)"
            >
              Uredi
            </button>
            <button
              class="actions-container__btn-delete"
              @click="handleDeleteExistingQuestion(question.id)"
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
      border: 1px solid #e9ecef;
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
