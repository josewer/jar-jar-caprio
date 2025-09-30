<script setup>
import { ref, onMounted } from 'vue';

const showCountdown = ref(true);


const emit = defineEmits(["endAnimation"])

// Colores por número (y GO)
const bgColors = {
  3: 'var(--card-background-color-level-1)',
  2: 'var(--card-background-color-level-2)',
  1: 'var(--card-background-color-level-3)',
  GO: 'var(--card-background-color-default)'
};

const display = ref(3);

onMounted(() => {
  const interval = setInterval(() => {
    if (display.value > 1) {
      display.value--;
    } else if (display.value === 1) {
      display.value = 'GO';
    } else {
      clearInterval(interval);
      showCountdown.value = false; // Oculta la ventana o hace otra acción
      emit("endAnimation");
    }
  }, 1000);
});
</script>

<template>
  <div v-if="showCountdown" class="countdown-overlay" 
       :style="{ background: bgColors[display] || 'rgba(0,0,0,0.7)' }"
       :key="display">
    <div class="countdown-number">{{ display }}</div>
  </div>
</template>

<style scoped>
.countdown-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: overlayPulse 1s ease-in-out forwards;
}

.countdown-number {
  font-size: 100px;
  font-weight: bold;
  color: white;
  animation: countdownAnim 1s ease-in-out forwards;
}

@keyframes countdownAnim {
  0% {
    transform: scale(0.5);
    opacity: 0;
  }
  50% {
    transform: scale(1.5);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 0;
  }
}

@keyframes overlayPulse {
  0% {
    transform: scale(1);
    opacity: 0.7;
  }
  50% {
    transform: scale(1.1);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 0.7;
  }
}
</style>
