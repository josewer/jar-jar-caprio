<script setup>
import { ref } from 'vue'
import { MusclesOptions } from '../enums/Muscles'
import { ExerciseTypeOptions } from '../enums/ExerciseType'
import { CategoriesOptions } from '../enums/Categories'
import { DifficultyTypeOptions } from '../enums/DifficultyType'
import { useExerciseStore } from '../stores/exercise'
import { ToastCumtom } from '../../utils/toast'

const emit = defineEmits(["setIsLoading", "setShowColorDifficulty"]);

const exerciseStore = useExerciseStore();

const valuesDefault = {
  mainMuscle: null,
  difficulty: null,
  type: null,
  involvedMuscles: null,
  showColorDifficulty: false
}

const filterSelected = ref({ ...valuesDefault })

const handleSubmit = async () => {

  try {
    emit("setIsLoading", true)
    await exerciseStore.search(filterSelected.value);
    ToastCumtom.success("Filtros aplicados.")
  } catch (error) {
    ToastCumtom.error(error.message, error.status)
  } finally {
    emit("setIsLoading", false)
  }
}

const handleReset = () => {
  filterSelected.value = { ...valuesDefault, showColorDifficulty: filterSelected.value.showColorDifficulty };
  ToastCumtom.info("Filtros resetados.")
}

const setShowColorDifficulty = () => {
  emit("setShowColorDifficulty", filterSelected.value.showColorDifficulty)
}

</script>

<template>
  <div class="filter-container">
    <form @submit.prevent="handleSubmit" class="filter-form">

      <div class="filter-group">
        <label for="category">Músculo principal</label>
        <select id="category" v-model="filterSelected.mainMuscle">
          <option value=""></option>
          <option v-for="category in CategoriesOptions" :key="category.code" :value="category.code">
            {{ category.label }}
          </option>
        </select>
      </div>

      <div class="filter-group">
        <label for="muscle">Músculo involucrado</label>
        <select id="muscle" v-model="filterSelected.involvedMuscles">
          <option value=""></option>
          <option v-for="muscle in MusclesOptions" :key="muscle.code" :value="muscle.code">
            {{ muscle.label }}
          </option>
        </select>
      </div>

      <div class="filter-group">
        <label for="exerciseType">Tipo ejercicio</label>
        <select id="exerciseType" v-model="filterSelected.type">
          <option value=""></option>
          <option v-for="exerciseType in ExerciseTypeOptions" :key="exerciseType.code" :value="exerciseType.code">
            {{ exerciseType.label }}
          </option>
        </select>
      </div>

      <div class="filter-group">
        <label for="difficulty">Dificultad</label>
        <select id="difficulty" v-model="filterSelected.difficulty">
          <option value=""></option>
          <option v-for="difficulty in DifficultyTypeOptions" :key="difficulty.code" :value="difficulty.code">
            {{ difficulty.label }}
          </option>
        </select>
      </div>

      <div class="filter-group">
        <label for="showDifficulty">Resaltar dificultad</label>
        <input id="showDifficulty" @change="setShowColorDifficulty" type="checkbox" v-model="filterSelected.showColorDifficulty"></input>
      </div>

      <button type="submit">Buscar</button>
      <button type="button" @click="handleReset">Limpiar</button>
    </form>
  </div>
</template>

<style scoped>
.filter-container {
  display: flex;
  justify-content: flex-start;
  padding: 1rem;
  background: #f5f5f5;
  border-radius: 16px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  margin-bottom: 1.5rem;
}

.filter-form {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
}

.filter-group {
  display: flex;
  flex-direction: column;
}

.filter-group label {
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 0.3rem;
  color: #333;
}

.filter-group select {
  padding: 0.5rem 0.75rem;
  border-radius: 12px;
  border: 1px solid #ccc;
  font-size: 0.95rem;
  min-width: 150px;
  transition: all 0.2s;

}

.filter-group input[type="checkbox"] {
  width: 32px;
  height: 32px;
  accent-color: #10b981;
  /* cambia el color cuando está marcado */
  cursor: pointer;
  margin-top: 0.25rem;
  /* espacio debajo de la etiqueta */
}

.filter-group select:focus {
  border-color: #10b981;
  box-shadow: 0 0 5px rgba(16, 185, 129, 0.4);
  outline: none;
}

button {
  padding: 0.5rem 1rem;
  background: linear-gradient(145deg, #10b981, #3b82f6);
  color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  min-height: 37px;
  font-weight: 600;
  transition: all 0.2s;
  align-self: flex-end;
}

button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(16, 185, 129, 0.4);
}
</style>
