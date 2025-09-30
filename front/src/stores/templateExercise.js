import { defineStore } from 'pinia';
import { ref } from 'vue';
import { api } from '../../api';

export const useTemplateExerciseStore = defineStore('templateExercise', () => {

  const templateExercises = ref([]);
  const templateExercise = ref();

  const END_POINT = '/routine/:routineId/exercises';

  const create = async (templateExercise) => {

    try {
      const response = await api.post(END_POINT.replace(":routineId", templateExercise.routineId), templateExercise);
      const data = response.data;
      templateExercises.value.push(data);
      return data;
    } catch (error) {
      throw error;
    }
  };

  const update = async (id, templateExercise) => {

    try {
      await api.put(`${END_POINT.replace(":routineId", templateExercise.routineId)}/${id}`, templateExercise);
    } catch (error) {
      throw error;
    }
  }

  const deleteTemplateExercise = async (templateExercise) => {
    try {
      await api.delete(`${END_POINT.replace(":routineId", templateExercise.routineId)}/${templateExercise.id}`);
      const index = templateExercises.value.findIndex(e => e.id == id);
      if (index !== -1) templateExercises.value.splice(index, 1);
    } catch (error) {
      throw error;
    }
  };


  const getById = async (id) => {
    try {
      const response = await api.get(`${END_POINT}/${id}`);
      templateExercise.value = response.data;
      return routine.value;
    } catch (error) {
      throw error;
    }
  }

  const getAll = async () => {
    try {
      const response = await api.get(END_POINT);
      templateExercises.value = response.data;
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  return {
    templateExercise,
    templateExercises,
    create,
    deleteTemplateExercise,
    update,
    getAll,
    getById
  };
});
