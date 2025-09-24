<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useExerciseStore } from '../stores/exercise';
import FilterExercise from './FilterExercise.vue'
import HeaderComponent from './HeaderComponent.vue'
import SpinnerComponent from './SpinnerComponent.vue';
import ExerciseCard from './ExerciseCard.vue';

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
        <ExerciseCard v-for="exercise in filteredExercises" :exercise="exercise" :showColorDifficulty="showColorDifficulty" :showToggleSelection="true"/>
    </div>

    <!-- Sentinel para infinite scroll -->
    <div ref="sentinel" style="height: 1px;"></div>

  </div>
</template>

<style scoped>

.exercise-selector {
  padding: 1rem;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1rem;
}

</style>
