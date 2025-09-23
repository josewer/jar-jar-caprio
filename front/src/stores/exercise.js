import { defineStore } from "pinia";
import { ref } from "vue";
import { api } from "../../api";
import { Muscles } from "../enums/Muscles";
import { Categories } from "../enums/Categories";
import { ExerciseType } from "../enums/ExerciseType";

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
            save([response.data]);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    const getAll = async () => {
        try {
            const response = await api.get(END_POINT);
            save(response.data);
            return response.data;
        } catch (error) {
            throw error;
        }
    };

    const search = async (filter) => {
        try {
            const response = await api.post(`${END_POINT}/search`, filter);
            save(response.data);
            return response.data;
        } catch (error) {
            throw error;
        }
    };

    const save = (data) => {
        exercises.value = data.map(exercise => ({
            ...exercise,
            mainMuscle: Categories[exercise.mainMuscle] || exercise.mainMuscle,
            type: ExerciseType[exercise.type] || exercise.type,
            involvedMuscles: exercise.involvedMuscles.map(m => Muscles[m] || m)
        }))

        exercises.value.sort((a, b) => a.name.localeCompare(b.name, 'es'));
    }

    return {
        exercises,
        search,
        create,
        update,
        deleteExercise,
        getById,
        getAll
    }
});
