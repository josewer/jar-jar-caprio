<script setup>
import { ref } from 'vue';
import ExerciseDetails from './ExerciseDetails.vue';

const props = defineProps({
  routine: Object
})

const showModal = ref(false);
const selectedTemplate = ref(null);

function openModal(template) {
  selectedTemplate.value = template;
  showModal.value = true;
}

function closeModal() {
  showModal.value = false;
  selectedTemplate.value = null;
}

</script>

<template>

  <div class="template-card">
    <h2 class="title">{{ props.routine.name }}</h2>

    <div class="templates">
      <div v-for="template in props.routine.templateExercises" :key="template.id" class="template"
        @click="openModal(template)">
        {{ template.exercise.name }}
      </div>
    </div>

    <!-- Modal -->
    <div v-if="showModal" class="modal">
      <ExerciseDetails @closeModal="closeModal" :id="selectedTemplate.exercise.id" />
    </div>

  </div>
</template>


<style scoped>



.title {
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 16px;
}

.templates {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
}

.template {
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


.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}
</style>
