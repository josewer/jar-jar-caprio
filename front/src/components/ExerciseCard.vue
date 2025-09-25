<script setup>
import { ref } from 'vue';
import ExerciseDetails from './ExerciseDetails.vue';
import { getDifficultyColor } from '../../utils/functions';
import { ToastCumtom } from '../../utils/toast';

const props = defineProps({
    exercise: Object,
    showColorDifficulty: {
        type: Boolean,
        default: () => false
    },
    showToggleSelection: {
        type: Boolean,
        default: () => false
    },
    selectedExercises: {
        type: Array,
        default: () => []
    }
})

const emit = defineEmits(["addExercise" , "removeExercise"]);

const hoveredExerciseId = ref(null);

// Modal
const showModal = ref(false);
const modalExercise = ref(null);

function openModal(exercise) {
    modalExercise.value = exercise;
    showModal.value = true;
}

function closeModal() {
    showModal.value = false;
    modalExercise.value = null;
}


function toggleSelection(exercise, event) {
    if (event.target.checked) {
        emit("addExercise" , exercise);
        ToastCumtom.success("Ejercicio añadido.")
    } else {
        emit("removeExercise" , exercise);
        ToastCumtom.success("Ejercicio excluido.")
    }
}

</script>

<template>
    <div class="card" :style="{ background: getDifficultyColor(props.exercise.difficulty, props.showColorDifficulty) }"
        @click="openModal(props.exercise)" @mouseenter="hoveredExerciseId = props.exercise.id"
        @mouseleave="hoveredExerciseId = null">
        <div class="card-img-container">
            <img :src="hoveredExerciseId === props.exercise.id
                ? `/src/assets/exercises/webp/${props.exercise.id}.webp`
                : `/src/assets/exercises/thumbnails/${props.exercise.id}.webp`" class="card-img" />

            <input v-if="showToggleSelection" type="checkbox" class="card-checkbox" :checked="props.selectedExercises.includes(props.exercise.id)"
                @click.stop="toggleSelection(props.exercise, $event)" />
        </div>
        <div class="card-content">
            <h3 class="card-title">{{ props.exercise.name }}</h3>
            <p class="card-subtitle">{{ props.exercise.mainMuscle }}</p>
        </div>
    </div>

    <ExerciseDetails v-if="showModal" @closeModal="closeModal" :showColorDifficulty="showColorDifficulty"
        :id="modalExercise.id" />

</template>

<style scoped>
.card {
    background: var(--card-background-color-default);
    border-radius: 16px;
    overflow: hidden;
    color: white;
    cursor: pointer;
    transition: transform 0.3s, box-shadow 0.3s;
    display: flex;
    flex-direction: column;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.card:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.35);
}

.card-img-container {
    position: relative;
    overflow: hidden;
    border-radius: 16px 16px 0 0;
}

.card-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.3s;
}

.card:hover .card-img {
    transform: scale(1.05);
}

.card-checkbox {
    position: absolute;
    top: 8px;
    right: 8px;
    width: 22px;
    height: 22px;
    border: 2px solid #fff;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.8);
    cursor: pointer;
}

.card-checkbox:checked {
    background: #10b981;
    border-color: #10b981;
}

.card-content {
    padding: 0.5rem 0.75rem;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
}

.card-title {
    font-weight: 600;
    font-size: 15px;
    line-height: 1.2;
    color: white;
}

.card-subtitle {
    font-size: 13px;
    opacity: 0.9;
    color: #f0f0f0;
}
</style>
