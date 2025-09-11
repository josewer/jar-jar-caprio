<script setup>
import { ref, computed } from 'vue';

const rutine = ref({
  name: "Espalda",
  status: false,
  icon: "🏋️",
  exercises: [
    { name: "Remo", estimatedTimeMinutes: 5, status: true },
    { name: "Jalón al pecho", estimatedTimeMinutes: 5, status: true },
    { name: "Dominadas asistidas", estimatedTimeMinutes: 5, status: true },
    { name: "Remo a una mano", estimatedTimeMinutes: 5, status: true },
    { name: "Pull-over", estimatedTimeMinutes: 5, status: true },
    { name: "Peso muerto", estimatedTimeMinutes: 10, status: true },
    { name: "Hiperextensiones", estimatedTimeMinutes: 5, status: false }
  ]
});

const entrenosPlanificados = rutine.value.exercises.length;
const entrenosCompletados = computed(() =>
  rutine.value.exercises.filter(f => f.status).length
);

const totalTiempo = computed(() => {
  const total = rutine.value.exercises.reduce((acc, current) => {
    return acc + (current.estimatedTimeMinutes || 0);
  }, 0);

  const horas = Math.floor(total / 60);
  const minutos = total % 60;

  return horas > 0 ? `${horas}h ${minutos}m` : `${minutos}m`;
});
</script>

<template>
  <div class="tarjeta">
    <!-- Título -->
    <h2 class="titulo">{{ rutine.icon }} {{ rutine.name }}</h2>

    <!-- Tiempo total -->
    <div class="tiempo-total">
      <p class="tiempo">{{ totalTiempo }}</p>
      <p class="subtexto">Tiempo total estimado</p>
    </div>

    <!-- Ejercicios en fila -->
    <div class="exercises">
      <div v-for="(exercise, index) in rutine.exercises" :key="index" class="exercise">
        <div :class="['circulo', exercise.status ? 'activo' : '']">
          {{ exercise.status ? '✓' : '' }}
        </div>
        <span class="nombre">{{ exercise.name }}</span>
      </div>
    </div>

    <!-- Barra de progreso -->
    <div class="progreso-contenedor">
      <p class="progreso-texto">
        Ejercicios: {{ entrenosCompletados }} / {{ entrenosPlanificados }}
      </p>
      <div class="barra-fondo">
        <div
          class="barra"
          :style="{ width: ((entrenosCompletados / entrenosPlanificados) * 100) + '%' }"
        ></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Tarjeta */
.tarjeta {
  background: linear-gradient(135deg, #34d399, #3b82f6);
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

/* Título */
.titulo {
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 16px;
}

/* Tiempo total */
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

/* Ejercicios en fila */
.exercises {
  display: flex;
  flex-wrap: wrap; /* permite varias filas si son muchos */
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
}

/* Círculo */
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

/* Barra de progreso */
.progreso-contenedor {
  margin-top: auto; /* empuja la barra al final */
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
</style>
