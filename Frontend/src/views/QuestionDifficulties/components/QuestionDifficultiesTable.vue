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
  <div class="section-container">
    <div class="table-container">
      <div class="section-header"></div>
      <table class="section-table">
        <thead>
          <tr>
            <th>Br.</th>
            <th>Težina</th>
            <th>Prag tačnih odgovora</th>
            <th>Br. pitanja</th>
            <th>Akcije</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="questionDifficulty in questionDifficulties"
            :key="questionDifficulty.id"
          >
            <td>{{ questionDifficulty.id }}</td>
            <td>
              <span
                class="dot"
                :class="{
                  'dot dot-green': questionDifficulty.name === 'Lako',
                  'dot dot-yellow': questionDifficulty.name === 'Srednje',
                  'dot dot-red': questionDifficulty.name === 'Teško',
                }"
              ></span
              >{{ questionDifficulty.name }}
            </td>
            <td>
              {{ questionDifficulty?.minThreshold ?? "" }}-{{
                questionDifficulty?.maxThreshold ?? ""
              }}%
            </td>
            <td>{{ questionDifficulty.totalQuestions }}</td>
            <td class="actions-cell">
              <div class="actions-container">
                <button
                  type="button"
                  class="actions-container__btn-edit"
                  @click="
                    handleEditExistingQuestionDifficulty(questionDifficulty.id)
                  "
                >
                  <EditIcon />
                </button>
                <button
                  disabled
                  type="button"
                  class="actions-container__btn-delete disabled"
                  @click="
                    handleDeleteExistingQuestionDifficulty(
                      questionDifficulty.id
                    )
                  "
                >
                  <DeleteIcon />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style lang="scss" scoped>
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

.disabled {
  cursor: not-allowed;
}
</style>
