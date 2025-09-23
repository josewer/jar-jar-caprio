import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useRoutineStore = defineStore('routine', () => {

  const routines = ref([]);

  return routines;

});
