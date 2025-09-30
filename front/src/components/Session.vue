<script setup lang="ts">
import Countdown from './Countdown.vue';
import { useRoutineStore } from '../stores/routine'
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { getDifficultyColor, parseTimeToSeconds } from '../../utils/functions';
import { useExerciseStore } from '../stores/exercise';

const routineStore = useRoutineStore();
const exerciseStore = useExerciseStore();

const route = useRoute();
const params = route?.params ?? null;
const id = params?.id ?? null;
const numExercise = ref();
const routine = ref();
const currentExercise = ref();
const currentTemplateExercise = ref();
const showExercise = ref(false);
const secondsDisplay = ref();
const totalExercises = ref();
const totalExercisesCompleted = ref(0);
const currentSerie = ref(0);

onMounted(async () => {
    routine.value = await routineStore.getById(id);
    numExercise.value = 0;

})


watch(numExercise, async () => {
    currentTemplateExercise.value = routine.value.templateExercises[numExercise.value];
    totalExercises.value = routine.value.templateExercises.length;
    currentExercise.value = await exerciseStore.getById(currentTemplateExercise.value.exercise.id);

    const timePerSetSeconds = parseTimeToSeconds(currentTemplateExercise.value.timePerSet)

    secondsDisplay.value =
        currentTemplateExercise.type === 'R'
            ? (4 * currentTemplateExercise.numRepeats)
            : (timePerSetSeconds)

})


watch(currentSerie, async () => {
    const timePerSetSeconds = parseTimeToSeconds(currentTemplateExercise.value.timePerSet)

    secondsDisplay.value =
        currentTemplateExercise.type === 'R'
            ? (4 * currentTemplateExercise.numRepeats)
            : (timePerSetSeconds)
})

const endAnimation = () => {
    showExercise.value = true;
}

setInterval(() => {
    if (showExercise.value && secondsDisplay.value > 0) {
        secondsDisplay.value--;
    }
}, 1000);

const nextExercise = () => {

    if (currentSerie.value === currentTemplateExercise.value.numSeries) {
        showExercise.value = false;
        totalExercisesCompleted.value++;
        numExercise.value++;
        currentSerie.value = 0;
    } else {
        currentSerie.value++;
    }
}


</script>

<template>
    <div class="exercise-modal">
        <Countdown v-if="!showExercise" @endAnimation="endAnimation" />

        <div v-else class="modal-container" :style="{ background: getDifficultyColor(currentExercise.difficulty) }">
            <div class="modal-top">
                <div class="modal-img-container">
                    <img :src="`/src/assets/exercises/gifs/${currentExercise.id}.gif`" class="modal-img" />
                    <h2 class="countdown-number">{{ secondsDisplay % 2 === 0 ? '⌛' : '⏳' }} {{ secondsDisplay }}</h2>
                </div>
                <div class="modal-info">
                    <h2 class="modal-title">{{ currentExercise.name }}</h2>
                    <p class="modal-description">{{ currentExercise.description }}</p>

                    <div class="modal-bottom">
                        <p><strong>Tipo:</strong> {{ currentExercise.type }}</p>
                        <p><strong>Dificultad:</strong> {{ currentExercise.difficulty }}</p>
                        <p><strong>Equipo:</strong> {{ currentExercise.equipment.join(', ') || 'Ninguno' }}</p>
                        <p><strong>Músculo principal:</strong> {{ currentExercise.mainMuscle }}</p>
                        <p><strong>Músculos involucrados:</strong> {{ currentExercise.involvedMuscles.join(', ')
                            ||'Todos' }}</p>
                    </div>
                </div>
            </div>

            <div class="modal-bottom">
                <button @click="nextExercise" class="btn-save ">Siguente ejercicio</button>
            </div>
        </div>
    </div>
</template>


<style scoped>
.exercise-modal {
    height: 100vh;
    background: rgba(0, 0, 0, 0.85);
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
}

.modal-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.modal-top {
    display: flex;
    gap: 2rem;
    flex: 1;
    padding: 1rem;
}

.modal-img-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    justify-content: flex-start;
}

.modal-img {
    width: 100%;
    max-width: 500px;
    border-radius: 16px;
}

.modal-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.modal-title {
    font-size: 28px;
    margin: 0;
}

.modal-description {
    font-size: 16px;
    line-height: 1.5;
    opacity: 0.9;
}

.modal-bottom {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    font-size: 15px;
    border-top: 1px solid rgba(255, 255, 255, 0.2);
    padding-top: 0.75rem;
    padding: 1rem;
}

.countdown-number {
    font-size: 75px;
    font-weight: bold;
    color: white;
}

.btn-save {
    padding: 0.6rem 1rem;
    border: none;
    border-radius: 8px;
    font-size: 0.95rem;
    cursor: pointer;
    transition: background-color 0.2s;
    background-color: #1abc9c;
    color: #fff;
}

.btn-save:hover {
    background-color: #16a085;
}
</style>
