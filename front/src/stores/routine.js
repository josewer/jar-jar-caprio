import { defineStore } from 'pinia';
import { ref } from 'vue';
import { api } from '../../api';

export const useRoutineStore = defineStore('routine', () => {

  const routines = ref([]);
  const routine = ref();

  const END_POINT = '/routine';

  const create = async (routine) => {

    console.log(routine);

    try {
      const response = await api.post(END_POINT, routine);
      const data = response.data;
      routines.value.push(data);
      return data;
    } catch (error) {
      throw error;
    }
  };

  const update = async (id, routine) => {

    try {
      await api.put(`${END_POINT}/${id}`, routine);
    } catch (error) {
      throw error;
    }
  }

  const deleteRutine = async (id) => {
    try {
      await api.delete(`${END_POINT}/${id}`);
      const index = routines.value.findIndex(e => e.id == id);
      if (index !== -1) routines.value.splice(index, 1);
    } catch (error) {
      throw error;
    }
  };


  const getById = async (id) => {
    try {
      const response = await api.get(`${END_POINT}/${id}`);
      routine.value = response.data;
      return routine.value;
    } catch (error) {
      throw error;
    }
  }

  const getAll = async () => {
    try {
      const response = await api.get(END_POINT);
      routines.value = response.data;
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  return {
    routines,
    routine,
    create,
    deleteRutine,
    update,
    getAll,
    getById
  };
});
