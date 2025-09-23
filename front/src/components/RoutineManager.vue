<script setup>
import { ref } from 'vue';

const show = ref(false); // Mostrar/ocultar ventana

// Rutina actual
const routineName = ref('');
const routineExercises = ref([]);

// Abrir modal
export function openRoutineManager() {
  show.value = true;
}

// Cerrar modal
const close = () => {
  show.value = false;
}

// Añadir ejercicio a la rutina
const addExercise = (exercise) => {
  if (!routineExercises.value.find(e => e.id === exercise.id)) {
    routineExercises.value.push(exercise);
  }
}

// Eliminar ejercicio
const removeExercise = (exerciseId) => {
  routineExercises.value = routineExercises.value.filter(e => e.id !== exerciseId);
}

// Guardar rutina
const saveRoutine = () => {
  if (!routineName.value) {
    alert('Introduce un nombre para la rutina');
    return;
  }
  console.log('Rutina guardada:', {
    name: routineName.value,
    exercises: routineExercises.value
  });
  routineName.value = '';
  routineExercises.value = [];
  alert('Rutina guardada con éxito!');
}
</script>

<template>
  <div v-if="show" class="routine-backdrop" @click.self="close">
    <div class="routine-modal">
      <button class="close-btn" @click="close">✕</button>
      <h2>Crear Rutina</h2>
      <input type="text" v-model="routineName" placeholder="Nombre de la rutina" />

      <div class="exercise-list">
        <h3>Ejercicios en la rutina</h3>
        <ul>
          <li v-for="exercise in routineExercises" :key="exercise.id">
            {{ exercise.name }}
            <button @click="removeExercise(exercise.id)">Eliminar</button>
          </li>
        </ul>
      </div>

      <button @click="saveRoutine" :disabled="routineExercises.length === 0">Guardar Rutina</button>
    </div>
  </div>
</template>

<style scoped>
.routine-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.routine-modal {
  background: #111827;
  color: white;
  padding: 2rem;
  border-radius: 16px;
  width: 400px;
  max-width: 90%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: relative;
}

.close-btn {
  position: absolute;
  top: 8px;
  right: 12px;
  border: none;
  background: transparent;
  color: white;
  font-size: 20px;
  cursor: pointer;
}

.exercise-list ul {
  list-style: none;
  padding: 0;
  max-height: 200px;
  overflow-y: auto;
}

.exercise-list li {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.25rem;
}

.exercise-list button {
  background: #10b981;
  border: none;
  padding: 2px 6px;
  border-radius: 6px;
  cursor: pointer;
}
</style>
