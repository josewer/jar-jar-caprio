<script setup>
import { ref } from 'vue';
import { toast } from 'vue3-toastify';
import { useAuthStore } from '../stores/auth';
import { router } from "../router";
import { ToastCumtom } from '../../utils/toast';

const input = ref({
    username: 'admin',
    password: '12345678'
})

const authStore = useAuthStore();


const handleSubmit = async () => {

    const data = input.value;

    if (!data.username || !data.password) {
        toast.warn('Please enter username and password')
        return;
    }

    try {
        await authStore.getLogin(data.username, data.password);
        router.push({ name: "Home" })
    } catch (error) {
        ToastCumtom.error(error.message)
    }
}

</script>

<template>
    <section class="login-container">
        <h1>Welcome to Jar Jar Gym</h1>
        <form @submit.prevent="handleSubmit" class="login-form">
            <input v-model="input.username" type="text" placeholder="Username" />
            <input v-model="input.password" type="password" placeholder="Password" />
            <button type="submit">Login</button>
        </form>
    </section>
</template>

<style scoped>
.login-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: #fff;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    text-align: center;
}

h1 {
    margin-bottom: 2rem;
    font-size: 2rem;
    letter-spacing: 1px;
}

.login-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background: rgba(255, 255, 255, 0.1);
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.25);
    width: 300px;
}

.login-form input {
    padding: 0.8rem;
    border: none;
    border-radius: 6px;
    outline: none;
}

.login-form button {
    padding: 0.8rem;
    border: none;
    border-radius: 6px;
    background: #fff;
    color: #764ba2;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;
}

.login-form button:hover {
    background: #764ba2;
    color: #fff;
}
</style>
