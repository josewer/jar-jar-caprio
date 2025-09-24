<script setup>
import { ref, computed, onMounted } from 'vue';
import { useExerciseStore } from '../stores/exercise';
import FilterExercise from './FilterExercise.vue'
import HeaderComponent from './HeaderComponent.vue'
import SpinnerComponent from './SpinnerComponent.vue';
import ExerciseDetails from './ExerciseDetails.vue';
import { getDifficultyColor } from '../../utils/functions';

const exerciseStore = useExerciseStore();

const isLoading = ref(true)
const showColorDifficulty = ref(false)

const setIsLoading = (value) => {
  isLoading.value = value;
}

const setShowColorDifficulty = (value) => {
  showColorDifficulty.value = value;
}

onMounted(async () => {
  // Cargar ejercicios
  await exerciseStore.getAll();

  // Configurar IntersectionObserver
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) { loadMore(); }
  }, {
    root: null, rootMargin: '0px', threshold: 1.0
  });

  if (sentinel.value) { observer.observe(sentinel.value); }

  isLoading.value = false;
});

// Lista de ejercicios seleccionados
const selectedExercises = ref([]);

const hoveredExerciseId = ref(null);

// Modal
const showModal = ref(false);
const modalExercise = ref(null);

function openModal(exercise) {
  modalExercise.value = exercise;
  showModal.value = true;
}

function closeModal() {
  showModal.value = false;
  modalExercise.value = null;
}

// Infinite scroll
const itemsToShow = ref(100);
const increment = 100;

const filteredExercises = computed(() =>
  exerciseStore.exercises.slice(0, itemsToShow.value)
);

// Detectar scroll al final
const sentinel = ref(null);

const loadMore = () => {
  if (itemsToShow.value < exerciseStore.exercises.length) {
    itemsToShow.value += increment;
  }
};

</script>

<template>

  <HeaderComponent />

  <div class="exercise-selector">

    <FilterExercise @setIsLoading="setIsLoading" @setShowColorDifficulty="setShowColorDifficulty" />

    <SpinnerComponent v-if="isLoading" />
    <div class="grid">
      <div v-for="exercise in filteredExercises" :key="exercise.id" class="card"
        :style="{ background: getDifficultyColor(exercise.difficulty, showColorDifficulty) }"
        @click="openModal(exercise)" @mouseenter="hoveredExerciseId = exercise.id"
        @mouseleave="hoveredExerciseId = null">
        <div class="card-img-container">
          <img :src="hoveredExerciseId === exercise.id
            ? `/src/assets/exercises/webp/${exercise.id}.webp`
            : `/src/assets/exercises/thumbnails/${exercise.id}.webp`" class="card-img" />
          <input type="checkbox" v-model="selectedExercises" :value="exercise.id" class="card-checkbox" @click.stop />
        </div>
        <div class="card-content">
          <h3 class="card-title">{{ exercise.name }}</h3>
          <p class="card-subtitle">{{ exercise.mainMuscle }}</p>
        </div>
      </div>
    </div>

    <!-- Sentinel para infinite scroll -->
    <div ref="sentinel" style="height: 1px;"></div>

    <ExerciseDetails v-if="showModal" @closeModal="closeModal" :showColorDifficulty="showColorDifficulty"
      :id="modalExercise.id" />

  </div>
</template>

<style scoped>
.exercise-selector {
  padding: 1rem;
}

/* GRID */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1rem;
}

/* TARJETA */
.card {
  background: var(--card-background-color-default);
  border-radius: 16px;
  overflow: hidden;
  color: white;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.35);
}

.card-img-container {
  position: relative;
  overflow: hidden;
  border-radius: 16px 16px 0 0;
}

.card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.3s;
}

.card:hover .card-img {
  transform: scale(1.05);
}

.card-checkbox {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 22px;
  height: 22px;
  border: 2px solid #fff;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.8);
  cursor: pointer;
}

.card-checkbox:checked {
  background: #10b981;
  border-color: #10b981;
}

/* CONTENIDO TARJETA */
.card-content {
  padding: 0.5rem 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.card-title {
  font-weight: 600;
  font-size: 15px;
  line-height: 1.2;
  color: white;
}

.card-subtitle {
  font-size: 13px;
  opacity: 0.9;
  color: #f0f0f0;
}
</style>
