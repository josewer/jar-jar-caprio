<script setup>
import RutineCard from './Routine.vue';
import HeaderComponent from './HeaderComponent.vue';

</script>

<template>
  <HeaderComponent />
  <div class="dashboard">
    <RutineCard/>
    <RutineCard/>
    <RutineCard/>
    <RutineCard/>
    <RutineCard/>
  </div>
</template>

<style scoped>
.dashboard {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px;
  overflow-x: auto;
  scroll-behavior: smooth;
  justify-content: space-evenly;
}

.dashboard::-webkit-scrollbar {
  height: 8px;
}

.dashboard::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 4px;
}

.dashboard::-webkit-scrollbar-track {
  background: transparent;
}
</style>