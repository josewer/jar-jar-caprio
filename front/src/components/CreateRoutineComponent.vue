<script setup>
import HeaderComponent from '../components/HeaderComponent.vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import { ref, onMounted, reactive } from 'vue';
import { useRoute } from 'vue-router';
import { router } from '../router/index.js';
import SpinComponent from './SpinnerComponent.vue';
import { ToastCumtom } from '../../utils/toast.js';
import { useRoutineStore } from '../stores/routine.js';
import { routineSchema } from '../validation/routineSchema.js';
import { Routine } from '../model/Routine.js';
import ExerciseComponent from './ExerciseComponent.vue';
import CreateRoutineExercise from './CreateRoutineExercise.vue';
import TableExercisesRoutine from './TableExercisesRoutine.vue';
import ModalComponent from './ModalComponent.vue';

const routineStore = useRoutineStore();

const route = useRoute();
const params = route?.params ?? null;
const id = params?.id ?? null;
const isEdit = !!id;

const isLoading = ref(true);

const config = reactive({
  isModalEditExerciseOpen: false,
  routineExerciseEdit: null,
  routineExerciseRemove: null
})

const openModalEditExercise = (routineExercise) => {
  console.log(routineExercise.exerciseId)
  config.routineExerciseEdit = routineExercise;
  config.isModalEditExerciseOpen = true;
}

const closeModalEditExercise = () => {
  config.isModalEditExerciseOpen = false;
}

const saveModalEditExercise = (routineExercise) => {
  config.isModalEditExerciseOpen = false;
  const index = exercisesRoutineSeleted.value.findIndex((exercise) => exercise.exerciseId === routineExercise.exerciseId);
  exercisesRoutineSeleted.value[index] = routineExercise;
  ToastCumtom.success("Modificado correctamente.")
}


const getExercises = () => {
  const exercises = [];
  for (let exerciseRoutine of exercisesRoutineSeleted.value) {
    exercises.push(exerciseRoutine.exercise);
  }

  return exercises;
}

const removeRoutineExercise = (remove) => {
  propsModal.value = { ...resetPropsModal };

  if (remove) {
    const index = exercisesRoutineSeleted.value.findIndex((exercise) => exercise.exerciseId === config.routineExerciseRemove.exerciseId);
    exercisesRoutineSeleted.value.splice(index, 1);
    ToastCumtom.success("Borrado correctamente.")
  }
}

const initialValues = ref({
  name: '',
  description: ''
});


const handleSubmit = async (values, { resetForm }) => {

  try {
    if (isEdit) {
       const routine = new Routine(id, values.name, values.description, exercisesRoutineSeleted.value);
       console.log(routine)
      await routineStore.update(id, routine);
      router.push({ name: 'Routines' }).then(() => {
      ToastCumtom.success("Modificado correctamente.");
      });
    } else {
      const routine = new Routine(null, values.name, values.description, exercisesRoutineSeleted.value);
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

const handleCancel = () => {
  router.push({ name: 'Routines' });
}

const showModalExercises = ref(false);
const exercisesRoutineSeleted = ref([])

const openModalExercises = () => {
  showModalExercises.value = true;
}

const addExercises = (exercises) => {
  showModalExercises.value = false;

  for (let exercise of exercises) {

    const exerciseRoutine = {
      restTime: '01:30',
      type: 'R',
      timePerSet: '00:30',
      numSeries: 3,
      numRepeats: 10,
      exerciseId: exercise.id,
      exercise: { ...exercise }
    }

    exerciseRoutine.timeEstimated = (4 * exerciseRoutine.numRepeats * exerciseRoutine.numSeries) + (exerciseRoutine.numSeries - 1 * exerciseRoutine.restTime)
    exercisesRoutineSeleted.value.push(exerciseRoutine);
  }

}

onMounted(async () => {

  if (isEdit) {
    try {
      const routine = await routineStore.getById(id);
      exercisesRoutineSeleted.value = routine.templateExercises;
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


const resetPropsModal = {
  caption: '',
  description: '',
  showModal: false
};

const propsModal = ref({ ...resetPropsModal })

const showModalRemove = (routineExerciseRemove) => {
  config.routineExerciseRemove = routineExerciseRemove;
  propsModal.value.caption = 'Borrar ejercicio.'
  propsModal.value.description = '¿Estas seguro que quieres borrar este ejercicio de tu rutina?'
  propsModal.value.showModal = true
}

</script>

<template>
  <HeaderComponent v-show="!showModalExercises" />

  <ModalComponent @handleRemove="removeRoutineExercise" :caption="propsModal.caption"
    :description="propsModal.description" :show-modal="propsModal.showModal" />

  <SpinComponent v-if="isLoading" />
  <div class="form-container" v-else>

    <Form :validation-schema="routineSchema" :key="initialValues.id" :initial-values="initialValues"
      @submit="handleSubmit" id="template-routine-form">

      <h2 class="form-title">{{ isEdit ? "Modificar rutina" : "Crear rutina" }}</h2>

      <div class="form-group">
        <label for="name">Nombre:</label>
        <Field as="input" id="name" type="text" name="name" placeholder="🦵 Dia de piernas" />
        <ErrorMessage class="msg-error" name="name" />
      </div>

      <!-- Description -->
      <div class="form-group">
        <label for="description">Descripción:</label>
        <Field as="textarea" id="description" name="description" rows="4"
          placeholder="Mi día favorito de toda la semana..." />
        <ErrorMessage class="msg-error" name="description" />
      </div>

      <TableExercisesRoutine :exercisesRoutine="exercisesRoutineSeleted" @showModalRemove="showModalRemove"
        @addExercise="openModalExercises" @openModalEditExercise="openModalEditExercise" />

      <div class="actions">
        <button id="btSubmit" type="submit">Guardar</button>
        <button id="btCancel" class="btn-cancel" type="button" @click="handleCancel">Cancelar</button>
      </div>
    </Form>
  </div>

  <div class="modal" v-if="showModalExercises">
    <ExerciseComponent :isModal="true" @addExercises="addExercises" :selectedExercises="getExercises()" />
  </div>

  <CreateRoutineExercise v-if="config.isModalEditExerciseOpen" @saveModalEditExercise="saveModalEditExercise"
    @closeModalEditExercise="closeModalEditExercise" :routineExercise="config.routineExerciseEdit" />

</template>

<style scoped>
.msg-error {
  color: red;
}

.actions {
  display: flex;
  justify-content: flex-start;
  gap: 0.75rem;
  margin-top: 0.5rem;
}

.btn-cancel {
  background-color: #e0e0e0;
  color: #333;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-cancel:hover {
  background-color: #bdbdbd;
}


.form-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  border-radius: 12px;
  background-color: #f5f5f5;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

}

@media (max-width: 600px) {
  form {
    padding: 5px;
  }
}

.form-title {
  border-bottom: 2px solid rgba(4, 189, 87, 0.384);
  color: #1abc9c;
  font-size: 1.5rem;
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
  width: 100px;
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
  inset: 0;
  z-index: 1;
  background: rgba(0, 0, 0, 0.55);
  overflow-y: auto;
}
</style>
