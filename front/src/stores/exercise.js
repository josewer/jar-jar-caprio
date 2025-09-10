import { defineStore } from "pinia";
import { ref } from "vue";
import { api } from "../../api";


export const useExerciseStore = defineStore("exercise", () => {

    const exercises = ref([])
    const END_POINT = '/exercises';

    const create = async (exercise) => {
        try {
            const response = await api.post(END_POINT, exercise);
            const data = response.data;
            exercises.value.push(data);
            return data;
        } catch (error) {
            throw error;
        }
    };

    const update = async (id, exercise) => {

        try {
            await api.put(`${END_POINT}/${id}`, exercise);
        } catch (error) {
            throw error;
        }
    }

    const deleteExercise = async (id) => {
        try {
            await api.delete(`${END_POINT}/${id}`);
            const index = exercises.value.findIndex(e => e.id == id);
            if (index !== -1) exercises.value.splice(index, 1);
        } catch (error) {
            throw error;
        }
    };


    const getById = async (id) => {
        try {
            const response = await api.get(`${END_POINT}/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    const getAll = async () => {
        try {
            const response = await api.get(END_POINT);
            exercises.value = response.data;
            return response.data;
        } catch (error) {
            throw error;
        }
    };

    return {
        exercises,
        create,
        update,
        deleteExercise,
        getById,
        getAll
    }
});
