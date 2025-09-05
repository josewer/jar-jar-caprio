<script setup lang="ts">
import HeaderComponent from '../../components/HeaderComponent.vue';
import { useExerciseStore } from '../../stores/exercise';
import { router } from '../../router';
import { onMounted, ref } from 'vue';
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import ModalComponent from '../../components/ModalComponent.vue';

const exerciseStore = useExerciseStore();
const rowSelected = ref()

const resetPropsModal = {
    caption: '',
    description: '',
    showModal: false
};

const propsModal = ref({ ...resetPropsModal })

const handleRemove = async (remove: boolean) => {

    propsModal.value = { ...resetPropsModal };

    if (!remove) { return; }

    await exerciseStore.deleteExercise(rowSelected.value);
    rowSelected.value = '';
    toast.success("Successfully deleted.")
}

const showModalRemove = (id: string) => {
    rowSelected.value = id;
    propsModal.value.caption = 'Delete exercise'
    propsModal.value.description = 'Are you sure you want to delete this exercise?'
    propsModal.value.showModal = true
}


const handleCreate = () => {
    router.push({
        name: "createExercise"
    })
}

const handleRefresh = async () => {
    await exerciseStore.getAll();
}


const openViewExercise = (id: string) => {
    console.log(id)
    router.push({
        name: "exercise-detail",
        params: { id }
    })
}

onMounted(async () => {
    await exerciseStore.getAll();
})

</script>

<template>

    <HeaderComponent />
    <ModalComponent @handleRemove="handleRemove" :caption="propsModal.caption" :description="propsModal.description"
        :show-modal="propsModal.showModal" />

    <div class="table-container">
        <div class="button-panel">
            <button @click="handleCreate">Create</button>
            <button @click="openViewExercise(rowSelected)" :disabled=!rowSelected> Edit</button>
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
                <tr @dblclick="openViewExercise(exercise.id)" @click="rowSelected = exercise.id"
                    :class="{ 'row-selected': rowSelected === exercise.id }" v-for="exercise in exerciseStore.exercises"
                    :key="exercise.id">
                    <td>{{ exercise.name }}</td>
                    <td>{{ exercise.category }}</td>
                    <td>{{ exercise.muscle }}</td>

                    <td @click="showModalRemove(exercise.id)" class="btn-remove" title="Remove"> ❌ </td>
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

    /* apila verticalmente los hijos */
    align-items: center;

    /* centra la tabla horizontalmente */
    padding-top: 2rem;
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
