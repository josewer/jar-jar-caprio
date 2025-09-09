import { defineStore } from "pinia";
import { ref } from "vue";
import { jwtDecode } from "jwt-decode";

export const useAuthStore = defineStore("auth", () => {

    const API_URL = "http://localhost:3000/auth/";

    const auth = ref();
    const isAuthenticated = ref(false);

    const getLogin = async (username, password) => {

        const body = { username, password };

        const response = await fetch('http://localhost:3000/auth/login', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
            credentials: "include"
        });

        const data = await response.json();

        if (!response.ok) { throw new Error(data.message) }

        auth.value = jwtDecode(data.access_token);
        isAuthenticated.value = true;
    }

    const logout = async () => {
        try {
            const response = await fetch('http://localhost:3000/auth/logout', {
                method: "DELETE",
                credentials: "include"
            });

            if (!response.ok) throw new Error('Error logout');

            isAuthenticated.value = false;
            auth.value = ''
        } catch (err) {
            isAuthenticated.value = false;
            throw err;
        }
    };

    const checkSession = async () => {
        try {
            const response = await fetch('http://localhost:3000/auth/session', {
                method: "GET",
                credentials: "include"
            });

            const data = await response.json();

            if (!response.ok) throw new Error(data.message);

            isAuthenticated.value = true;
            auth.value = data.user;
        } catch (err) {
            isAuthenticated.value = false;
            throw err;
        }
    };


    return {
        getLogin,
        checkSession,
        logout,
        auth,
        isAuthenticated
    }
});