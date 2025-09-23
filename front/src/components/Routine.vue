<script setup>
import { ref, computed } from 'vue';
import ExerciseComponent from './ExerciseComponent_test.vue';

// Datos de la rutina
const routine = ref({
  name: "Espalda",
  status: false,
  icon: "🏋️",
  exercises: [
    { name: "Remo", muscle: "Espalda", estimatedTimeMinutes: 5, status: true, reps: 12, weightKg: 40, feeling: 7, gif: "Hyperextension.gif" },
    { name: "Jalón al pecho", muscle: "Espalda", estimatedTimeMinutes: 5, status: true, reps: 10, weightKg: 35, feeling: 6, gif: "Hyperextension.gif" },
    { name: "Dominadas asistidas", muscle: "Espalda", estimatedTimeMinutes: 5, status: true, reps: 8, weightKg: 0, feeling: 8, gif: "Hyperextension.gif" },
    { name: "Remo a una mano", muscle: "Espalda", estimatedTimeMinutes: 5, status: true, reps: 12, weightKg: 20, feeling: 6, gif: "Hyperextension.gif" },
    { name: "Pull-over", muscle: "Espalda", estimatedTimeMinutes: 5, status: true, reps: 10, weightKg: 15, feeling: 5, gif: "Hyperextension.gif" },
    { name: "Peso muerto", muscle: "Espalda", estimatedTimeMinutes: 10, status: true, reps: 8, weightKg: 60, feeling: 9, gif: "Hyperextension.gif" },
    { name: "Hiperextensiones", muscle: "Espalda baja", estimatedTimeMinutes: 5, status: false, reps: 15, weightKg: 0, feeling: 4, gif: "Hyperextension.gif" }
  ]
});

const entrenosPlanificados = routine.value.exercises.length;
const entrenosCompletados = computed(() =>
  routine.value.exercises.filter(f => f.status).length
);

const totalTiempo = computed(() => {
  const total = routine.value.exercises.reduce((acc, current) => acc + (current.estimatedTimeMinutes || 0), 0);
  const horas = Math.floor(total / 60);
  const minutos = total % 60;
  return horas > 0 ? `${horas}h ${minutos}m` : `${minutos}m`;
});

// Modal
const showModal = ref(false);
const selectedExercise = ref(null);

function openModal(exercise) {
  selectedExercise.value = exercise;
  showModal.value = true;
}

function closeModal() {
  showModal.value = false;
  selectedExercise.value = null;
}

// Calorías aproximadas (fuerza)
function calcularCalorias(exercise) {
  const peso = exercise.weightKg || 0;
  const reps = exercise.reps || 0;
  return Math.round(reps * peso * 0.1);
}
</script>

<template>
  <div class="tarjeta">
    <h2 class="titulo">{{ routine.icon }} {{ routine.name }}</h2>

    <div class="tiempo-total">
      <p class="tiempo">{{ totalTiempo }}</p>
      <p class="subtexto">Tiempo total estimado</p>
    </div>

    <div class="exercises">
      <div v-for="(exercise, index) in routine.exercises" :key="index" class="exercise" @click="openModal(exercise)">
        <div :class="['circulo', exercise.status ? 'activo' : '']">
          {{ exercise.status ? '✓' : '' }}
        </div>
        <span class="nombre">{{ exercise.name }}</span>
      </div>
    </div>

    <div class="progreso-contenedor">
      <p class="progreso-texto">
        Ejercicios: {{ entrenosCompletados }} / {{ entrenosPlanificados }}
      </p>
      <div class="barra-fondo">
        <div class="barra" :style="{ width: ((entrenosCompletados / entrenosPlanificados) * 100) + '%' }"></div>
      </div>
    </div>
    
    <!-- Modal -->
    <div v-if="showModal" class="modal-fondo" @click.self="closeModal"> 
      <ExerciseComponent :exercise="selectedExercise"/>
    </div>

  </div>
</template>

<style scoped>
/* Tarjeta */
.tarjeta {
  background: linear-gradient(135deg, #208862, #3b82f6);
  border-radius: 24px;
  padding: 24px;
  width: 320px;
  flex-shrink: 0;
  color: white;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  font-family: Arial, sans-serif;
  display: flex;
  flex-direction: column;
}

.exercise-img {
  display: flex;
  justify-content: center;
  margin: 12px 0;
}

.exercise-img img {
  max-width: 100%;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.titulo {
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 16px;
}

.tiempo-total {
  text-align: center;
  margin-bottom: 16px;
}

.tiempo {
  font-size: 26px;
  font-weight: bold;
}

.subtexto {
  font-size: 12px;
  opacity: 0.8;
}

.exercises {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
}

.exercise {
  display: flex;
  align-items: center;
  gap: 6px;
  background: rgba(255, 255, 255, 0.2);
  padding: 6px 10px;
  border-radius: 12px;
  font-size: 12px;
  cursor: pointer;
  transition: transform 0.2s;
}

.exercise:hover {
  transform: scale(1.05);
}

.circulo {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  transition: all 0.3s;
}

.circulo.activo {
  background: #10b981;
  color: white;
  border: 1px solid #fff;
}

.progreso-contenedor {
  margin-top: auto;
}

.progreso-texto {
  font-size: 14px;
  margin-bottom: 6px;
}

.barra-fondo {
  width: 100%;
  height: 10px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 6px;
  overflow: hidden;
}

.barra {
  height: 10px;
  background: linear-gradient(90deg, #10b981, #3b82f6);
  border-radius: 6px;
  transition: width 0.5s ease;
}

/* Modal */
.modal-fondo {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background: linear-gradient(135deg, #208862, #3b82f6);
  padding: 24px;
  border-radius: 20px;

  color: white;
  text-align: left;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4);
  animation: modalAppear 0.3s ease;
}

@keyframes modalAppear {
  from {
    transform: translateY(-20px);
    opacity: 0;
  }

  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.modal h3 {
  margin-bottom: 16px;
  font-size: 20px;
  font-weight: bold;
}

.modal-info p {
  margin: 6px 0;
  font-size: 14px;
}

.cerrar-btn {
  margin-top: 16px;
  padding: 8px 16px;
  background: white;
  color: #208862;
  font-weight: bold;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: background 0.2s;
}

.cerrar-btn:hover {
  background: #f3f3f3;
}
</style>
