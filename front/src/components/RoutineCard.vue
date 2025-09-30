<script setup>
import { ref, computed } from 'vue';
import ExerciseDetails from './ExerciseDetails.vue';
import { router } from '../router';
import { parseTimeToSeconds } from '../../utils/functions';
import ModalComponent from './ModalComponent.vue';
import { useRoutineStore } from '../stores/routine';

const routineStore = useRoutineStore();

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


const editRoutine = () => {
  router.push({
    name: 'routine-detail',
    params: {
      id: props.routine.id
    }
  })
}


const totalTimeEstimated = computed(() => {
  const timeEstimatedSeconds = props.routine.templateExercises.reduce((acc, curr) => {
    const restTimeSeconds = parseTimeToSeconds(curr.restTime)
    const timePerSetSeconds = parseTimeToSeconds(curr.timePerSet)

    const exerciseTime =
      curr.type === 'R'
        ? (4 * curr.numRepeats * curr.numSeries) + ((curr.numSeries - 1) * restTimeSeconds)
        : (timePerSetSeconds * curr.numSeries) + ((curr.numSeries - 1) * restTimeSeconds)

    return acc + exerciseTime
  }, 0)

  // Convertir a horas, minutos y segundos
  const hours = Math.floor(timeEstimatedSeconds / 3600)
  const minutes = Math.floor((timeEstimatedSeconds % 3600) / 60)
  const seconds = timeEstimatedSeconds % 60

  if (hours > 0) return `${hours}h ${minutes}m ${seconds}s`
  if (minutes > 0) return `${minutes}m ${seconds}s`
  return `${seconds}s`
})


const resetPropsModal = {
  caption: '',
  description: '',
  showModal: false
};

const propsModal = ref({ ...resetPropsModal })

const showModalRemove = () => {
  propsModal.value.caption = 'Borrar rutina.'
  propsModal.value.description = '¿Estas seguro que quieres borrar esta rutina?'
  propsModal.value.showModal = true
}

const removeRoutine = async (remove) => {

  propsModal.value = { ...resetPropsModal };

  if (remove) {
     await routineStore.deleteRutine(props.routine.id)
  }
}

</script>

<template>

  <ModalComponent @handleRemove="removeRoutine" :caption="propsModal.caption"
    :description="propsModal.description" :show-modal="propsModal.showModal" />

  <div class="template-card" @click.self="editRoutine">

    <div class="card-buttons-top">
      <button class="btn-top" @click.stop="console.log('Botón 1')">▶️</button>
      <button class="btn-top" @click="showModalRemove">❌</button>
    </div>

    <h2 class="title" @click.self="editRoutine">{{ props.routine.name }}</h2>

    <div class="tiempo-total" @click="editRoutine">
      <p class="tiempo">{{ totalTimeEstimated }}</p>
      <p class="subtexto">Tiempo total estimado</p>
    </div>


    <div class="templates" @click.self="editRoutine">
      <div v-for="template in props.routine.templateExercises" :key="template.id" class="template"
        @click.stop.self="openModal(template)">
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

.card-buttons-top {
  display: flex;
  justify-content: flex-end;
}

.btn-top {
  background-color: transparent;
  border: 0;
  cursor: pointer;
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
}


.template:hover {
  transform: scale(1.05);
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
