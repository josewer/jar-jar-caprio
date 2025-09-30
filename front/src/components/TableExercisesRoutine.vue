<script setup lang="ts">

import ModalComponent from '../components/ModalComponent.vue';
import { ref, watch } from 'vue';
import ExerciseCard from './ExerciseCard.vue';


const props = defineProps({
    exercisesRoutine: {
        type: Array,
        default: () => []
    }
})

const emit = defineEmits(["addExercise" , "openModalEditExercise", "showModalRemove"])

const rowSelected = ref()

watch(props.exercisesRoutine, () => {
    rowSelected.value = null;
});

const resetPropsModal = {
    caption: '',
    description: '',
    showModal: false
};


const propsModal = ref({ ...resetPropsModal })


const addExercise = () => {
    emit("addExercise");
}

const showModalRemove = (value) => { 
    emit("showModalRemove" , value);
}

const menuOpen = ref(null);

const toggleMenu = (id) => {
  menuOpen.value = menuOpen.value === id ? null : id;
};

const editExercise = (exerciseRoutine) => {
    console.log(exerciseRoutine.exerciseId)
    emit("openModalEditExercise" , exerciseRoutine);
};

const closeMenu = () => {
  menuOpen.value = null;
};

</script>

<template>

    <ModalComponent @handleRemove="showModalRemove" :caption="propsModal.caption" :description="propsModal.description"
        :show-modal="propsModal.showModal" />

    <div class="table-container" >
        <div class="button-panel">
            <button type="button" @click="addExercise" >Añadir</button>
            <button type="button" @click="editExercise(rowSelected)" :disabled=!rowSelected>Editar</button>
            <button type="button" class="btn-danger"  @click="showModalRemove(rowSelected)" :disabled=!rowSelected>Eliminar</button>
        </div>
        <table class="exercise-table" @click="closeMenu">
            <thead>
                <tr>
                    <th></th>
                    <th>Series</th>
                    <th>Reps / Tiempo</th>
                    <th>Descanso</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr @click="rowSelected = exerciseRoutine"
                    :class="{ 'row-selected': rowSelected && rowSelected.exerciseId === exerciseRoutine.exerciseId }"
                    v-for="exerciseRoutine in props.exercisesRoutine" :key="exerciseRoutine.exerciseId">
                    <td>
                        <ExerciseCard :exercise="exerciseRoutine.exercise" :compact="true" />
                    </td>

                    <td>{{ exerciseRoutine.numSeries }}</td>
                    <td>{{ exerciseRoutine.type === 'R' ? exerciseRoutine.numRepeats : `${exerciseRoutine.timePerSet} min` }}</td>
                    <td>{{ exerciseRoutine.restTime }} min</td>

                    <td class="menu-dots-container" @click.stop="toggleMenu(exerciseRoutine.exerciseId)">
                    ⋮
                        <div v-if="menuOpen === exerciseRoutine.exerciseId" class="menu-dropdown">
                            <a href="#" @click.prevent="editExercise(exerciseRoutine)">Editar</a>
                            <a href="#" @click.prevent="showModalRemove(exerciseRoutine)">Borrar</a>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped>


/* Contenedor de botón encima de la tabla */
.button-panel {
    margin-bottom: 1em;
    width: 95vw;
}

/* Estilo del botón */
.button-panel button {
    padding: 0.6rem 1.2rem;
    background-color: var(--button-secundary-background);

    /* verde header */
    color: #fff;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s, transform 0.1s;
    margin-right: 1em;
}



.button-panel button:hover {
    background-color: var(--button-hover-secundary-background);
    transform: scale(1.03);
}


/* Contenedor para centrar */
.table-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-x: auto;
}


/* Tabla */
.exercise-table {
    border-collapse: collapse;
    width: 95vw;
    border-radius: 0px 0px 12px 12px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    border-radius: 0.5rem;
    ;
}

/* Encabezado */
.exercise-table thead {
    background-color: var(--table-header-background);
    color: #fff;
}

.exercise-table th {
    padding: 1rem;
    text-align: left;
    font-size: 1rem;
    font-weight: 600;
}

/* Filas */
.exercise-table td {
    padding: 0.9rem 1rem;
    border-bottom: 1px solid #eee;
    font-size: 0.95rem;
    color: #333;
    cursor: pointer;
}

/* Zebra rows */
.exercise-table tbody tr:nth-child(even) {
    background-color: #f9f9f9;
}

.exercise-table tbody tr:nth-child(odd) {
    background: #e6e4e4;
}

/* Hover */
.exercise-table tbody tr:hover {
    background-color: var(--table-hover-background);
    transition: background-color 0.2s ease;
}

.exercise-table tbody tr.row-selected {
    background-color: var(--table-selected-row-background);
}

button:disabled {
    pointer-events: none;
    opacity: 0.6;
    cursor: not-allowed;
}

.exercise-table td:first-child {
    max-width: 60px;
    max-height: 60px;
    overflow: hidden;
    object-fit: cover;
    /* mantiene proporción y recorta */
}

.btn-danger {
    background:  #e74c3c !important; 
}

.btn-danger:hover {
    background: #c0392b;
}

/* Menu 3 puntitos*/

.menu-dots-container {
    position: relative;
    font-size: 9px;
    font-weight: bolder;
    cursor: pointer;
}

.menu-dropdown {
    position: absolute;
    right: 0;
    left: 0;
    top: 0;
 
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    min-width: 120px;
    z-index: 10;
}

.menu-dropdown a {
    display: block;
    padding: 8px 12px;
    text-decoration: none;
    color: #333;
    font-size: 1rem;
    font-weight: 500;
}

.menu-dropdown a:hover {
    background-color: #f0f0f0;
}

</style>
