<script setup>
import HeaderComponent from '../../components/HeaderComponent.vue';
import { useExerciseStore } from '../../stores/exercise';
import { router } from '../../router';
import { onMounted , ref} from 'vue';

const exerciseStore = useExerciseStore();

const rowSelected = ref()

const openViewExercise = (id) => {
    console.log(id)
    router.push({
        name: "exercise-detail",
        params: { id }
    })
}

const handleRemove = async (id) => {
    await exerciseStore.deleteExercise(id);
    rowSelected.value = '';
}

const handleCreate = () => {
    router.push({
        name: "createExercise"
    })
}

const handleRefresh = async () => {
    await exerciseStore.getAll();
}


onMounted(async () => {
    await exerciseStore.getAll();
})



</script>

<template>
    <HeaderComponent />

    <div class="table-container">
        <div class="button-panel">
            <button @click="handleCreate">Create</button>
            <button @click="openViewExercise(rowSelected)" :disabled=!rowSelected>Edit</button>
            <button @click="handleRefresh">Refresh</button>
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
                <tr @dblclick="openViewExercise(exercise.id)" 
                    @click="rowSelected = exercise.id"
                    :class="{ 'row-selected': rowSelected === exercise.id }"
                v-for="exercise in exerciseStore.exercises"
                    :key="exercise.id">
                    <td>{{ exercise.name }}</td>
                    <td>{{ exercise.category }}</td>
                    <td>{{ exercise.muscle }}</td>

                    <td @click="handleRemove(exercise.id)" class="btn-remove" title="Remove"> ❌ </td>
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
    width: 80%;
    max-width: 900px;
}

/* Estilo del botón */
.button-panel button {
    padding: 0.6rem 1.2rem;
    background-color: #057760;
    /* verde header */
    color: #fff;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s, transform 0.1s;
    margin-right: 1em;
    ;
}

.button-panel button:hover {
    background-color: #0b5546;
    /* verde-turquesa más oscuro */
    transform: scale(1.03);
}


/* Contenedor para centrar */
.table-container {
    display: flex;
    flex-direction: column;
    /* apila verticalmente los hijos */
    align-items: center;
    /* centra la tabla horizontalmente */
    padding: 2rem;
    overflow-x: auto;
}


/* Tabla */
.exercise-table {
    border-collapse: collapse;
    width: 80%;
    max-width: 900px;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* Encabezado */
.exercise-table thead {
    background-color: #1abc9c;
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
    background-color: rgba(26, 188, 156, 0.1);
    transition: background-color 0.2s ease;
}

.exercise-table tbody tr.row-selected {
    background-color: rgba(26, 188, 156, 0.3);
}

button:disabled {
  pointer-events: none;
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
