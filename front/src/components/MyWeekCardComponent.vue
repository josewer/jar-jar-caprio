<script setup>
import { ref, computed } from 'vue';
import { router } from '../router/index.js'

const dias = ref([
  { letra: "L", entrenado: true },
  { letra: "M", entrenado: false },
  { letra: "X", entrenado: true },
  { letra: "J", entrenado: false },
  { letra: "V", entrenado: true },
  { letra: "S", entrenado: false },
  { letra: "D", entrenado: false },
]);

const entrenosPlanificados = 4;
const entrenosCompletados = computed(() => dias.value.filter(d => d.entrenado).length);
const totalTiempo = "3h 20m";

const ejercicios = ref([
  { nombre: "Press Banca", icono: "🏋️" },
  { nombre: "Cinta", icono: "🏃" },
  { nombre: "Sentadillas", icono: "🦵" },
]);

const handleClickCard = () => {
  router.push({ name: 'RoutineDashboard' });
}

</script>

<template>
  <div class="tarjeta" @click="handleClickCard">
    <!-- Título -->
    <h2 class="titulo">📅 Mi semana</h2>

    <!-- Mini calendario -->
    <div class="calendario">
      <div v-for="(day, index) in dias" :key="index" class="dia">
        <span class="letra">{{ day.letra }}</span>
        <div :class="['circulo', day.entrenado ? 'activo' : '']">
          {{ day.entrenado ? '✓' : '' }}
        </div>
      </div>
    </div>

    <!-- Barra de progreso -->
    <div class="progreso-contenedor">
      <p class="progreso-texto">Entrenamientos: {{ entrenosCompletados }} / {{ entrenosPlanificados }}</p>
      <div class="barra-fondo">
        <div class="barra" :style="{ width: ((entrenosCompletados / entrenosPlanificados) * 100) + '%' }"></div>
      </div>
    </div>

    <!-- Tiempo total -->
    <div class="tiempo-total">
      <p class="tiempo">{{ totalTiempo }}</p>
      <p class="subtexto">Tiempo total entrenado</p>
    </div>

    <!-- Ejercicios -->
    <div class="ejercicios">
      <div class="ejercicio" v-for="(ej, i) in ejercicios" :key="i">
        <span>{{ ej.icono }}</span>
        <span class="nombre">{{ ej.nombre }}</span>
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
  width: 300px;
  flex-shrink: 0;
  /* para scroll horizontal */
  color: white;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  cursor: pointer;
}

.tarjeta:hover {
  background: linear-gradient(135deg, #34d399, #2858a7);
  transform: scale(1.05);
}

/* Título */
.titulo {
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 20px;
}

/* Calendario mini */
.calendario {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.dia {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.letra {
  font-weight: bold;
  margin-bottom: 6px;
}

.circulo {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  /* gris suave por defecto */
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  transition: all 0.3s;
  border: 2px solid rgba(255, 255, 255, 0.4);
  /* borde sutil para que quede definido */
}

.circulo.activo {
  background: #10b981;
  /* verde sólido */
  border: 2px solid #ffffff;
  /* borde blanco nítido */
  box-shadow: 0 0 6px rgba(16, 185, 129, 0.7);
  /* glow verde suave */
}

/* Barra de progreso */
.progreso-contenedor {
  margin-bottom: 20px;
}

.progreso-texto {
  font-size: 14px;
  margin-bottom: 6px;
}

.barra-fondo {
  width: 100%;
  height: 12px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 6px;
  overflow: hidden;
}

.barra {
  height: 12px;
  background: linear-gradient(90deg, #10b981, #3b82f6);
  border-radius: 6px;
  transition: width 0.5s ease;
}

/* Tiempo total */
.tiempo-total {
  text-align: center;
  margin-bottom: 20px;
}

.tiempo {
  font-size: 26px;
  font-weight: bold;
}

.subtexto {
  font-size: 12px;
  opacity: 0.8;
}

/* Ejercicios */
.ejercicios {
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
}

.ejercicio {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.nombre {
  font-size: 12px;
  margin-top: 4px;
  opacity: 0.8;
}
</style>
