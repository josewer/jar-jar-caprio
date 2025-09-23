<script setup>
import HeaderComponent from '../components/HeaderComponent.vue';
import { Exercise } from '../model/Exercise.js';
import { ExerciseType } from '../enums/ExerciseType.js';
import { Muscles } from '../enums/Muscles.js';
import { exerciseSchema } from '../validation/exerciseShema.js';
import { Form, Field, ErrorMessage } from 'vee-validate';
import { useExerciseStore } from '../stores/exercise.js';
import { router } from '../router/index.js'
import { useRoute } from 'vue-router';
import { onMounted, ref } from 'vue';
import SpinComponent from './SpinnerComponent.vue';
import { ToastCumtom } from '../../utils/toast.js';

const categoryOptions = Object.values(ExerciseType);
const musclesOptions = Object.values(Muscles);

const exerciseStore = useExerciseStore();

const route = useRoute();
const params = route?.params ?? null;
const id = params?.id ?? null;
const isEdit = !!id;
const isLoading = ref(true)

const handleSubmit = async (values, { resetForm }) => {

    try {
        if (isEdit) {
            const exercise = new Exercise(values.name, values.category, values.muscle, id)
            await exerciseStore.update(id, exercise);
            router.push({ "name": "exercises" }).then(() => {
                ToastCumtom.success("Successfully updated.");
            });
        } else {
            const exercise = new Exercise(values.name, values.category, values.muscle)
            await exerciseStore.create(exercise);
            router.push({ "name": "exercises" }).then(() => {
                ToastCumtom.success("Successfully created.");
            });
        }

        resetForm();
    } catch (error) {
        ToastCumtom.error(error.message, error.status);
    }
}

const initialValues = ref({
    id: '',
    name: '',
    category: '',
    muscle: ''
});


onMounted(async () => {
    if (isEdit) {
        try {
            const exercise = await exerciseStore.getById(id);
            if (exercise) {
                initialValues.value = { ...exercise };
            } else {
                ToastCumtom.error('Exercise is not found.');
                router.push({ name: 'exercises' })
            }
        } catch (error) {
             ToastCumtom.error(error.message, error.status);
        }
    }

    isLoading.value = false;
});


</script>

<template>
    <HeaderComponent />

    <SpinComponent v-if="isLoading" />
    <div class="form-container" v-else>
        <Form :validation-schema="exerciseSchema" :key="initialValues.id" :initial-values="initialValues"
            @submit="handleSubmit" id="exercise-form">
            <h2 class="form-title">Register Exercise</h2>

            <div class="form-group">
                <label for="name">Exercise name:</label>
                <Field as="input" type="text" id="name" name="name" placeholder="Enter exercise name" required />
                <ErrorMessage class="msg-error" name="name" />
            </div>

            <!-- Exercise category -->
            <div class="form-group">
                <label for="category">Exercise Category:</label>
                <Field as="select" id="category" name="category" required>

                    <option v-for="category in categoryOptions" :key="category" :value="category">
                        {{ category }}
                    </option>
                </Field>
                <ErrorMessage class="msg-error" name="category" />
            </div>

            <div class="form-group">
                <label for="muscle">Trained muscle:</label>
                <Field as="select" id="muscle" name="muscle" required>

                    <option v-for="muscle in musclesOptions" :key="muscle" :value="muscle">
                        {{ muscle }}
                    </option>
                </Field>
                <ErrorMessage class="msg-error" name="muscle" />
            </div>

            <button id="btSubmit" type="submit">Save Exercise</button>
        </Form>
    </div>
</template>


<style lang="css" scoped>
.msg-error {
    color: red;
}

/* Contenedor principal */
.form-container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    overflow-y: auto;
}

/* Formulario */
form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    width: 400px;
    max-height: 90vh;
    padding: 2rem;
    border-radius: 12px;
    background-color: #ffffff;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    overflow-y: auto;
}

/* Título del formulario */
.form-title {
    text-align: center;
    margin-bottom: 1rem;
    color: #1abc9c;
    /* coincide con el header */
    font-size: 1.8rem;
}

/* Cada grupo de label + input/select */
.form-group {
    display: flex;
    flex-direction: column;
}

/* Labels */
.form-group label {
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: var(--label-form-color);
    /* un verde-turquesa más oscuro para contraste */
    font-size: 0.95rem;
}

/* Inputs y selects */
.form-group input,
.form-group select {
    padding: 0.5rem 0.75rem;
    border: 1px solid #ccc;
    border-radius: 6px;
    font-size: 1rem;
    transition: border-color 0.2s, box-shadow 0.2s;
}

.form-group input:focus,
.form-group select:focus {
    border-color: #1abc9c;
    /* mismo color que el header */
    box-shadow: 0 0 5px rgba(26, 188, 156, 0.5);
    outline: none;
}

/* Botón */
form button {
    padding: 0.75rem;
    background-color: #1abc9c;
    /* verde header */
    color: #fff;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.2s;
}

form button:hover {
    background-color: #16a085;
    /* verde-turquesa más oscuro */
}
</style>