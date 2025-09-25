<script setup lang="ts">

import ModalComponent from '../components/ModalComponent.vue';
import { ref } from 'vue';


const props = defineProps({
    exercises : {
        type : Array
    }
})

const emit = defineEmits(["addExercise"])


const rowSelected = ref()

const resetPropsModal = {
    caption: '',
    description: '',
    showModal: false
};

const propsModal = ref({ ...resetPropsModal })


const addExercise = () => {
    emit("addExercise");
}

const handleRemove = (value) => {

}

</script>

<template>

    <ModalComponent @handleRemove="handleRemove" :caption="propsModal.caption" :description="propsModal.description"
        :show-modal="propsModal.showModal" />

    <div class="table-container">
        <div class="button-panel">
            <button @click="addExercise">Añadir</button>
        </div>
        <table class="exercise-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Muscle</th>
                    <th style="text-align: center;">Remove</th>
                </tr>
            </thead>
            <tbody>
                <tr @click="rowSelected = exercise.id"
                    :class="{ 'row-selected': rowSelected === exercise.id }" v-for="exercise in props.exercises"
                    :key="exercise.id">
                    <td>{{ exercise.name }}</td>
                    <td>{{ exercise.type }}</td>
                    <td>{{ exercise.mainMuscle }}</td>

                    <td class="btn-remove" title="Remove"> ❌ </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped>
.btn-remove {
    text-align: center;
}

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
    background: #fff;
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
</style>
