<script setup>
import { ref, onMounted } from 'vue';
import { useExerciseStore } from '../stores/exercise';
import { getDifficultyColor } from '../../utils/functions';

const props = defineProps({
    showColorDifficulty : {
      type: Boolean,
      default: () => false
    },
    id: String
})

const exerciseStore = useExerciseStore();
const modalExercise = ref({involvedMuscles : [] , equipment : []})

onMounted(async () => {
   modalExercise.value = await exerciseStore.getById(props.id)
});


const emit = defineEmits(["closeModal"]);

const closeModal = () => {
    emit("closeModal");
}

</script>

<template>
    <div class="modal-backdrop" @click.self="closeModal" >
      <div class="modal" :style="{ background: getDifficultyColor(modalExercise.difficulty , props.showColorDifficulty)}">
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
</template>

<style scoped>


/* MODAL */
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3;
}

.modal {
  background: var(--card-background-color-default);
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

.scrollable {
  max-height: 150px;
  overflow-y: auto;
  padding-right: 0.25rem;
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
