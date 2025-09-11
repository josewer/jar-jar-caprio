<script setup>
import CardComponent from '../components/CardComponent.vue';
import HeaderComponent from '../components/HeaderComponent.vue';
import RutineCard from '../components/RutineCard.vue';
</script>

<template>
  <HeaderComponent />
  <div class="dashboard">
    <CardComponent />
    <RutineCard />
    <CardComponent />
    <CardComponent />
    <CardComponent />
    <CardComponent />
    <CardComponent />
    <CardComponent />
    <CardComponent />
    <CardComponent />
    <CardComponent />
    <CardComponent />
    <CardComponent />
    <CardComponent />
    <CardComponent />
    <CardComponent />

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
