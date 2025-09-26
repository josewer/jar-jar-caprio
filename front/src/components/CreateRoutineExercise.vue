<script setup>
import { ref } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import MmSsInput from './MmSsInput.vue';

const emit = defineEmits(["closeModalEditExercise", "saveModalEditExercise"])

const props = defineProps({
  routineExercise: {
    type: Object,
    default: () => { }
  }
})

const routineExerciseModel = ref({ ...props.routineExercise })

const closeModal = () => {
  emit("closeModalEditExercise")
}

const handleSubmit = () => {
  emit("saveModalEditExercise", routineExerciseModel.value)
}

</script>

<template>
  <div>

    <div class="modal">
      <div class="modal-content">
        <Form @submit="handleSubmit" id="exercise-form">
          <h2 class="form-title">Configurar ejercicio</h2>

          <!-- Tipo con toggle -->
          <div class="form-group-inline">
            <div class="toggle">
              <button type="button" :class="['toggle-btn', routineExerciseModel.type === 'R' ? 'active' : '']"
                @click="routineExerciseModel.type = 'R'">Repeticiones</button>
              <button type="button" :class="['toggle-btn', routineExerciseModel.type === 'T' ? 'active' : '']"
                @click="routineExerciseModel.type = 'T'">Tiempo</button>
            </div>
          </div>

          <!-- Series -->
          <div class="form-group">
            <label for="numSeries">Series:</label>
            <Field as="input" id="numSeries" v-model="routineExerciseModel.numSeries" type="number" name="numSeries"
              min="1" placeholder="3" />
            <ErrorMessage class="msg-error" name="numSeries" />
          </div>

          <!-- Repeticiones (solo si tipo = reps) -->
          <div v-if="routineExerciseModel.type === 'R'" class="form-group">
            <label for="numRepeats">Repeticiones por serie:</label>
            <Field as="input" id="numRepeats" v-model="routineExerciseModel.numRepeats" type="number" name="numRepeats"
              min="1" placeholder="10" />
            <ErrorMessage class="msg-error" name="numRepeats" />
          </div>

          <!-- Tiempo (solo si tipo = time) -->
          <MmSsInput v-if="routineExerciseModel.type === 'T'" v-model="routineExerciseModel.timePerSet"
            label="Tiempo por serie" />

          <!-- Descanso -->
          <MmSsInput v-model="routineExerciseModel.restTime" label="Descanso" />

          <div class="actions">
            <button type="submit" class="btn-save">Guardar</button>
            <button type="button" class="btn-cancel" @click="closeModal">Cancelar</button>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Errores */
.msg-error {
  color: red;
  font-size: 0.85rem;
  margin-top: 0.25rem;
}

.hint {
  font-size: 0.8rem;
  color: #666;
  margin-top: 0.2rem;
}

/* Estilo del formulario */
form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.25rem;
  border-radius: 12px;
  background-color: #f5f5f5;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

@media (max-width: 600px) {
  form {
    padding: 0.75rem;
  }
}

.form-title {
  border-bottom: 2px solid rgba(4, 189, 87, 0.384);
  color: #1abc9c;
  font-size: 1.4rem;
  margin-bottom: 0.5rem;
  padding-bottom: 0.25rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group-inline {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.form-group label,
.label-inline {
  font-weight: 600;
  margin-bottom: 0.4rem;
  color: var(--label-form-color, #333);
  font-size: 0.95rem;
}

/* Inputs */
.form-group input,
.form-group textarea,
.form-group select {
  padding: 0.5rem 0.75rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.form-group input:focus,
.form-group textarea:focus,
.form-group select:focus {
  border-color: #1abc9c;
  box-shadow: 0 0 5px rgba(26, 188, 156, 0.5);
  outline: none;
}

/* Toggle tipo */
.toggle {
  display: flex;
  border: 1px solid #ccc;
  border-radius: 6px;
  overflow: hidden;
}

.toggle-btn {
  padding: 0.4rem 0.8rem;
  background: #f0f0f0;
  border: none;
  cursor: pointer;
  font-size: 0.9rem;
  flex: 1;
  transition: background 0.2s, color 0.2s;
}

.toggle-btn.active {
  background: #1abc9c;
  color: #fff;
}

.toggle-btn:not(.active):hover {
  background: #e0e0e0;
}

/* Botones */
.actions {
  display: flex;
  justify-content: flex-start;
  gap: 0.75rem;
  margin-top: 0.5rem;
}

.btn-cancel,
.btn-save {
  padding: 0.6rem 1rem;
  border: none;
  border-radius: 8px;
  font-size: 0.95rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-cancel {
  background-color: #e0e0e0;
  color: #333;
}

.btn-cancel:hover {
  background-color: #bdbdbd;
}

.btn-save {
  background-color: #1abc9c;
  color: #fff;
}

.btn-save:hover {
  background-color: #16a085;
}

/* Fondo del modal */
.modal {
  position: fixed;
  inset: 0;
  z-index: 3;
  background: rgba(0, 0, 0, 0.55);
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Caja del modal */
.modal-content {
  max-width: 500px;
  width: 100%;
  padding: 1rem;
}
</style>
