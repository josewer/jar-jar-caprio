import { defineStore } from "pinia";
import { ref } from "vue";



export const useExerciseStore = defineStore("exercise", () => {

    const exercises = ref([])
    const API_URL = "http://localhost:3000/exercises/";

    const create = async (exercise) => {

        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(exercise)
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || "Error creating exercise");
        }

        const data = await response.json();
        exercises.value.push(data);
        return data;
    };

    const update = async (id, exercise) => {

        const response = await fetch(`${API_URL}${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(exercise)
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || "Error updating exercise");
        }
    }

    const deleteExercise = async (id) => {

        const response = await fetch(`${API_URL}${id}`, {
            method: "DELETE",
            credentials: "include"
        });

        if (!response.ok) {
            const error = await response.json().catch(() => ({ message: "Error deleting exercise" }));
            throw new Error(error.message);
        }

        const index = exercises.value.findIndex(e => e.id == id);
        if (index !== -1) exercises.value.splice(index, 1);
    };


    const getById = async (id) => {

        const response = await fetch(`${API_URL}${id}`, {
            credentials: "include"
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            const error = await response.json().catch(() => ({ message: "Error fetching exercise" }));
            throw new Error(error.message);
        }
    }

    const getAll = async () => {
        const response = await fetch(API_URL, {
            credentials : "include"
        });

        if (response.ok) {
            exercises.value = await response.json();
        } else {
            const error = await response.json().catch(() => ({ message: "Error fetching exercises" }));
            throw new Error(error.message);
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
