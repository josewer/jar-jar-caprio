<script setup>
import { onMounted } from 'vue';
import { useRoutineStore } from '../stores/routine';
import HeaderComponent from './HeaderComponent.vue';
import RutineCard from './RoutineCard.vue';
import { router } from '../router';

const routineStore = useRoutineStore();


onMounted(async () => {
  await routineStore.getAll();
});


const createRoutine = () => {
  router.push({
    name: 'routine-create'
  })
}

</script>

<template>
  <HeaderComponent />

  <div class="exercise-selector">

    <div class="grid">
      <div class="template-card create-card" @click="createRoutine" >
        <h2>Nueva rutina</h2>
      </div>
      <RutineCard v-for="routine in routineStore.routines" :key="routine.id" :routine="routine" />
    </div>
  </div>


</template>

<style lang="css" scoped>
.exercise-selector {
  padding: 1rem;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1rem;
}

.create-card {
  background: var(--card-background-color-level-1);
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1rem;
}

.create-card:hover {
  transform: scale(1.05);
}

</style>
