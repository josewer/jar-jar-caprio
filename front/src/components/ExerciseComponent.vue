<script setup>
import { ref, computed, onMounted } from 'vue';
import { useExerciseStore } from '../stores/exercise';
import FilterExercise from './FilterExercise.vue'
import HeaderComponent from './HeaderComponent.vue'
import SpinnerComponent from './SpinnerComponent.vue';
import ExerciseCard from './ExerciseCard.vue';


const emit = defineEmits(["addExercises"])

const props = defineProps({
  isModal: {
    type: Boolean,
    default: () => false
  },
  selectedExercises : {
    type: Array,
    default: () => []
  }
})

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


const exercisesSeleted = []

const addExercise = (exercise) => {
  exercisesSeleted.push(exercise);
}

const removeExercise = (exercise) => {
  const index = exercisesSeleted.findIndex((e) => e.id === exercise.id);
  exercisesSeleted.splice(index , 1);
}

const applySelection = () => {
  emit("addExercises", exercisesSeleted)
}

</script>

<template>

  <HeaderComponent v-if="!isModal" />

  <div class="exercise-selector">

        <!-- Filtro sticky -->
    <div :class="{'filter-sticky' : !props.isModal , 'filter-sticky-modal' : props.isModal }">
      <FilterExercise @setIsLoading="setIsLoading" @setShowColorDifficulty="setShowColorDifficulty" />
    </div>

    <SpinnerComponent v-if="isLoading" />
    <div class="grid">
      <ExerciseCard v-for="exercise in filteredExercises" :key="exercise.id" :exercise="exercise"
        :isCheck="props.selectedExercises.find(f => f.id === exercise.id) != null"
        :showColorDifficulty="showColorDifficulty" :showToggleSelection="isModal" @addExercise="addExercise" @removeExercise="removeExercise" />
    </div>

    <!-- Sentinel para infinite scroll -->
    <div ref="sentinel" style="height: 1px;"></div>
    <div v-if="isModal" class="modal-actions">
      <button class="button-default" @click="applySelection">
        Aplicar selección
      </button>
    </div>
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

.modal-actions {
  position: sticky;
  bottom: 0;
  z-index: 1;
  display: flex;
  justify-content: flex-start;
  padding: 1rem;
  background: #f5f5f5;
  border-radius: 16px 16px 0px 0px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.filter-sticky {
  position: sticky;
  top: 57px;
  z-index: 2;
}

.filter-sticky-modal {
  position: sticky;
  top: 0;
  z-index: 2;
}


</style>
