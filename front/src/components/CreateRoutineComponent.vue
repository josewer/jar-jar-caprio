<script setup>
import HeaderComponent from '../components/HeaderComponent.vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { router } from '../router/index.js';
import SpinComponent from './SpinnerComponent.vue';
import { ToastCumtom } from '../../utils/toast.js';
import { useRoutineStore } from '../stores/routine.js';
import { routineSchema } from '../validation/routineSchema.js';
import { Routine } from '../model/Routine.js';
import ExerciseComponent from './ExerciseComponent.vue';

const routineStore = useRoutineStore();

const route = useRoute();
const params = route?.params ?? null;
const id = params?.id ?? null;
const isEdit = !!id;

const isLoading = ref(true);

const initialValues = ref({
  id: '',
  name: '',
  description: ''
});

const handleSubmit = async (values, { resetForm }) => {
  try {
    if (isEdit) {
      const routine = new TemplateRoutine(values.name, values.description, id);
      await routineStore.update(id, routine);
      router.push({ name: 'Routines' }).then(() => {
        ToastCumtom.success("Modificado correctamente.");
      });
    } else {
      const routine = new Routine(values.name, values.description);
      await routineStore.create(routine);
      router.push({ name: 'Routines' }).then(() => {
        ToastCumtom.success("Creado correctamente.");
      });
    }
    resetForm();
  } catch (error) {
    ToastCumtom.error(error.message, error.status);
  }
};

const showModalExercises = ref(false);

const setShowModalExercises = (value) => {
  showModalExercises.value = value;
}

const addExercises = (exercisesSeleted) => {
  showModalExercises.value = false;
  console.log(exercisesSeleted)
}

onMounted(async () => {
  if (isEdit) {
    try {
      const routine = await routineStore.getById(id);
      if (routine) {
        initialValues.value = { ...routine };
      } else {
        ToastCumtom.error("Template routine not found.");
        router.push({ name: 'templateRoutines' });
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
    <Form :validation-schema="routineSchema" :key="initialValues.id" :initial-values="initialValues"
      @submit="handleSubmit" id="template-routine-form">
      <h2 class="form-title">{{ isEdit ? "Modificar rutina" : "Crear rutina" }}</h2>

      <div class="form-group">
        <label for="nameRoutine">Nombre:</label>
        <Field as="input" id="nameRoutine" type="text" name="nameRoutine" placeholder="💪 Dia de brazos" />
        <ErrorMessage class="msg-error" name="nameRoutine" />
      </div>

      <!-- Description -->
      <div class="form-group">
        <label for="description">Descripción:</label>
        <Field as="textarea" id="description" name="description" rows="4" placeholder="El dia que más me gusta..." />
        <ErrorMessage class="msg-error" name="description" />
      </div>

      <button id="btAddExercise" type="button" @click="setShowModalExercises(true)">
        ➕ Añadir ejercicio
      </button>
      <button id="btSubmit" type="submit">
        💾 Guardar rutina
      </button>
    </Form>
  </div>
  <div class="modal" v-if="showModalExercises">
    <ExerciseComponent :is-modal="true" @addExercises="addExercises" />
  </div>

</template>

<style scoped>
.msg-error {
  color: red;
}

.form-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  overflow-y: auto;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 400px;
  max-height: 90vh;
  padding: 2rem;
  border-radius: 12px;
  background-color: #f5f5f5;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
}

.form-title {
  text-align: center;
  margin-bottom: 1rem;
  color: #1abc9c;
  font-size: 1.8rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--label-form-color);
  font-size: 0.95rem;
}

.form-group input,
.form-group textarea {
  padding: 0.5rem 0.75rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.form-group input:focus,
.form-group textarea:focus {
  border-color: #1abc9c;
  box-shadow: 0 0 5px rgba(26, 188, 156, 0.5);
  outline: none;
}

form button {
  padding: 0.75rem;
  background-color: #1abc9c;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

form button:hover {
  background-color: #16a085;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  background: rgba(0, 0, 0, 0.55);
  overflow-y: auto;
}
</style>
