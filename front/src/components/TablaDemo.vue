<script setup>
import { ref, computed, onMounted } from 'vue';
import { useExerciseStore } from '../stores/exercise';
import FilterExercise from './FilterExercise.vue'
import HeaderComponent from './HeaderComponent.vue'

const exerciseStore = useExerciseStore();

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

const difficultyGradient = computed(() => {
  if (!modalExercise.value) return 'linear-gradient(145deg, #10b981, #3b82f6)';
  switch (modalExercise.value.difficulty) {
    case 1:
      return 'linear-gradient(145deg, #34d399, #10b981)'; // verde
    case 2:
      return 'linear-gradient(145deg, #facc15, #f59e0b)'; // amarillo → naranja
    case 3:
      return 'linear-gradient(145deg, #ef4444, #8b5cf6)'; // rojo → morado
    default:
      return 'linear-gradient(145deg, #10b981, #3b82f6)';
  }
});
</script>

<template>

  <HeaderComponent />
  <FilterExercise />

  <div class="exercise-selector">
    <!-- GRID DE EJERCICIOS -->
    <div class="grid">
      <div v-for="exercise in filteredExercises" :key="exercise.id" class="card" @click="openModal(exercise)"
        @mouseenter="hoveredExerciseId = exercise.id" @mouseleave="hoveredExerciseId = null">
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

    <!-- MODAL -->
    <div v-if="showModal" class="modal-backdrop" @click.self="closeModal">
      <div class="modal" :style="{ background: difficultyGradient }">
        <button class="close-btn" @click="closeModal">✕</button>
        <h3 class="modal-title">{{ modalExercise.name }}</h3>
        <p class="modal-subtitle">{{ modalExercise.mainMuscle }} - {{ modalExercise.type }}</p>

        <div class="modal-section scrollable">
          <h4>Descripción</h4>
          <p>{{ modalExercise.description }}</p>
        </div>

        <div class="modal-img-container">
          <img :src="`/src/assets/exercises/gifs/${modalExercise.id}.gif`" class="modal-img" />
        </div>

        <div class="modal-section">
          <h4>Musculos involucrados</h4>
          <p>{{ modalExercise.involvedMuscles.length === 0 ? 'Todos' : modalExercise.involvedMuscles.join(', ') }}</p>
        </div>

        <div class="modal-section">
          <h4>Equipamiento</h4>
          <p>{{ modalExercise.equipment.length === 0 ? 'Ninguno' : modalExercise.equipment.join(', ') }}</p>
        </div>


      </div>
    </div>
  </div>
</template>

<style scoped>
.exercise-selector {
  padding: 1rem;
  font-family: 'Segoe UI', sans-serif;
}

/* GRID */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1rem;
}

/* TARJETA */
.card {
  background: linear-gradient(145deg, #34d399, #3b82f6);
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

/* MODAL */
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
}

.modal {
  background: linear-gradient(145deg, #10b981, #3b82f6);
  border-radius: 24px;
  padding: 2rem 1.5rem 1.5rem 1.5rem;
  width: 380px;
  max-width: 90%;
  color: white;
  text-align: center;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.45);
  animation: modalAppear 0.35s ease-out;
  position: relative;
  backdrop-filter: blur(6px);
  max-height: 90vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.modal-title {
  font-size: 22px;
  font-weight: 70px;
  margin: 0;
}

.modal-subtitle {
  font-size: 15px;
  opacity: 0.9;
  margin: 0 0 0.5rem 0;
}

.modal-section {
  text-align: left;
  padding: 0.5rem 0;
  border-top: 2px solid rgba(255, 255, 255, 0.2);
}


.modal-section h4 {
  margin: 0 0 0.3rem 0;
  font-size: 17px;
  font-weight: 600;
  opacity: 0.9;
}

.modal-section p {
  font-size: 15px;
  margin: 0;
  line-height: 1.4;
}

/* Imagen */
.modal-img-container {
  display: flex;
  justify-content: center;
  margin: 0.5rem 0;
}

.modal-img {
  width: 100%;
  border-radius: 16px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
}

/* Scrollable para descripciones largas */
.scrollable {
  max-height: 100px;
  overflow-y: auto;
  padding-right: 0.25rem;
}

/* Botón de cierre más alto */
.close-btn {
  position: absolute;
  top: 8px;
  right: 12px;
  background: rgba(255, 255, 255, 0.15);
  border: none;
  color: white;
  font-size: 20px;
  font-weight: bold;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  cursor: pointer;
  transition: background 0.2s;
  z-index: 10;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.3);
}


@keyframes modalAppear {
  from {
    transform: translateY(-30px) scale(0.95);
    opacity: 0;
  }

  to {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
}
</style>
