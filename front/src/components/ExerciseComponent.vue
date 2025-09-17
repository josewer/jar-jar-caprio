<script setup>
import { computed } from "vue";

const props = defineProps({
  exercise: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["close"]);

// Cálculo de calorías:
// - Si hay peso (>0) y reps, usamos: reps * sets * peso * 0.1 (heurística fuerza).
// - Si no hay peso, fallback por tiempo: minutos * 5 kcal/min (estimación aproximada).
const calcularCalorias = () => {
  const peso = Number(props.exercise.weightKg) || 0;
  const reps = Number(props.exercise.reps) || 0;
  const sets = Number(props.exercise.sets) || 1;
  if (peso > 0 && reps > 0) {
    return Math.round(reps * sets * peso * 0.1);
  } else {
    const minutos = Number(props.exercise.estimatedTimeMinutes) || 0;
    return Math.round(minutos * 5);
  }
};

const tip =
  "Túmbate boca abajo en el banco, fija los pies y eleva el torso hasta alinear la espalda, luego baja controladamente.";
const description =
  "Las hiperextensiones son un ejercicio enfocado en la zona lumbar que fortalece la parte baja de la espalda, glúteos e isquiotibiales, ayudando a mejorar la postura y prevenir lesiones.";

// Emoji según sensación (reactivo)
const sensacionEmoji = computed(() => {
  const nivel = Number(props.exercise.feeling) || 5;
  if (nivel <= 3) return "😴";
  if (nivel <= 6) return "🙂";
  if (nivel <= 8) return "💪";
  return "🔥";
});

function saveAndClose() {
  // aseguramos valores por defecto razonables
  if (props.exercise.sets === undefined || props.exercise.sets === null) props.exercise.sets = 1;
  if (props.exercise.reps === undefined || props.exercise.reps === null) props.exercise.reps = 0;
  emit("close");
}
</script>

<template>
  <div class="modal-fondo" @click.self="saveAndClose">
    <div class="modal">
      <!-- Header -->
      <div class="modal-header">
        <div>
          <h3 class="modal-titulo">{{ exercise.name }}</h3>
          <h4 class="modal-musculo">Músculo: {{ exercise.muscle }}</h4>
        </div>
      </div>

      <!-- Description -->
      <p class="modal-descripcion">{{ description }}</p>

      <!-- GIF / image -->
      <div class="exercise-img">
        <!-- si usas import para cada gif, asigna exercise.gif con la URL adecuada -->
        <img src="../assets/Hyperextension.gif" alt="Ejercicio" />
      </div>

      <p class="modal-tip"><em>{{ tip }}</em></p>

      <!-- Editable fields -->
      <div class="modal-fields">
        <label>
          Repeticiones (por serie):
          <input type="number" v-model.number="exercise.reps" min="0" />
        </label>

        <label>
          Series:
          <input type="number" v-model.number="exercise.sets" min="1" />
        </label>

        <p class="total-reps">
          Total repeticiones: <strong>{{ (Number(exercise.reps)||0) * (Number(exercise.sets)||1) }}</strong>
        </p>

        <label class="sensacion">
          Sensación:
          <div class="slider-container">
            <input
              type="range"
              min="1"
              max="10"
              v-model.number="exercise.feeling"
              class="slider"
            />
          </div>
          <div class="sensacion-row">
            <span class="emoji">{{ sensacionEmoji }}</span>
            <span class="valor">{{ exercise.feeling || 5 }}/10</span>
          </div>
        </label>

        <label>
          Tiempo real (min):
          <input type="number" v-model.number="exercise.estimatedTimeMinutes" min="0" />
        </label>

        <label>
          Peso máximo (kg):
          <input type="number" v-model.number="exercise.weightKg" min="0" />
        </label>
      </div>

      <!-- Calorías -->
      <p class="modal-calorias">
        🔥 <strong>Calorías estimadas:</strong> {{ calcularCalorias() }} kcal
      </p>

      <!-- Botones -->
      <div class="modal-actions">
        <button class="cerrar-btn" @click="saveAndClose">Guardar y cerrar</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Fondo */
.modal-fondo {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.25s ease;
}

/* Modal */
.modal {
  background: linear-gradient(135deg, #208862, #3b82f6);
  padding: 28px;
  border-radius: 24px;
  width: 420px;
  color: white;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4);
  box-sizing: border-box;
  animation: modalAppear 0.28s ease;
  display: flex;
  flex-direction: column;
}

/* Header */
.modal-header {
  display: flex;
  gap: 12px;
  align-items: center;
}
.modal-titulo {
  font-size: 22px;
  margin: 0 0 4px 0;
  font-weight: 700;
}
.modal-musculo {
  margin: 0 0 8px 0;
  font-size: 13px;
  opacity: 0.95;
  font-style: italic;
}

/* Description & tip */
.modal-descripcion {
  font-size: 14px;
  margin: 6px 0 12px 0;
  line-height: 1.4;
  opacity: 0.95;
}
.exercise-img {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
}
.exercise-img img {
  width: 100%;
  max-height: 170px;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.35);
}
.modal-tip {
  font-size: 13px;
  margin: 10px 0 14px 0;
  opacity: 0.9;
}

/* Fields */
.modal-fields {
  display: flex;
  flex-direction: column;
}
.modal-fields label {
  display: block;
  margin: 8px 0;
  font-size: 14px;
}
.modal-fields input[type="number"] {
  width: 100%;
  box-sizing: border-box;
  border-radius: 10px;
  border: none;
  padding: 8px 10px;
  margin-top: 6px;
  font-size: 14px;
  box-shadow: inset 0 2px 6px rgba(0,0,0,0.22);
  background: rgba(255,255,255,0.08);
  color: white;
}

/* Total reps */
.total-reps {
  margin: 6px 0 12px 0;
  font-size: 14px;
}

/* Sensation slider */
.sensacion {
  margin-top: 6px;
}
.slider-container {
  width: 100%;
}
.slider {
  -webkit-appearance: none;
  width: 100%;
  height: 8px;
  border-radius: 8px;
  background: linear-gradient(to right, #ef4444, #facc15, #10b981);
  outline: none;
  margin-top: 6px;
}
.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: white;
  border: 2px solid #208862;
  margin-top: -5px;
  cursor: pointer;
  transition: transform 0.15s ease;
}
.slider::-webkit-slider-thumb:hover { transform: scale(1.15); }
.slider::-moz-range-thumb {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: white;
  border: 2px solid #208862;
  cursor: pointer;
}

/* Sensation display */
.sensacion-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 6px;
}
.emoji { font-size: 20px; }
.valor { font-weight: 700; }

/* Calories & actions */
.modal-calorias {
  margin-top: 14px;
  font-size: 15px;
  font-weight: 700;
}
.modal-actions {
  margin-top: 14px;
}
.cerrar-btn {
  width: 100%;
  padding: 12px;
  background: white;
  color: #208862;
  font-weight: 700;
  border: none;
  border-radius: 14px;
  cursor: pointer;
  font-size: 16px;
  transition: transform 0.12s ease, background 0.12s ease;
}
.cerrar-btn:hover {
  transform: scale(1.02);
  background: #f3f3f3;
}

/* Animations */
@keyframes modalAppear {
  from { transform: translateY(-10px) scale(0.98); opacity: 0; }
  to { transform: translateY(0) scale(1); opacity: 1; }
}
@keyframes fadeIn {
  from { opacity: 0; } to { opacity: 1; }
}
</style>
