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
        ToastCumtom.success("Template routine updated successfully.");
      });
    } else {
      const routine = new Routine(values.name, values.description);
      await routineStore.create(routine);
      router.push({ name: 'Routines' }).then(() => {
        ToastCumtom.success("Template routine created successfully.");
      });
    }
    resetForm();
  } catch (error) {
    ToastCumtom.error(error.message, error.status);
  }
};

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
    <Form
      :validation-schema="routineSchema"
      :key="initialValues.id"
      :initial-values="initialValues"
      @submit="handleSubmit"
      id="template-routine-form"
    >
      <h2 class="form-title">{{ isEdit ? "Edit Template Routine" : "Register Template Routine" }}</h2>

      <!-- Name -->
      <div class="form-group">
        <label for="name">Routine name:</label>
        <Field as="input" type="text" id="name" name="name" placeholder="Enter routine name" required />
        <ErrorMessage class="msg-error" name="name" />
      </div>

      <!-- Description -->
      <div class="form-group">
        <label for="description">Description:</label>
        <Field as="textarea" id="description" name="description" rows="4" placeholder="Enter description..." />
        <ErrorMessage class="msg-error" name="description" />
      </div>

      <button id="btSubmit" type="submit">
        {{ isEdit ? "Update Routine" : "Save Routine" }}
      </button>
    </Form>
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
</style>
